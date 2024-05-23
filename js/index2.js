const API_KEY = "5d3926ca1e71ba7d5ae9204ab7d2ea6a";
let num_movie = 8;
const container = document.querySelector("#subSection1");
let searchForm = document.querySelector(".search");
let searchInput = document.querySelector(".searchTex");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // 폼의 기본 동작 방지
  const query = searchInput.value.trim(); // 검색어 가져오기
  if (query === "") {
    alert("검색어를 입력하세요.");
    return;
  }

  // 영화 검색 함수 호출
  const searchResults = await searchMovies(query);

  // 검색 결과 표시
  displaySearchResults(searchResults);
  searchInput.value = "";

  document.querySelector(".more").addEventListener("click", async function () {
    num_movie += 8; // 추가로 표시할 영화 수 증가
    displayMoreResults();
  });
});

function appendSearchResults(results) {
  const ul = container.querySelector(".movies");
  results.forEach((movie) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="imgWrap">
          <img src="https://image.tmdb.org/t/p/w500/${
            movie.poster_path
          }" alt="${movie.title}" id="moviePoster">
        </div>
        <div class="textWrap">
          <div class="textTop">
            <h2 id="movieName">${movie.title}</h2>
            <span class="topIcon"><i class="fa-regular fa-heart"></i></span>
            <div class="textDown">
              <p><i class="fa-solid fa-star"></i><span id="rating">${movie.vote_average.toFixed(
                1
              )}</span></p>
            </div>
          </div>
        </div>
      `;
    ul.appendChild(li);
  });
}

window.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const query = searchInput.value.trim(); // 검색어 가져오기
    if (query === "") {
      alert("검색어를 입력하세요.");
      return;
    }

    try {
      // 영화 검색 함수 호출
      const searchResults = await searchMovies(query);

      // 검색 결과 표시
      displaySearchResults(searchResults);
    } catch {
      container.innerHTML = `<p>검색 결과가 없습니다.</p>`;
    }
    searchInput.value = "";
  }
});

async function searchMovies(query, num_movie) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
        query
      )}&page=1&include_adult=false`
    );
    if (!response.ok) {
      throw new Error("Failed to search movies");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function displayMoreResults() {
  const query = searchInput.value.trim(); // 검색어 가져오기
  if (query === "") {
    alert("검색어를 입력하세요.");
    return;
  }

  try {
    // 영화 검색 함수 호출
    const searchResults = await searchMovies(query, num_movie);

    // 추가 검색 결과 표시
    appendSearchResults(searchResults);
  } catch {
    container.innerHTML = `<h2 id="result">검색결과 : </h2>
        <p>검색 결과가 없습니다.</p>`;
  }
}
function displaySearchResults(results) {
  console.log(results + "results");
  container.innerHTML = `
      <h2 id="result">"검색결과 : ${searchInput.value.trim()}"</h2>
      <ul class="movies">
        ${results
          .map(
            (movie) => `
          <li>      
            <div class="imgWrap">
              <img src="https://image.tmdb.org/t/p/w500/${
                movie.poster_path
              }" alt="${movie.title}" id="moviePoster">
            </div>
            <div class="textWrap">
              <div class="textTop">
                <h2 id="movieName">${movie.title}</h2>
                <span class="topIcon"><i class="fa-regular fa-heart"></i></span>
                <div class="textDown">
                  <p><i class="fa-solid fa-star"></i><span id="rating">${movie.vote_average.toFixed(
                    1
                  )}</span></p>
                </div>
              </div>
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
      <div class="center">
        <button class="more">view more</button>
      </div>
    `;

  // 검색 결과가 없을 경우
  if (results.length === 0) {
    container.innerHTML = `<h2 id="result">검색결과 : </h2>
                            <p>검색 결과가 없습니다.</p>`;
    return;
  }
}
