import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
