import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
export class JWT {
  private static readonly SECRET = process.env.JWT_SECRET || "secret-key";
  private static readonly EXPIRES_IN = "1h";
  private static readonly ALGORITHM = "HS256";

  // 토큰 생성 (static 메서드)
  // payload: 토큰에 담을 데이터
  static generateToken(payload: object): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: this.EXPIRES_IN }); // 토큰 유효기간: 1시간
  }

  // 토큰 검증 (static 메서드)
  static verifyToken(token: string): any {
    return jwt.verify(token, this.SECRET);
  }
}
