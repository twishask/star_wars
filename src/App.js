import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      people: [],
      input: '',
      films: [],
    }
  }

  requestPeople = async() => {
    var i;
    var temp = this.state.people
    for(i=1; i<10; i++){
        const response = await fetch('https://swapi.co/api/people/?page='+i)
        const jsonResponse = await response.json();
        const people = temp.concat(jsonResponse.results)
        temp = people
    }
    console.log(temp)
    this.setState ({
        people: temp
    })
  }

  requestFilms = async() => {
    var i;
    var temp = this.state.films
        const response = await fetch('https://swapi.co/api/films')
        const jsonResponse = await response.json();
        const films = temp.concat(jsonResponse.results)
        temp = films
        console.log(temp)

    this.setState ({
        films: temp
    })
  }

  requestSpecies = async() => {
    var i;
    var temp = this.state.people
    for(i=1; i<10; i++){
        const response = await fetch('https://swapi.co/api/people/?page='+i)
        const jsonResponse = await response.json();
        const people = temp.concat(jsonResponse.results)
        temp = people
        console.log(temp)
    }
    this.setState ({
        people: temp
    })
  }

  componentDidMount() {
    this.requestPeople();
    this.requestFilms();
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
      {this.state.people.map(person => {
              return<div>
              {person["name"]}
              </div>
      })}
      {this.state.films.map(film => {
              return<div>
              {film["title"]}
              </div>
      })}
      </header>
    </div>
  );
}
}


export default App;
/*
*/
