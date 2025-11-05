class ParseSoapResponse {
  public handle(xmlData: string): Array<{ id: string; nome: string }> {
    const stringMatches = xmlData.match(/<string>([^<]+)<\/string>/g)
  
    if (!stringMatches) return []

    const locks = stringMatches.map(tag => {
      const content = tag.replace(/<string>|<\/string>/g, "")
      const parts = content.split(" - ")
      
      // Garante que sempre terá um ID
      const id = parts[0]?.trim() || "Sem ID"
      const nome = parts[1]?.trim() || "Sem nome"
      
      return {
        id: id,
        nome: nome
      }
    })

    return locks
  }
}

export default new ParseSoapResponse()

