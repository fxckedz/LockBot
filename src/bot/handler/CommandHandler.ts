import type { Context } from "grammy"

export class CommandHandler {
  static handle(ctx: Context): void {
    let command:string = ctx.message?.text as string

    if(!command) throw new Error("Command text is undefined")

    command = command.replace("/", "").toLowerCase()

    switch(command) {
      case "start":
        ctx.reply("Olá! Eu sou o LockBot. Para mais informações digite /help.")
        break
      case "help":
        ctx.reply("Comandos disponíveis:\n\n/start - Inicia o bot.\n\n/help - Exibe esta mensagem de ajuda.\n\n/abrir - Exibe instruções para solicitar abertura.\n\n/fechar - Exibe instruções para solicitar fechamento.")
        break
      case "abrir":
        ctx.reply("Para solicitar a abertura, envie uma mensagem da seguinte forma: 'abrir#senha' sem as aspas.\n\nExemplo: abrir#123456\n\nAviso: Caso a mensagem não siga esse formato, a solicitação será ignorada.")
        break
      case "fechar":
        ctx.reply("Para solicitar o fechamento, envie uma mensagem da seguinte forma: 'fechar#senha' sem as aspas.\n\nExemplo: fechar#123456\n\nAviso: Caso a mensagem não siga esse formato, a solicitação será ignorada.")
        break
    }

  }
}   