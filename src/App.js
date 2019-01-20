import React, { Component } from 'react';
import GoogleOAuth20 from './components/GoogleOAuth20'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <GoogleOAuth20/>
      </div>
    );
  }
}

export default App;
