import './App.css';
import React from 'react';
import MainComponent from "./components/Main";


class App extends React.Component {


  render() {

    return (
      <div className="App">
        <h2 className="text-3xl text-center font-medium my-5">Invoice Generator</h2>
        <MainComponent />
      </div>
    );
  }
}

export default App;
