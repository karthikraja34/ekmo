import React, {Component} from 'react';
import parse from "html-react-parser";
import {extractContext, renderHandleBar, toBase64} from "../utils/misc";
import template from "../templates/default/template";
import data from "../templates/default/data.json";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "previewMode": false,
      data:  JSON.parse(JSON.stringify(data))
    }
  }

  onChange = (e) => {
    const data = {...this.state.data}
    if (e.target.dataset && e.target.dataset.type === "repeater") {
      const index = e.target.dataset.index;
      data["repeater"][index][e.target.name].value = e.target.value;
    }
    else if(e.target.name==="company_logo_input"){
      toBase64(e.target.files[0])
      .then((base64data)=>{
        document.getElementById('company_logo').src=base64data;
      })
      .catch(err=>console.log(err))
  }
   else {
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
    else if(e.target.name==="change-logo"){
      document.getElementById('fileUploadButton').click();
    }
  }

  render() {
    const rawHTML = renderHandleBar(template, extractContext(this.state.data, this.state.previewMode))
    return (
      <div>
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
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
          this.setState({previewMode: !this.state.previewMode})
        }}>
          Toggle Preview Mode
        </button>
        </div>
      </div>
    );
  }
}

export default MainComponent;