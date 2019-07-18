import React, { Component } from 'react';
import './App.css';

class Detail extends Component {

  constructor() {
    super();
    this.state = {
      character: '',
      species: '',
      speciesUrl: '',
      starships: [],
      films: [],
      allFilms : ["A New Hope", "The Empire Strikes Back","Return of the Jedi", "The Phantom Menace", "Attack of the Clones", "Revenge of the Sith", "The Force Awakens"],
    }
  }

  componentDidMount() {
    this.character();
  }

  character = async() => {
    const { id } = this.props.match.params
    const response = await fetch('https://swapi.co/api/people/'+id)
    const jsonResponse = await response.json();
    this.setState ({
      character: jsonResponse,
    })
    this.species(jsonResponse.species);
    this.starships(jsonResponse.starships);
    this.films(jsonResponse.films);
  }

  species(speciesUrl) {
    fetch(speciesUrl)
    .then((response) => {
      return response.json()
      .then((jsonResponse) => {
        this.setState ({
          species: jsonResponse.name,
        })
    })
  })
  }

  starships = async(starshipsArray) => {
    var i;
    var temp = this.state.starships
    for(i=0; i<starshipsArray.length; i++){
        const response = await fetch(starshipsArray[i])
        const jsonResponse = await response.json();
        const starships = temp.concat(jsonResponse.name)
        temp = starships
        this.setState ({
          starships: temp
        })
    }
  }

  films(filmArray) {
    const temp=[];
    filmArray.map(film => {
      const url = film.split("/");
      const filmNumber = url[5]
      temp.push(filmNumber)
    })
    this.setState ({
      films: temp
    })
  }

  render() {
    return(
      <div className="Details">
        <h2> Details</h2>
        <table>
        <tr>
        <td><h4>Name: </h4></td>
        <td>{this.state.character["name"]}</td>
        </tr><tr>
        <td><h4>Movies: </h4></td>
        <td>{this.state.films.map(item => {return <div>{this.state.allFilms[item-1]}</div> })}</td>
        </tr><tr>
        <td><h4>Species: </h4></td>
        <td>{this.state.species}</td>
        </tr><tr>
        <td><h4>Starships: </h4></td>
        <td>{this.state.starships.map(item => {return <div>{item}</div> })}</td>
        </tr></table>
      </div>
    )
  }
}

export default Detail
