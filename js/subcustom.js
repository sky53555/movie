let box = document.querySelectorAll("#subSection1 li");
console.log(box);

let api_key = 'e771164d62de82fa2de8fde83d339c37';

async function Movies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=ko-KR&page=1`
  );

  const data = await response.json();
  console.log(data);

  const boxArray = Array.from(box);
  console.log(boxArray);

  data.results.forEach((movie, index) => {
    const listItem = boxArray[index];

    // 영화 포스터 설정
    const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    listItem.querySelector("#moviePoster").setAttribute('src', imgUrl);

    // 영화 제목 설정
    listItem.querySelector("#movieName").textContent = movie.title;

    // 평점 설정
    listItem.querySelector("#rating").textContent = movie.vote_average;
  });
}

Movies();