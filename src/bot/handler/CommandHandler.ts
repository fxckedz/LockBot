import type { Context } from "grammy"

export class CommandHandler {
  static handle(ctx: Context): void {

    let command:string = ctx.message?.text as string

    if(!command) throw new Error("Command text is undefined")

    command = command.replace("/", "").toLowerCase()

    switch(command) {
      case "start":
        ctx.reply("👋Olá! Eu sou o LockBot. Para mais informações digite /help.")
        break
      case "help":
        ctx.reply("👀Comandos disponíveis:\n\n/start - Inicia o bot.\n\n/help - Exibe esta mensagem de ajuda.\n\n/open - Exibe instruções para solicitar abertura.\n\n/close - Exibe instruções para solicitar fechamento.")
        break
      case "open":
        ctx.reply("🔓Para solicitar a abertura, envie uma mensagem da seguinte forma: 'open#senha' sem as aspas e sem barra.\n\nExemplo: abrir#123456\n\n⚠️Aviso: Caso a mensagem não siga esse formato, a solicitação será ignorada.")
        break
      case "close":
        ctx.reply("🔒Para solicitar o fechamento, envie uma mensagem da seguinte forma: 'close#senha' sem as aspas e sem barra.\n\nExemplo: fechar#123456\n\n⚠️Aviso: Caso a mensagem não siga esse formato, a solicitação será ignorada.")
        break
    }
  }
}