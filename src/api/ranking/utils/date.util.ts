// src/utils/date.utils.ts
export class DateUtils {
  static parseKoreanDate(dateStr: string): Date | null {
    console.log("parseKoreanDate", dateStr);
    const match = dateStr.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
    if (!match) return null;
    const [_, year, month, day] = match;
    return new Date(
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    );
  }
}
