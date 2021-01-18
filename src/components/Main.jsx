import React, {Component} from 'react';
import parse from "html-react-parser";
import {extractContext, renderHandleBar} from "../utils/misc";
import template from "../templates/default/template";
import data from "../templates/default/data.json";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "previewMode": false,
      data: data
    }
  }

  onChange = (e) => {
    const data = {...this.state.data}
    if (e.target.dataset && e.target.dataset.type === "repeater") {
      const index = e.target.dataset.index;
      data["repeater"][index-1][e.target.name].value = e.target.value;
    } else {
      data[e.target.name].value = e.target.value;
    }

    this.setState({data})
  }

  render() {
    const rawHTML = renderHandleBar(template, extractContext(this.state.data, this.state.previewMode ? "output" : "input"))

    return (
      <div>
        {parse(rawHTML, {
          replace: domNode => {
            if (domNode.name === "input" || domNode.name === "textarea") {
              domNode.attribs.onChange = this.onChange;
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