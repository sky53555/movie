document.addEventListener("DOMContentLoaded", function () {
  var topIcons = document.querySelectorAll(".topIcon i");
  var favoritesList = document.querySelector(".category p:last-child"); // 찜목록을 보여줄 위치를 가져옵니다.

  topIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      var movieId = icon.dataset.movieId; // 각 아이콘의 영화 ID를 가져옵니다.
      var favorites = JSON.parse(localStorage.getItem("favorites")) || []; // 로컬 스토리지에서 찜한 목록을 가져옵니다.

      if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        favorites.push(movieId); // 찜하기 목록에 추가합니다.
      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        favorites = favorites.filter(function (id) {
          return id !== movieId; // 찜하기 목록에서 제거합니다.
        });
      }

      localStorage.setItem("favorites", JSON.stringify(favorites)); // 로컬 스토리지에 업데이트된 찜하기 목록을 저장합니다.

      // 찜목록을 업데이트합니다.
      updateFavoritesList(favorites);
    });
  });

  // 찜목록을 업데이트하는 함수
  function updateFavoritesList(favorites) {
    favoritesList.innerHTML = "찜목록 (" + favorites.length + ")";
  }
});
