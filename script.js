/*
 * Copyright (c) 2020. Adam Arthur Faizal
 */

function ajax(url, success, error){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        try {
            if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    success(this);
                } else if (this.status === 403 || this.status === 404) {
                    error(this);
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
    xhr.open('get', url, true);
    xhr.send();
}

$('.search-button').click(function () {
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=ae201a99&s=${$('.input-movie').val()}`,
        success: function (result) {
            const data = result.Search.map(element => {
                return `
                    <div class="col-md-4 my-5">
                        <div class="card">
                            <img src="${element.Poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${element.Title}</h5>
                                <h6 class="card-subtitle text-muted mb-2">${element.Year}</h6>
                                <button type="button" class="btn btn-primary detailsModal" data-imdbid="${element.imdbID}">Show Details</button>
                            </div>
                        </div>            
                    </div>
            `
            }).join('');
            $('.daftar-film').html(data);
            $('.detailsModal').click(function () {
                $('#moviesModal').modal('show');
                ajax(`http://www.omdbapi.com/?apikey=ae201a99&i=${$(this).data('imdbid')}`,
                    function (result) {
                        const element = JSON.parse(result.response);
                        const data = `
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-3">
                                    <img src="${element.Poster}" alt="Gambar" class="img-fluid">
                                </div>
                                <div class="col-md">
                                    <ul>
                                        <li class="list-group-item"><h4>${element.Title} (${element.Year})</h4></li>
                                        <li class="list-group-item"><strong>Director : </strong>${element.Director}</li>
                                        <li class="list-group-item"><strong>Actors : </strong>${element.Actors}</li>
                                        <li class="list-group-item"><strong>Writer : </strong>${element.Writer}</li>
                                        <li class="list-group-item"><strong>Plot : </strong><br>${element.Plot}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>`;
                        $('.modal-body').html(data);
                    },
                    function (error) {
                        console.error(JSON.parse(error.response));
                    }
                )
            })
        },
        error: function (error) {
            console.error(error);
        }
    });
});
