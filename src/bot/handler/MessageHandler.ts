import type { Context } from "grammy"

export class MessageHandler {
  static handle(ctx: Context): void {
    console.log(ctx.message?.text)
  }
}   