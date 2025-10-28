import {Bot} from "grammy"
import {Config} from "../config/Config.js"
import { MessageHandler } from "./handler/MessageHandler.js"
import { CommandHandler } from "./handler/CommandHandler.js"

export class LockBot {
  private bot: Bot = new Bot(Config.TOKEN)

  constructor() {}

  private setupHandlers(): void {
    this.bot.command("start", (ctx) => CommandHandler.handle(ctx))
    this.bot.command("help", (ctx) => CommandHandler.handle(ctx))
    this.bot.command("abrir", (ctx) => CommandHandler.handle(ctx))
    this.bot.command("fechar", (ctx) => CommandHandler.handle(ctx))
    this.bot.on("message", ctx => MessageHandler.handle(ctx))
  }

  public start(): void {
    this.setupHandlers()
    this.bot.start()
    console.log("🤖LockBot ONLINE")
  }
}