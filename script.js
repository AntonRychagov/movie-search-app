const apiKey = "b31c8dc2";
const HIDDEN_CLASSNAME = "btn__hidden";

const inputValueNode = document.querySelector("#inputValue");
const buttonFindNode = document.querySelector("#button");
const movieListNode = document.querySelector("#movieList");
const movieInfoNode = document.querySelector("#movieInfo");

buttonFindNode.addEventListener("click", findMovie);
movieListNode.addEventListener("click", loadMovieInfo);

init();

function init() {
  inputValueNode.focus();
}

//отправялем запрос на сервер
async function movieSearch(movieTitle) {
  //отправляем запрос на сервер
  const res = await fetch(
    `https://www.omdbapi.com/?s=${movieTitle}&apikey=b31c8dc2`
  );
  //получаем ответ
  const data = await res.json();
  if (data.Response === "True") {
    showMovies(data.Search);
  }

  loadMovieInfo();
}

//получаем название фильма от USER
function findMovie() {
  let movieTitle = inputValueNode.value.trim();
  movieSearch(movieTitle);
  movieListNode.classList.remove("movie__list-hidden");
  movieInfoNode.classList.add("movie__info-hidden");
  clearInput();
}

//отрисовываем HTML
function showMovies(movies) {
  return (movieListNode.innerHTML = movies
    .map((movie) => {
      let moviePoster = "./resources/no-img.png";

      if (movie.Poster !== "N/A") {
        moviePoster = movie.Poster;
      }

      return `
        <li id=${movie.imdbID} class='movie__item'>
          <div class='movie__poster'>
            <img class='movie__img' src='${moviePoster}'>
          </div>
          <div class='movie__description'>
            <h2 class='movie__title'>${movie.Title}</h2>
            <p class='movie__year'>${movie.Year}</p>
            <p class='movie__type'>${movie.Type}</p>
          </div>
        </li>
        `;
    })
    .join(""));
}

function loadMovieInfo() {
  //находим список фильмов по классу
  const searchMovie = movieListNode.querySelectorAll(".movie__item");
  //проходим циклом для каждого элемента в списке
  searchMovie.forEach((movie) => {
    //выполняем действие при клике на фильм
    movie.addEventListener("click", async () => {
      movieListNode.classList.add("movie__list-hidden");
      movieInfoNode.classList.remove("movie__info-hidden");
      //отправляем запрос на сервер
      const res = await fetch(
        `https://www.omdbapi.com/?i=${movie.id}&apikey=b31c8dc2`
      );
      //получаем ответ от сервера
      const movieInfo = await res.json();
      //
      showMovieInfo(movieInfo);
      backToList();
    });
  });
}

function backToList() {
  const backButtonNode = document.querySelector(".back__btn");
  backButtonNode.addEventListener("click", classSelector);
}

function classSelector() {
  movieListNode.classList.remove("movie__list-hidden");
  movieInfoNode.classList.toggle("movie__info-hidden");
}

//отрисовываем HTML разметку
function showMovieInfo(movie) {
  movieInfoNode.innerHTML = `
  <button class="back__btn"></button>
  <div class="movie__inner">
    <div class="movie__info-img">
      <img class='poster__movie' src="${
        movie.Poster !== "N/A" ? movie.Poster : "resources/no-img.jpg"
      }" alt="">
    </div>
    <div class="movie__info-description">
      <h2 class="title">${movie.Title}</h2>
      <p><span class='description'>Year: ${movie.Year}</span></p>
      <p><span class='description'>Rating: ${movie.Rated}</span></p>
      <p><span class='description'>Release date: ${movie.Released}</span></p>
      <p><span class='description'>Running time: ${movie.Runtime}</span></p>
      <p><span class='description'>Genre: ${movie.Genre}</span></p>
      <p><span class='description'>Directed by: ${movie.Director}</span></p>
    </div>
  </div>
  <div class="plot">${movie.Plot}</div>
  
  `;
}

function clearInput() {
  inputValueNode.value = "";
}

// movieListNode.innerHTML = "";

// for (let i = 0; i < movies.length; i++) {

//   let listMovie = document.createElement("li");

//   listMovie.dataset.id = movies[i].imdbID;

//   if (movies[i].Poster !== "N/A") {
//     moviePoster = movies[i].Poster;
//   } else {
//     moviePoster = "./resources/no img.jpg";
//   }

//   movieListNode.innerHTML += `
//   <li class='movie__item'>
//     <div class='movie__img'>
//       <img src="${moviePoster}">
//     </div>
//     <div class='movie__wrapper'>
//       <h2 class='movie__title'>${movies[i].Title}</h2>
//     </div>
//   </li>
//   `;
// }
// };
