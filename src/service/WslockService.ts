/* eslint-disable @stylistic/quotes */
import axios from "axios"
import { Config } from "../config/Config.js"
import parseSoapResponse from "../utils/ParseSoapResponde.js"

class WslockService{
  constructor(
    private readonly url:string,
    private readonly login:string,
    private readonly password:string
  ){}

  private escapePassword(password: string){
    return password.replace(/&/g, '&amp;')
  }

  async getLocksList(){

    const escapedPassword = this.escapePassword(this.password)

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Header>
<Seguranca xmlns="http://www.pentasis.com.br/">
<Usuario>${this.login}</Usuario>
<Senha>${escapedPassword}</Senha>
</Seguranca>
</soap:Header>
<soap:Body>
<LocksList xmlns="http://www.pentasis.com.br/" />
</soap:Body>
</soap:Envelope>`
    
    const response = await axios.post(this.url, xml, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "http://www.pentasis.com.br/LocksList"
      },
      timeout: 10000
    })

    const soapData = response.data

    return parseSoapResponse.handle(soapData)
  }
}

export default new WslockService(Config.URL, Config.LOGIN, Config.PASSWORD)