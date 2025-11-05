import { Bot }  from "grammy"
import { Config } from "../config/Config"
import { MessageHandler } from "./handler/MessageHandler"
import { CommandHandler } from "./handler/CommandHandler"

export class LockBot {
  private bot: Bot = new Bot(Config.TOKEN)
  private comands: string[] = ["start", "help", "open", "close"]

  private setupCommandHandlers(): void {
    this.comands.forEach(command => {
      this.bot.command(command, ctx => CommandHandler.handle(ctx))
    })
  }

  private setupMessageHandlers(): void {
    this.bot.on("message", ctx => MessageHandler.handle(ctx))
  }

  private setupHandlers(): void {
    this.setupCommandHandlers()
    this.setupMessageHandlers()
  }

  public start(): void {
    this.setupHandlers()
    this.bot.start()
    console.log("🤖LockBot ONLINE")
  }
}