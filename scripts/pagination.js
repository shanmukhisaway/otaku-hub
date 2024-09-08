// Set up variables for the current page and total number of pages
let currentPage = 1;
let totalPages = 0;
let resultContainer = document.querySelector("#search-result-container");

// Set up a function to make the API request and update the UI
async function changePage(query) {
  resultContainer.innerHTML = `
  <div class="cube-spinner-container" id="cube-spinner">
  <div class="sk-cube-grid" id="cube-spinner">
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
  </div>
</div>`;
  // note query = to the link
  // Make the API request using the current page number as a parameter
  const response = await fetch(`${query}&page=${currentPage}`);
  const data = await response.json();
  // console.log(data);
  // console.log(`${query}&page=${currentPage}`);
  // Update the total number of pages
  totalPages = data.pagination.last_visible_page;
  // console.log(totalPages);

  // Update the UI to show the current page and total number of pages
  document.querySelector("#current-page").textContent = currentPage;

  // Enable or disable the "prev" button based on the current page
  if (currentPage == 1) {
    document.querySelector("#prev-btn").disabled = true;
  } else {
    document.querySelector("#prev-btn").disabled = false;
  }

  // Enable or disable the "next" button based on the current page
  if (currentPage == totalPages) {
    document.querySelector("#next-btn").disabled = true;
  } else {
    document.querySelector("#next-btn").disabled = false;
  }

  // Clear the data container

  resultContainer.innerHTML = changePageResult(data).join(" ");

  // Loop through the data and add it to the DOM
  // for (const user of data) {
  //   const p = document.createElement("p");
  //   p.textContent = user.login;
  //   document.querySelector("#search-result-container").appendChild(p);
  // }
}
//  onclick in search result
// Set up the "prev" button to decrement the current page and fetch new data
function prevPage(query) {
  currentPage--;

  changePage(query);
}

// Set up the "next" button to increment the current page and fetch new data
function nextPage(query) {
  currentPage++;
  changePage(query);
}

function changePageResult(anime) {
  let arrayOfResults = [];

  for (let index = 0; index < anime.data.length; index++) {
    const element = anime.data[index];

    let searchResultItem = `
        <div class="result-item" onclick="getAnimeInfo(${element.mal_id})">
        <div class="anime-poster" >
          <div class="anime-rating">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              data-value="${element.score}"
            >
              <circle r="45" cx="50" cy="50" />
              <!-- 282.78302001953125 is auto-calculated by path.getTotalLength() -->
              <path
                class="meter"
                d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dashoffset="282.78302001953125"
                stroke-dasharray="282.78302001953125"
              />
              <!-- Value automatically updates based on data-value set above -->
              <text
                x="50"
                y="50"
                text-anchor="middle"
                dominant-baseline="central"
                font-size="20"
              ></text>
            </svg>
          </div>
          <img src="${element.images.webp.large_image_url}" alt="${
      element.title
    } poster" id="poster-img" onload="displayRatingBar()"/>

          <span class="anime-type">${element.type}</span>
        </div>
        <div class="anime-info">
          <h3 class="anime-title">
            ${element.title}
          </h3>
          <div class="detail">
            <span>${
              element.episodes ? element.episodes + " ep" : "still ongoing"
            }</span><span> • </span><span>${element.duration}</span>
          </div>
        </div>
      </div>
        
        `;
    arrayOfResults.push(searchResultItem);
  }
  // console.log(arrayOfResults);
  return arrayOfResults;
}
