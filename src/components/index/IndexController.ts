export class IndexController {
  sum (a: number, b: number) {
    return a + b
  }

  error () {
    throw new Error('This function returns an error to be handled')
  }

  hello (name: string) {
    return 'Hello ' + name
  }
}
