export class Parser {
  static async parse(json: string): Promise<any> {
    const root = JSON.parse(json)
    return this.parseObject(root) as any
  }

  private static parseObject(element: object): object {
    const obj: any = {}
    for (const [key, value] of Object.entries(element)) {
      if (value['_value']) {
        obj[key] = this.parsePrimitive(value)
      } else if (value['_values']) {
        obj[key] = this.parseArray(value)
      } else if (key === '_type') {
        continue
      } else {
        obj[key] = this.parseObject(value)
      }
    }
    return obj
  }

  private static parseArray(arrayElement: any): any {
    return arrayElement['_values'].map((arrayValue: object) => {
      const obj: any = {}
      for (const [key, value] of Object.entries(arrayValue)) {
        if (value['_value']) {
          obj[key] = this.parsePrimitive(value)
        } else if (value['_values']) {
          obj[key] = this.parseArray(value)
        } else if (key === '_type') {
          continue
        } else if (key === '_value') {
          continue
        } else {
          obj[key] = this.parseObject(value)
        }
      }
      return obj
    })
  }

  private static parsePrimitive(element: any): any {
    switch (element['_type']['_name']) {
      case 'Int':
        return parseInt(element['_value'])
      case 'Double':
        return parseFloat(element['_value'])
      default:
        return element['_value']
    }
  }
}
