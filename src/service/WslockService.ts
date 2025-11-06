/* eslint-disable @stylistic/quotes */
import axios from "axios"
import { Config } from "../config/Config.js"
import parseSoapResponse from "../utils/ParseSoapResponseLockList.js"
import ParseSoapResponseConfirmClosing from "../utils/ParseSoapResponseConfirmClosing.js"
import ParseSoapResponseEnsurePassword from "../utils/ParseSoapResponseEnsurePassword.js"

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

  async getLockListByUser(matricula: string){

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
<LocksListByUser xmlns="http://www.pentasis.com.br/">
<matriculaop>${matricula}</matriculaop>
</LocksListByUser>
</soap:Body>
</soap:Envelope>`

    const response = await axios.post(this.url, xml, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "http://www.pentasis.com.br/LocksListByUser"
      },
      timeout: 10000
    })

    const soapData = response.data

    return parseSoapResponse.handle(soapData)

  }

  async confirmClosing(matricula: string, senhaFechamento: string){
    
    const lock = await this.getLockListByUser(matricula)
    const id = lock[0]?.id.trim()

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Header>
<Seguranca xmlns="http://www.pentasis.com.br/">
<Usuario>${this.login}</Usuario>
<Senha>${this.escapePassword(this.password)}</Senha>
</Seguranca>
</soap:Header>
<soap:Body>
<ConfirmClosing xmlns="http://www.pentasis.com.br/">
<codfechadura>${id}</codfechadura>
<codigofechamento>${senhaFechamento}</codigofechamento>
</ConfirmClosing>
</soap:Body>
</soap:Envelope>`

    const response = await axios.post(this.url, xml, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "http://www.pentasis.com.br/ConfirmClosing"
      },
      timeout: 10000
    })

    const data = response.data

    return ParseSoapResponseConfirmClosing.handle(data)

  }

  async ensurePassword(matricula: string, senhaAbertura: string, senhaOperador: string){

    const lock = await this.getLockListByUser(matricula)
    const id = lock[0]?.id.trim()

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <Seguranca xmlns="http://www.pentasis.com.br/">
      <Usuario>${this.login}</Usuario>
      <Senha>${this.escapePassword(this.password)}</Senha>
    </Seguranca>
  </soap:Header>
  <soap:Body>
    <EnsurePassword xmlns="http://www.pentasis.com.br/">
      <codfechadura>${id}</codfechadura>
      <senhaoperador>${senhaOperador}</senhaoperador>
      <contrasenha>${senhaAbertura}</contrasenha>
    </EnsurePassword>
  </soap:Body>
</soap:Envelope>`

    const response = await axios.post(this.url, xml, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "http://www.pentasis.com.br/EnsurePassword"
      },
      timeout: 10000
    })

    const data = response.data

    return ParseSoapResponseEnsurePassword.handle(data)


  }

}

export default new WslockService(Config.URL, Config.LOGIN, Config.PASSWORD)