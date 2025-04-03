const { Client } = require("pg");
require("dotenv").config();

// 환경 변수 설정
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const steamAppsQuery = `
  INSERT INTO steam_apps (
    steam_appid, type, name, required_age, is_free,
    detailed_description, about_the_game, short_description,
    supported_languages, header_image_url, website_url, release_date,
    coming_soon, background, capsule_image_url
  ) VALUES (
    $1, $2, $3, $4, $5,
    $6, $7, $8,
    $9, $10, $11, $12,
    $13, $14, $15
  )
  ON CONFLICT (steam_appid) DO UPDATE SET
    type = EXCLUDED.type,
    name = EXCLUDED.name,
    required_age = EXCLUDED.required_age,
    is_free = EXCLUDED.is_free,
    detailed_description = EXCLUDED.detailed_description,
    about_the_game = EXCLUDED.about_the_game,
    short_description = EXCLUDED.short_description,
    supported_languages = EXCLUDED.supported_languages,
    header_image_url = EXCLUDED.header_image_url,
    website_url = EXCLUDED.website_url,
    release_date = EXCLUDED.release_date,
    coming_soon = EXCLUDED.coming_soon,
    capsule_image_url = EXCLUDED.capsule_image_url,
    updated_at = CURRENT_TIMESTAMP;
`;

const gamePriceQuery = `
  INSERT INTO price_overviews (
    appid, currency, initial, final, discount_percent, updated_at
  ) VALUES (
    $1, $2, $3, $4, $5, CURRENT_TIMESTAMP
  )
  ON CONFLICT (appid) DO UPDATE SET
    currency = EXCLUDED.currency,
    initial = EXCLUDED.initial,
    final = EXCLUDED.final,
    discount_percent = EXCLUDED.discount_percent,
    updated_at = CURRENT_TIMESTAMP;
`;

// 한국어 날짜 → ISO 형식 변환 함수
function parseKoreanDate(dateStr) {
  if (!dateStr) return null;

  const match = dateStr.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
  if (!match) throw new Error(`Invalid date format: ${dateStr}`);

  const [year, month, day] = match.slice(1);
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

// Rate Limit 회피용
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchDetailGames(appId) {
  try {
    const storeRes = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appId}&l=korean`
    );
    await delay(1500);
    if (!storeRes.ok) throw new Error(`SteamStore ${storeRes.status}`);
    const storeData = await storeRes.json();
    return storeData;
  } catch (error) {
    console.error(error);
  }
}

async function processGame(client, appId) {
  try {
    const game = await fetchDetailGames(appId);
    if (!game || !game[appId]?.success) return;

    const data = game[appId].data;
    console.log("game data =======", data);
    await client.query("BEGIN");

    // 날짜 변환 적용
    const releaseDate = parseKoreanDate(data.release_date?.date);

    // 1. 기본 정보 저장
    await client.query(steamAppsQuery, [
      data.steam_appid,
      data.type,
      data.name,
      data.required_age,
      data.is_free,
      data.detailed_description,
      data.about_the_game,
      data.short_description,
      data.supported_languages,
      data.header_image,
      data.website,
      releaseDate,
      data.release_date?.coming_soon,
      data.background,
      data.capsule_imagev5,
    ]);

    if (data.price_overview) {
      await client.query(gamePriceQuery, [
        data.steam_appid,
        data.price_overview.currency,
        data.price_overview.initial / 100,
        data.price_overview.final / 100,
        data.price_overview.discount_percent,
      ]);
    }

    // // 3. 개발사/퍼블리셔
    // await client.query(companyQuery, [data.developers || [], data.steam_appid]);
    // await client.query(companyQuery, [data.publishers || [], data.steam_appid]);

    // // 4. 시스템 요구사항
    // if (data.pc_requirements) {
    //   await client.query(sysReqQuery, [
    //     data.steam_appid,
    //     JSON.stringify(data.pc_requirements.minimum),
    //     JSON.stringify(data.pc_requirements.recommended),
    //   ]);
    // }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`[${appId}] 처리 실패:`, error.message);
  }
}

async function runBatch() {
  const client = new Client(dbConfig);
  await client.connect();

  try {
    // 최상위 100개 게임 ID 조회
    const topRes = await fetch(
      "https://steamspy.com/api.php?request=top100in2weeks"
    );
    const top100 = Object.keys(await topRes.json());

    for (const appId of top100) {
      // 테스트용 10개만 처리
      await processGame(client, appId);
    }
  } finally {
    await client.end();
  }
}

// 실행
runBatch().then(() => console.log("배치 완료"));
