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

  requestPeople = e => {
    fetch('https://swapi.co/api/people')
    .then((response) => {
      return response.json()
    .then((jsonResponse) => {
      const allPeople = jsonResponse.results
      this.setState ({
        people: allPeople
      })
    })
    })
  }

  searchByFilms = e => {
    const filteredPeople = []
    {this.state.people.map(person => {
      var films = ''+person.films
      var species = ''+person.species
      if(films.includes("https://swapi.co/api/films/3") && species.includes("https://swapi.co/api/species/1"))
        {filteredPeople.push(person)}
    })}
    this.setState ({
      people: filteredPeople
    })
  }

  componentDidMount() {
    this.requestPeople();
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
      <input type="button" value="Film 3 and species 1" onClick={this.searchByFilms} />
      </header>
    </div>
  );
}
}


export default App;
/*
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
{this.state.films.map(film => {
        return<div>
        {film["title"]}
        </div>
})}

*/
