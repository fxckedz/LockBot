import {Bot} from "grammy"
import {Config} from "../config/Config.js"

export class LockBot {
  private bot: Bot

  constructor() {
    this.bot = new Bot(Config.TOKEN)
  }

  public start() {
    this.bot.command("start", (ctx) => ctx.reply("Olá! Eu sou o LockBot. Para mais informações digite /help."))
    this.bot.start()
    console.log("🤖LockBot ONLINE")
  }
}