const logger: any = {
  log() {
    //console.log(Array.prototype.slice.call(arguments))
  },
  error() {
    console.log(Array.prototype.slice.call(arguments))
  }
}

let selectedElement

/**
 * Saves selected inspected element
 * The function invokes by devtools.js ("chrome.devtools.inspectedWindow.eval")
 * @param el {HTMLElement}
 */
function saveSelectedElement(el: any): string {
  logger.log(`content: saveSelectedElement`, el)

  selectedElement = el

  const result: any = {
    localName: '',
    className: '',
    id: '',
    name: 'default',
    value: 'default'
  }

  if (el) {
    //logger.log(`content: saveSelectedElement: if (el) true`)
    if (el.localName) {
      result.localName = el.localName
    }
    if (el.className) {
      //result.classSelector = `${ test.localName }.${ el.className.replace(/\s{2,}/, ' ').replace(/\s/, '.') }`
      result.className = el.className.trim()
    }
    //logger.log('result after if (el.className)', result)
    if (el.id) {
      result.id = el.id
    }
    //logger.log('result after if (el.id)', result)

    const attributes = el.attributes
    if (attributes && attributes.id) {
      result.name = attributes.id.name
      result.value = attributes.id.value
    }
  }

  const deserialized: string = JSON.stringify(result)
  return deserialized
}
