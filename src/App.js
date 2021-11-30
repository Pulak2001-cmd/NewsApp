
import './App.css';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0
  }
  setProgress =(progress)=>{
    this.setState({
      progress: progress
    })
  }
  apiKey = process.env.REACT_APP_APIKEY
  pageSize = 6
  render() {
    return (
      <BrowserRouter>
      <div>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="general"/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="entertainment"/>} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="sports"/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="health"/>} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="science"/>} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="technology"/>} />

        </Routes>
      </div>
      </BrowserRouter>
    )
  }
}

