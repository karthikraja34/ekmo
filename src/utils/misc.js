import Handlebars from "handlebars";
import createDOMPurify from 'dompurify'


const DOMPurify = createDOMPurify(window)

export function renderHandleBar(rawHtml, context={}) {
  const html = Handlebars.compile(rawHtml)(context)
  return DOMPurify.sanitize(html)
}

export function extractContext(data, type_to_extract="input") {
  const context = {}
  for (const property in data) {
    var entity = data[property]
    context[property] = renderHandleBar(entity[type_to_extract], {"value": entity.value})
  }
  return context
}