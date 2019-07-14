import React, { Component } from 'react';
import './App.css';
import MultiSelect from "@khanacademy/react-multi-select";

class App extends Component {

  constructor() {
    super()
    this.state = {
      people: [],
      species: [],
      allPeople: [],
      selected: [],
      films : [
        {label: "A New Hope", value: 1},
        {label: "The Empire Strikes Back", value: 2},
        {label: "Return of the Jedi", value: 3},
        {label: "The Phantom Menace", value: 4},
        {label: "Attack of the Clones", value: 5},
        {label: "Revenge of the Sith", value: 6},
        {label: "The Force Awakens", value: 7},
      ],
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
        this.setState ({
          people: temp,
          allPeople: temp
        })
    }
  }

  requestSpecies = async() => {
    var i;
    var temp = this.state.species
    for(i=1; i<5; i++){
        const response = await fetch('https://swapi.co/api/species/?page='+i)
        const jsonResponse = await response.json();
        const species = temp.concat(jsonResponse.results)
        temp = species
        this.setState ({
          species: temp,
        })
    }
    console.log(this.state.species)
  }

  componentDidMount() {
    this.requestPeople();
    this.requestSpecies();
  }

  details = e => {

  }

  handleSelectedFilms = e => {
    this.setState ({
      selected: e
    })
  }

  handleSpeciesFilter = e => {
    this.setState ({
      speciesNumber : e.target.value
    })
  }

  filmfilter = e => {
    const selected = this.state.selected
    var personFilms = ""+e.films
    var i
    for(i=0; i<selected.length; i++){
      var filmUrl = "https://swapi.co/api/films/"+selected[i]
      if(personFilms.includes(filmUrl)){}
      else {
        console.log("False working");
        return false
      }
    }
    console.log("True working")
    return true
  }

  speciesFilter = e => {
    var speciesUrl = "https://swapi.co/api/species/"+this.state.speciesNumber
    var personSpecies = ""+e.species
    console.log(e.species)
    if (personSpecies.includes(speciesUrl)) {
        return true
    }
    else {
      return false
    }
  }

  searchByFilters = e => {
    const filteredPeople=[]
    this.state.allPeople.map(person => {
      if(this.filmfilter(person) && this.speciesFilter(person)){
        filteredPeople.push(person)
      }
    })
    this.setState ({
      people: filteredPeople
    })
  }

  render() {
    const selectSettings ={selectSomeItems: "Select movies...", allItemsAreSelected: "All Movies are Selected",}
    return (
    <div className="App">
      <header className="App-header">
      <div className="Filter-section">
      <h2 align="center">Filter List</h2>
        <div className="Film-filter">
        <MultiSelect overrideStrings={selectSettings} options={this.state.films} selected={this.state.selected} onSelectedChanged={this.handleSelectedFilms} />
        </div>
        <br></br><br></br>
        <div className="Species-filter" onChange={this.handleSpeciesFilter.bind(this)}>
          <h4>Filter by Species</h4>
          {this.state.species.map(item => {
            const url = item["url"]
            const speciesNumber = url.split("/");
            return <div>
                    <input type="radio" name="species" value={speciesNumber[5]} />{item["name"]}
                  </div>
          })}
        </div>
        <input type="button" value="Apply filters" onClick={this.searchByFilters.bind(this)} />
      </div>
      <div className="Character-list">
      <h2 align="center">Characters</h2>
      <ul>
      {this.state.people.map(person => {
              return<li onClick={this.details}>
              {person["name"]}
              </li>
      })}
      </ul>
      </div>
      </header>
    </div>
  );
}
}

export default App;
