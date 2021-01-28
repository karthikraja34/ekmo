import React, { Component } from 'react';
import parse from "html-react-parser";
import axios from 'axios';
import { extractContext, renderHandleBar } from "../utils/misc";
import template from "../templates/default/template";
import data from "../templates/default/data.json";
import printicon from "../assets/print.svg"

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "previewMode": false,
      data: JSON.parse(JSON.stringify(data))
    }
  }

  onChange = (e) => {
    const data = { ...this.state.data }
    if (e.target.dataset && e.target.dataset.type === "repeater") {
      const index = e.target.dataset.index;
      data["repeater"][index - 1][e.target.name].value = e.target.value;
    } else {
      data[e.target.name].value = e.target.value;
    }

    this.setState({ data })
  }

  printPDF = () => {
    //for temp loading
    document.body.classList.add("cursor-wait")

    const invoicePreview = document.getElementById('invoice').innerHTML;
    return axios.get(`http://localhost:4000/getPDF`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      },
      params: { invoicePreview }
    }).then((response) => {
      document.body.classList.remove("cursor-wait")
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `invoice.pdf`
      link.click()
    })
      .catch(err => { console.log(err) })

  }

  onClick = (e) => {
    if (e.target.name === "add-item") {
      const stateData = { ...this.state.data }
      const clonedData = JSON.parse(JSON.stringify(data["repeater"][0]));
      stateData["repeater"].push(clonedData)
      this.setState({ "data": stateData })
    } else if (e.target.name === "delete-item") {
      const index = e.target.dataset.index;
      const data = { ...this.state.data }
      data["repeater"].splice(index, 1);
      this.setState({ data })
    }
  }

  render() {
    const rawHTML = renderHandleBar(template, extractContext(this.state.data, this.state.previewMode))
    return (
      <div>
        <div id="invoice">
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
          {this.state.previewMode ? <img src={printicon} alt="print pdf" className="w-11 float-right cursor-pointer" onClick={this.printPDF} /> : <React.Fragment></React.Fragment>}
        </div>
      </div>
    );
  }
}

export default MainComponent;