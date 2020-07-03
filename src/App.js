import React from 'react';
import logo from './assets/pros-cons-logo-dark.svg';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Chart from './components/chart/Chart';

function App() {
  return (
    <div className="App">
      <Sidebar pageWrapId={"container"} outerContainerId={"App"} />
      <div id="container" className="appContainer">
        <div id="title">
          <img id="logo" src={logo} alt="logo"/>
          <p><i>An interactive amd immersive way of creating pros and con charts</i></p>
        </div>

        <Chart />
      </div>
    </div>
  );
}

export default App;
