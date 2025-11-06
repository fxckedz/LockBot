class ParseSoapResponseEnsurePassword {
  public handle(xmlData: string) {

    const regex = /<EnsurePasswordResult>(\d+)<\/EnsurePasswordResult>/

    const result = regex.exec(xmlData) || []

    return result[1]
  }
}
export default new ParseSoapResponseEnsurePassword