class ParseSoapResponseConfirmClosing {
  public handle(xmlData: string) {

    const regex = /<ConfirmClosingResult>(\d+)<\/ConfirmClosingResult>/

    const result = regex.exec(xmlData) || []

    return result[1]
  }
}
export default new ParseSoapResponseConfirmClosing