/*
 * Copyright (c) 2020. Adam Arthur Faizal
 */
ajax();
document.getElementById('search-button')
    .addEventListener("click", function () {
        fetch(`https://www.omdbapi.com/?apikey=ae201a99&s=${
            document.getElementById('input-movie').value}`)
            .then(response => response.json())
            .then(results => {
                results.Search.forEach(result => {
                    document.querySelector('.daftar-film')
                        .innerHTML += `
                        <div class="col-md-4 my-5">
                            <div class="card">
                                <img src="${result.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${result.Title}</h5>
                                    <h6 class="card-subtitle text-muted mb-2">${result.Year}</h6>
                                    <button type="button" class="btn btn-primary detailsModal" data-toggle="modal" data-target="#moviesModal" data-imdbid="${result.imdbID}">Show Details</button>
                                </div>
                            </div>            
                        </div>`;
                })
                document.querySelectorAll('.detailsModal')
                    .forEach(element => {
                        element.addEventListener('click', function () {
                            fetch(`https://www.omdbapi.com/?apikey=ae201a99&i=${this.dataset.imdbid}`)
                                .then(response => response.json())
                                .then(results => {
                                    document.querySelector('.modal-body')
                                        .innerHTML = `
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img src="${results.Poster}" alt="Gambar" class="img-fluid">
                                                </div>
                                                <div class="col-md">
                                                    <ul>
                                                        <li class="list-group-item"><h4>${results.Title} (${results.Year})</h4></li>
                                                        <li class="list-group-item"><strong>Director : </strong>${results.Director}</li>
                                                        <li class="list-group-item"><strong>Actors : </strong>${results.Actors}</li>
                                                        <li class="list-group-item"><strong>Writer : </strong>${results.Writer}</li>
                                                        <li class="list-group-item"><strong>Plot : </strong><br>${results.Plot}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>`;})
                                .catch(error => console.error(error));
                        })
                    })
            })
            .catch(error => console.error(error))
    })

