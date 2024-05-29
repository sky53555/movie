// let recent = document.querySelector("#recent")

// //내용
// async function RecentGenre() {
//     const response = await fetch(
//         `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=ko-KR&page=1`
//     );

//     const data = await response.json();
//     console.log(data);

//     const boxArray = Array.from(box);
//     console.log(boxArray);

//     const movieContent = document.querySelector("#movieContent");

//     let result = "";

//     data.results.forEach((movie, index) => {
//         const listItem = boxArray[index];
//         const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
//         const vote = movie.vote_average.toFixed(1)
//         const title = movie.title

//         result += `
//             <li>
//                 <div class="imgWrap">
//                     <span class="topIcon"><i class="fa-regular fa-heart"></i></span>
//                     <img src="${imgUrl}" alt="Movie Poster" id="moviePoster" />
//                 </div>
//                 <div class="textWrap">
//                     <div class="textTop">
//                         <h2 id="movieName">${title}</h2>
//                         <div class="textDown">
//                             <p><i class="fa-solid fa-star"></i><span id="rating">${vote}</span></p>
//                         </div>
//                     </div>
//                 </div>
//             </li>
//         `;
//     });
//     movieContent.innerHTML = result;
// }

// recent.addEventListener("click", () => {
//     RecentGenre();
//     genreName.textContent = "최신 영화";
// });
const API_KEY = "e771164d62de82fa2de8fde83d339c37"; // API 키
const movieContent = document.querySelector("#movieContent");

// 최신 영화 목록을 가져와서 화면에 표시하는 함수
async function RecentGenre() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`
    );
    const data = await response.json();

    // 최신 영화 목록을 표시하는 함수 호출
    displayRecentMovies(data.results);
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

// 최신 영화 목록을 화면에 표시하는 함수
function displayRecentMovies(movies) {
  let result = "";
  movies.forEach((movie) => {
    const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const vote = movie.vote_average.toFixed(1);
    const title = movie.title;

    result += `
            <li data-movie-id="${movie.id}">
                <div class="imgWrap">
                    <span class="topIcon"><i class="fa-regular fa-heart"></i></span>
                    <img src="${imgUrl}" alt="Movie Poster" class="moviePoster" />
                </div>
                <div class="textWrap">
                    <div class="textTop">
                        <h2 class="movieName">${title}</h2>
                        <div class="textDown">
                            <p><i class="fa-solid fa-star"></i><span class="rating">${vote}</span></p>
                        </div>
                    </div>
                </div>
            </li>
        `;
  });
  movieContent.innerHTML = result;

  // 영화 아이템을 클릭했을 때의 이벤트 리스너 추가
  const movieItems = document.querySelectorAll("#movieContent li");
  movieItems.forEach((item) => {
    item.addEventListener("click", () => {
      const movieId = item.dataset.movieId;
      if (movieId) {
        viewMovieDetails(movieId);
      }
    });
  });
}

// 영화 상세 정보 페이지로 이동하는 함수
function viewMovieDetails(movieId) {
  window.location.href = `http://127.0.0.1:5501/detail.html?id=${movieId}`;
}

// 최신 영화 클릭 이벤트 핸들러 추가
const recent = document.querySelector("#recent");
recent.addEventListener("click", () => {
  RecentGenre();
  genreName.textContent = "최신 영화";
});
