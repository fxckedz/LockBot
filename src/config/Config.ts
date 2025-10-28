import "dotenv/config"

export class Config{
  static TOKEN = process.env.TOKEN || ""
}