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
    if (entity.hasOwnProperty("value")) {
      context[property] = renderHandleBar(entity[type_to_extract], {"value": entity.value})
    } else if (Array.isArray(entity)) {
      var new_entity = []
      entity.forEach((value) => {
        var new_obj = {}
          for (const subProperty in value) {
            var subEntity = value[subProperty]
            new_obj[subProperty] = renderHandleBar(subEntity[type_to_extract], {"value": subEntity.value})
          }
          new_entity.push(new_obj)
      })
      context[property] = new_entity
    }
  }
  console.log("Context ", context)
  return context
}