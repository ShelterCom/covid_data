import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Map from './components/map'
import Footer from './components/footer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Aarogya from './components/arogya'
import State from './components/state'
import Precaution from './components/precautions'
import Country from './components/country'
import News from './components/news'
import Symptom from './components/symptoms'
import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.json }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        // Render the newly fetched data inside of this.state.data
        <p className="App-intro">{this.state.data}</p>
      </div>

        <BrowserRouter>
          <div className='App'>
            <Navbar />
            <Switch>
              <Route path='/' component={Map} exact />
              <Route path='/app' component={Aarogya} />
              <Route path='/state' component={State} />
              <Route path='/precaution' component={Precaution} />
              <Route path='/country' component={Country} />
              <Route path='/news' component={News} />
              <Route path='/symptoms' component={Symptom} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
    );
  }

  // return (
  //   <BrowserRouter>
  //     <div className='App'>
  //       <Navbar />
  //       <Switch>
  //         <Route path='/' component={Map} exact />
  //         <Route path='/app' component={Aarogya} />
  //         <Route path='/state' component={State} />
  //         <Route path='/precaution' component={Precaution} />
  //         <Route path='/country' component={Country} />
  //         <Route path='/news' component={News} />
  //         <Route path='/symptoms' component={Symptom} />
  //       </Switch>
  //       <Footer />
  //     </div>
  //   </BrowserRouter>
  // )
}

export default App
