const API_KEY = "5d3926ca1e71ba7d5ae9204ab7d2ea6a";
let num_movie = 8;
const container = document.querySelector("#subSection1");
let searchForm = document.querySelector(".search");
let searchInput = document.querySelector(".searchTex");

// 검색을 하면(엔터를 누르거나 인풋을 클릭할때)
// 영화 정보를 가져온다.
// 가져온 영화 정보 중에서 화면에는 8개만 표시한다.
// <?  이렇게 하려면 가져온 영화 정보를 저장해 놔야하니? 아니 data에 있으니까 상관 없지 않나? 모든 정보는 거기 다 있으니까. ?>
// 검색한 결과에서 보여줄 결과가 더 남아있다면 더보기 버튼이 나온다.
// 더보기 버튼을 누른다.
// 그럼 검색한 결과에서 처음 8개를 제외한 다음 8개가 나온다.
// 더 보기 할 내역이 없다면 더보기 버튼은 사라진다.
// 검색을 다시 하면 검색을 한 내역으로 다시 나온다.

//검색하기 폼 누르고, 엔터키 치면 검색 시작

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // 폼의 기본 동작 방지

  const query = searchInput.value.trim(); // 검색어 가져오기
  if (query === "") {
    alert("검색어를 입력하세요.");
    return;
  }

  // 이전 검색 결과 지우기
  container.innerHTML = "";

  // 영화 검색 함수 호출
  const searchResults = await searchMovies(query);

  // 검색 결과 표시
  displaySearchResults(searchResults, query);
  searchInput.value = "";
});

//검색어로 검색하기
async function searchMovies(query) {
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

function noresult(results, query) {
  // 검색 결과가 없는 경우
  if (results.length === 0) {
    container.innerHTML = `<h2 id="result">검색 결과 : "${query}"</h2><p>검색 결과가 없습니다.</p>`;
    return;
  }
}

// 검색 결과 보여주기 (num_movie 이 숫자만큼만 가져오도록)
function displaySearchResults(results, num_movie) {
  //컨테이너 안에 li를 num_movie 숫자만큼 어떻게 넣지?
  //검색한 결과에 처음부터 여덟번째까지 보여주는데 결과 값에서 8개를 빼고 더 남아있다면 view more 버튼이 생긴다.
  //view more 버튼을 클릭하면 무슨 정보를 가져와야 하는지 알아보는 함수를 실행한다.
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
}
// 더 보기 누른 후 정보 더 가져오기(function1)

// 더 보기 누른 후 검색결과 추가하기 - li를 추가(function1한 걸 현재 화면에 li로 추가한다)
