import React, {Component} from 'react';
import parse from "html-react-parser";
import axios from 'axios';
import {extractContext, renderHandleBar} from "../utils/misc";
import template from "../templates/default/template2/template2";
import data from "../templates/default/template2/data2.json";
import loadingIcon from "../assets/loading";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "previewMode": false,      
      "printingPDF": false,
      data:  JSON.parse(JSON.stringify(data))
    }
    this.invoiceRef = React.createRef();
  }

  onChange = (e) => {
    const data = {...this.state.data}
    if (e.target.dataset && e.target.dataset.type === "repeater") {
      const index = e.target.dataset.index;
      data["repeater"][index][e.target.name].value = e.target.value;
    } else {
      data[e.target.name].value = e.target.value;
    }

    this.setState({data})
  }

  onClick = (e) => {
    if (e.target.name === "add-item") {
      const stateData = {...this.state.data}
      const clonedData = JSON.parse(JSON.stringify(data["repeater"][0]));
      stateData["repeater"].push(clonedData)
      this.setState({"data": stateData})
    } else if (e.target.name === "delete-item") {
      const index = e.target.dataset.index;
      const data = {...this.state.data}
      data["repeater"].splice(index, 1);
      this.setState({data})
    }
  }

  printTemplate=()=>{
    var prtContent = document.getElementById("template");
    var WinPrint = window.open('', '', 'left=0,top=0,width=700,height=900, toolbar=0,scrollbars=0,status=0');
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
    <body>`+prtContent.innerHTML+`</body></html>`);

    WinPrint.document.close();
    WinPrint.focus();
    setTimeout(()=>{
      WinPrint.print();
      WinPrint.close();
    },1000)
  }

  printPDF = () => {
    this.setState({ printingPDF: !this.state.printingPDF })
    const htmlComponent = this.state.data.header + this.invoiceRef.current.outerHTML + this.state.data.footer;
    return axios(
      `${process.env.REACT_APP_EKMO_SERVER_ENDPOINT}/downloadpdf`,
      {
        method: 'POST',
        data: { htmlComponent },
        responseType: 'blob',
      }
    ).then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `invoice.pdf`
      this.setState({ printingPDF: !this.state.printingPDF })
      link.click()
    })
      .catch(err => {
        console.log(err)
        this.setState({ printingPDF: !this.state.printingPDF })
      })

  }

  render() {
    const rawHTML = renderHandleBar(template, extractContext(this.state.data, this.state.previewMode))
    return (
      <div>
        <div ref={this.invoiceRef}>
          {parse(rawHTML, {
            replace: domNode => {
              if (domNode.name === "input" || domNode.name === "textarea") {
                domNode.attribs.onChange = this.onChange;
              }
              if (domNode.name === "button") {
                domNode.attribs.onClick = this.onClick;
              }
              return domNode
            }
          })}
        </div>
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            this.setState({ previewMode: !this.state.previewMode })
          }}>
            Toggle Preview Mode
          </button>                     
          {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-3 rounded" onClick={this.printPDF}>
            {
              this.state.printingPDF ? loadingIcon : 'Print'
            }
          </button> */}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-3 rounded" onClick={this.printTemplate}>
            {
              this.state.printingPDF ? loadingIcon : 'Print'
            }
          </button>        
        </div>
      </div>
    );
  }
}

export default MainComponent;