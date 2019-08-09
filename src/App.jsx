import React from 'react';
import './App.css';
import Menu from "./common/Menu"
import Home from "./Pages/Home"
import Bookmarks from "./Pages/Bookmarks"
import Categories from "./Pages/Categories"
import {  Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Menu/>
      <Route path="/" exact component={Home} />
      <Route path="/about/" component={Categories} />
      <Route path="/users/" component={Bookmarks} />
      </header>
    </div>
  );
}

export default App;
