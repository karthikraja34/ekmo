import './App.css';
import template from "./templates/default/template";
import React from 'react';

import {extractContext, renderHandleBar} from "./utils/misc";
import data from "./templates/default/data.json"
import parse from 'html-react-parser';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "previewMode": true,
      data: data
    }
  }

  onChange = (e) => {
    var data = {...this.state.data}
    data[e.target.name].value = e.target.value;
    this.setState({data})
  }

  render() {
    const rawHTML = renderHandleBar(template, extractContext(this.state.data, this.state.previewMode ? "output" : "input"))

    return (
      <div className="App">
        {parse(rawHTML, {replace: domNode => {
            if (domNode.name === "input") {
              domNode.attribs.onChange = this.onChange;
            }
            return domNode
          }})}
        <button onClick={() => {
          this.setState({previewMode: !this.state.previewMode})
        }}>Toggle
        </button>
      </div>
    );
  }
}

export default App;
