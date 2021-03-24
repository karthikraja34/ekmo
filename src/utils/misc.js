import Handlebars from "handlebars";
import createDOMPurify from 'dompurify'


const DOMPurify = createDOMPurify(window)

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

export function printTemplate(templateHTML){
  var WinPrint = window.open('', '', 'left=0,top=0,width=900,height=900, toolbar=0,scrollbars=0,status=0');
  WinPrint.document.write(`<html style='-webkit-print-color-adjust: exact;'><head>
  <link href='https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css' rel='stylesheet'>
  </head>
  <style>
  @page{
    margin:0;
  }
  @media print {
    html, body {
      width: 210mm;
    }
  }
  </style>
  <body>`+templateHTML.innerHTML+`</body></html>`);

  WinPrint.document.close();
  WinPrint.focus();
  setTimeout(()=>{
    WinPrint.print();
    WinPrint.close();
  },1000)
}