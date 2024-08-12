const searchForm = document.querySelector("#navForm");
const movieContainer = document.querySelector(".movieContainer");
const inputBox = document.querySelector(".inputBox");

// function to fetch movie details using OMDB api
const getMovieInfo = async (movie)=>{
    try{
        const myApiKey = "8593bdff";
        const url = `//www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch movie data.")
        }
        const data = await response.json();
        //console.log(data);

    showMovieData(data);
    }
    catch(error){
        showErrorMessage("No movie found!!!")
    }

}
// show movie data on screen
const showMovieData = (data)=>{
    movieContainer.innerHTML = "";
    movieContainer.classList.remove("noBackground");
    //use Destructing assignment to extract properties from data object
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    //create a div element to store values
    const movieElement = document.createElement('div');
    movieElement.classList.add("movieInfo");
    movieElement.innerHTML = `<h2>${Title}</h2> 
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
    // movieContainer.appendChild(movieElement);

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add("movieGenre");
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });
     movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released date: </strong>${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>`;
    //movieContainer.appendChild(movieElement);

    //create a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add("moviePoster");
    moviePosterElement.innerHTML = `<img src="${Poster}" />`;

    movieContainer.appendChild(moviePosterElement); 
    movieContainer.appendChild(movieElement);
}

// function to dispaly error message
const showErrorMessage = (message)=>{
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add("noBackground");
}

//function to handle form submission
const handleFormSubmission = (e)=>{
    e.preventDefault();
    console.log(inputBox.value);

    const movieName = inputBox.value.trim(); /*trim() remove all front and back places */
    if(movieName !== ""){
        showErrorMessage("Fetching Movie Information....")
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name to get movie information")
    }
}

//to search form
searchForm.addEventListener("submit", handleFormSubmission);