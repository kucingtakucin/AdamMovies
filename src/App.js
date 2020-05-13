import React, {Component} from 'react';
import './assets/css/style.css';
import {Route, Switch} from "react-router-dom";

class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            data2: [],
            error: null,
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('click', async (event) => {
            if (event.target.classList.contains('detailsModal')) {
                await this.handleDetails(event.target.dataset.imdbid);
            }
        })
    }

    async handleSearch(){
        await fetch(`https://www.omdbapi.com/?apikey=ae201a99&s=${
            document.getElementById('input-movie').value}`)
            .then(response => response.json())
            .then(results => {
                this.setState({
                    data1: results.Search,
                });
            })
            .catch(errors => {
                this.setState({
                    error: errors
                });
                console.error(this.state.error);
            });
    }

    async handleDetails(imdbid) {
        await fetch(`https://www.omdbapi.com/?apikey=ae201a99&i=${imdbid}`)
            .then(response => response.json())
            .then(results => {
                this.setState({
                    data2: results,
                });
            })
            .catch(errors => {
                this.setState({
                    error: errors,
                })
            });
    }

    ShowCards() {
        if (this.state.data1 !== undefined) {
            return (
                <React.Fragment>
                    {this.state.data1.map(result => {
                        return (
                            <div className="col-md-4 my-5" key={result.imdbID + new Date().getMilliseconds() + Math.random()}>
                                <div className="card">
                                    <img src={result.Poster} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{result.Title}</h5>
                                        <h6 className="card-subtitle text-muted mb-2">{result.Year}</h6>
                                        <button type="button" className="btn btn-primary detailsModal" data-toggle="modal" data-target="#moviesModal" data-imdbid={result.imdbID}>Show Details</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </React.Fragment>
            );
        } else {
            return <h1>No Result</h1>
        }
    }

    showDetails(){
        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <img src={this.state.data2.Poster} alt="Gambar" className="img-fluid"/>
                </div>
                <div className="col-md">
                    <ul>
                        <li className="list-group-item"><h4>{this.state.data2.Title} ({this.state.data2.Year})</h4></li>
                        <li className="list-group-item"><strong>Director : </strong>{this.state.data2.Director}</li>
                        <li className="list-group-item"><strong>Actors : </strong>{this.state.data2.Actors}</li>
                        <li className="list-group-item"><strong>Writer : </strong>{this.state.data2.Writer}</li>
                        <li className="list-group-item"><strong>Plot : </strong><br/>{this.state.data2.Plot}</li>
                    </ul>
                </div>
            </div>
        </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="container">
                        <h1 className="mt-5 mb-5 font-weight-bold display-4">AdamMovies.com</h1>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control input-movie" id="input-movie"
                                   placeholder="Search movie" aria-label="Search movie"
                                   aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary search-button"
                                        id="search-button" onClick={this.handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <div className="row daftar-film">
                            {this.ShowCards()}
                        </div>
                    </div>
                    <div className="modal fade" id="moviesModal" tabIndex="-1" role="dialog"
                         aria-labelledby="moviesModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="moviesModalLabel">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {this.showDetails()}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <h5 className="text-center">Copyright &copy; {new Date().getFullYear()}. Adam Arthur Faizal</h5>
                </footer>
            </React.Fragment>
        );
    }
}

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={MyApp} exact/>
            </Switch>
        )
    }
}

export default App;
