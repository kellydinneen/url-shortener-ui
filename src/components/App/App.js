import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: null
    }
  }

  getAllUrls = async () => {
    try {
      const promise = await getUrls();
      const data = await promise.json();
      this.setState({
          urls: data.urls
        })
    } catch (err) {
      this.setState({
          error: err
        })
    }
  }

  updateUrls = (updatedUrls) => {
    this.setState({urls: updatedUrls});
    console.log('update', this.state.urls)
  }

  componentDidMount = () => {
    this.getAllUrls();
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm updateUrls={this.updateUrls}/>
        </header>
          <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
