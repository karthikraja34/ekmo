import React, {Component} from 'react';
import parse from "html-react-parser";
import axios from 'axios';
import {extractContext, renderHandleBar} from "../utils/misc";
import template from "../templates/default/template";
import data from "../templates/default/data.json";
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
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-3 rounded" onClick={this.printPDF}>
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