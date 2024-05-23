// coustom.js

// TMDB API를 사용하여 영화 정보 가져오는 함수
async function getMovieInfo(movieName) {
  const api_key = `4878766355602e5dba7fc00d12fb5646`;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    movieName
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // API 응답에서 첫 번째 검색 결과 가져오기
    if (data.results.length > 0) {
      const movie = data.results[0];

      // 영화 정보 추출
      const title = movie.title;
      const releaseDate = movie.release_date;
      const overview = movie.overview;
      const rating = movie.vote_average;

      // 가져온 정보를 화면에 표시
      document.getElementById("movieName").innerText = title;
      document.getElementById("rating").innerText = rating;
      document.getElementById("release").innerText = releaseDate;
      document.getElementById("introduction").innerText = overview;
    } else {
      alert("영화 정보를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("Error fetching movie info:", error);
    alert("영화 정보를 가져오는 중 오류가 발생했습니다.");
  }
}

// 검색 폼 제출 시 실행되는 함수
function handleSubmit(event) {
  event.preventDefault(); // 기본 제출 동작 방지
  const searchTerm = document.querySelector(".searchTex").value;
  getMovieInfo(searchTerm);
}

// 검색 폼에 이벤트 리스너 추가
document.querySelector(".search").addEventListener("submit", handleSubmit);

// 페이지 로드 시 "파묘" 영화 정보 가져오기
document.addEventListener("DOMContentLoaded", () => {
  getMovieInfo("파묘");
});
