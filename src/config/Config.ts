import "dotenv/config"

export class Config{
  static TOKEN = process.env.TOKEN || ""
  static URL = process.env.URL || ""
  static LOGIN = process.env.LOGIN || ""
  static PASSWORD = process.env.PASSWORD || ""
}