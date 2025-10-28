import {Bot} from "grammy"
import {Config} from "../config/Config.js"
import { MessageHandler } from "./handler/MessageHandler.js"

export class LockBot {
  private bot: Bot

  constructor() {
    this.bot = new Bot(Config.TOKEN)
  }

  private setupHandlers(): void {
    this.bot.command("start", (ctx) => ctx.reply("Olá! Eu sou o LockBot. Para mais informações digite /help."))
    this.bot.on("message", ctx => MessageHandler.handle(ctx))
  }

  public start(): void {
    this.setupHandlers()
    this.bot.start()
    console.log("🤖LockBot ONLINE")
  }
}