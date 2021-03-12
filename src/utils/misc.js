import Handlebars from "handlebars";
import createDOMPurify from 'dompurify'


const DOMPurify = createDOMPurify(window)

Handlebars.registerHelper('odd', function(conditional) {
  return conditional % 2;
});

export function renderHandleBar(rawHtml, context={}) {
  const html = Handlebars.compile(rawHtml)(context)
  return DOMPurify.sanitize(html)
}

export function extractContext(data, previewMode = false) {
  const context = {}
  const type_to_extract = previewMode ? "output" : "input"
  for (const property in data) {
    var entity = data[property]
    if (entity.hasOwnProperty("value")) {
      context[property] = renderHandleBar(entity[type_to_extract], {"value": entity.value})
    } else if (Array.isArray(entity)) {
      var new_entity = []
      entity.forEach((value, i) => {
        var new_obj = {}
          for (const subProperty in value) {
            var subEntity = value[subProperty]
            new_obj[subProperty] = renderHandleBar(subEntity[type_to_extract], {"value": subEntity.value, "index": i})
          }
          new_entity.push(new_obj)
      })
      context[property] = new_entity
    }
  }
  context["previewMode"] = previewMode
  return context
}