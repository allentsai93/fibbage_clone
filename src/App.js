import React, { Component } from 'react';
import Game from './containers/Game';
import './App.css';

class App extends Component {
  state = {
    isLoaded: false,
    categoryChosen: false,
    loadedQuestion: {}
  }
  changeHandler = (e) => {
    this.fetchQuestions(e.target.value);
  }
  fetchQuestions = async (category) => {
    return fetch(`https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`)
            .then(res => res.json())
              .then(data => this.setState({loadedQuestion: data, categoryChosen: true}))
  }
  render() {
    return (
      <div className="App">
        {!this.state.categoryChosen ? 
        <>
        <h1>Choose a Category</h1>
        <select onChange={this.changeHandler} value={this.state.value}>
          <option value={"any"}>Any Category</option>
          <option value={"9"}>General Knowledge</option>
          <option value={"10"}>Entertainment: Books</option>
          <option value={"11"}>Entertainment: Film</option>
          <option value={"12"}>Entertainment: Music</option>
          <option value={"13"}>Entertainment: Musicals &amp; Theatres</option>
          <option value={"14"}>Entertainment: Television</option>
          <option value={"15"}>Entertainment: Video Games</option>
          <option value={"16"}>Entertainment: Board Games</option>
          <option value={"17"}>Science &amp; Nature</option>
          <option value={"18"}>Science: Computers</option>
          <option value={"19"}>Science: Mathematics</option>
          <option value={"20"}>Mythology</option>
          <option value={"21"}>Sports</option>
          <option value={"22"}>Geography</option>
          <option value={"23"}>History</option>
          <option value={"24"}>Politics</option>
          <option value={"25"}>Art</option>
          <option value={"26"}>Celebrities</option>
          <option value={"27"}>Animals</option>
          <option value={"28"}>Vehicles</option>
          <option value={"29"}>Entertainment: Comics</option>
          <option value={"30"}>Science: Gadgets</option>
          <option value={"31"}>Entertainment: Japanese Anime &amp; Manga</option>
          <option value={"32"}>Entertainment: Cartoon &amp; Animations</option>		
        </select></> : <Game question={this.state.loadedQuestion}/>}
      </div>
    );
  }
}

export default App;
