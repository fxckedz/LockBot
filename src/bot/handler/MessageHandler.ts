import type { Context } from "grammy"
import wslockService from "../../service/WslockService.js"

export class MessageHandler {
  static async handle(ctx: Context): Promise<void> {
    const command = ctx.message?.text
    const input = command?.toLowerCase().split("#") || []

    const action = input[0]
    const matricula = ctx.chat?.first_name || ""
    
    switch (action) {
      case "abrir": {
        
        const senhaAbertura = input[1] ? String(input[1]) : ""
        const senhaOperador = input[2] ? String(input[2]) : ""

        const response = await wslockService.ensurePassword(matricula, senhaAbertura, senhaOperador)

        console.log(response)
        break
      }
    
      case "fechar": {
        const senhaFechamento = input[1] || ""

        const response = await wslockService.confirmClosing(matricula, senhaFechamento)

        console.log(response)
        break
      }
    }
  }
}