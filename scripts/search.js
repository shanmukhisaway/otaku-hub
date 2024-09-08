let inputEl = document.getElementById("input-element");
let searchBtn = document.getElementById("search-btn");
let announceEl = document.getElementById("announce");

// let announcementState = false
// // true = show false = hidden
// let waitingState = ""
// // generating or searching
// async function announce(){

//   if (announcementState) {
//     announceEl.textContent = waitingState
//     announceEl.style.display = "block"
//   } else {
//     announceEl.style.display = "none"
//   }
// }
let searchingState = false;
let searchingLoader = document.getElementById("searching");
// Execute a function when the user presses a key on the keyboard
inputEl.addEventListener("keypress", function (event) {
  if (!searchingState) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      searchBtn.click();
    }
  }
});
searchBtn.addEventListener("click", () => {
  if (!searchingState) {
    searchingState = true;
    searchingLoader.style.display = "inline-block";
    getSearchResult();
  }
});

let userQuery;
let queryLink;

async function getSearchResult() {
  let searchValue = inputEl.value;

  userQuery = searchValue;
  const response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${searchValue}&limit=10`
  );
  queryLink = `https://api.jikan.moe/v4/anime?q=${searchValue}&limit=10`;
  if(response.ok){
    const data = await response.json();
    generateResult(data);
  }

  
}

function generateResult(anime) {
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
    } poster" id="poster-img"/>

          <span class="anime-type">${element.type}</span>
        </div>
        <div class="anime-info">
          <h3 class="anime-title">
            ${element.title_english ? element.title_english : element.title}
          </h3>
          <div class="detail">
            <span>${element.aired.prop.from.year}</span><span> • </span><span>${
      element.episodes
        ? element.episodes + " ep - " + element.duration
        : "ongoing"
    }</span>
          </div>
        </div>
      </div>
        
        `;
    arrayOfResults.push(searchResultItem);
  }
  generateSearchHTML(arrayOfResults);
}

function generateSearchHTML(resultItems) {
  // console.log(resultItems);
  let searchResultBlueprint = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Search Result for: ${userQuery}</title>

    
    <link rel="stylesheet" href="./styles/pagination.css" />
    <link rel="stylesheet" href="./styles/style.css" />
    <link rel="stylesheet" href="./styles/spinners/spinner.css" />
    <link rel="stylesheet" href="./styles/spinners/cube-spinner.css" />
    <link rel="stylesheet" href="./styles/rating-circle/circle-bar.css" />
    <link rel="stylesheet" href="./styles/spinners/searching-loader.css" />
    <link rel="stylesheet" href="./styles/search-result.css" />
    

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Sora&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
  <span class="search-loader" id="searching"></span>
 
  <div id="loader-fullscreen">
  <div class="loading" >
    <span class="loader" id="loader"></span>
  </div>
</div>
    <header>
      <h1>Otaku Covers</h1>

      <div class="search-bar">
        <input
          value="${userQuery}"
          id="input-element"
          placeholder="Search Anime e.g. One Piece"
          type="search"
        /><button id="search-btn">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 7H7V6H8V7Z" fill="black" />
            <path d="M7 8H6V7H7V8Z" fill="black" />
            <path d="M8 15H7V14H8V15Z" fill="black" />
            <path d="M14 7H13V6L14 6V7Z" fill="black" />
            <path d="M15 8H14V7H15V8Z" fill="black" />
            <path d="M16 16H15V15H16V16Z" fill="black" />
            <path d="M17 17H16V16H17V17Z" fill="black" />
            <path d="M18 18H17V17H18V18Z" fill="black" />
            <path d="M19 19H18V18H19V19Z" fill="black" />
            <path d="M7 14H6V13H7V14Z" fill="black" />
            <path d="M14 13V14H13V15H15V13H14Z" fill="black" />
            <path d="M16 8H15V13H16V8Z" fill="black" />
            <path d="M8 5V6L13 6V5L8 5Z" fill="black" />
            <path d="M5 13H6V8H5L5 13Z" fill="black" />
            <path d="M8 15V16H13V15H8Z" fill="black" />
            <path
              d="M7 8H6V13H7V14H8V15H13V14H14V13H15V8H14V7H13V6H8V7H7V8Z"
              fill="#11f97d"
            />
          </svg>
        </button>
      </div>
    </header>
    <h1>
      Search Result for:<br />
      ${userQuery}
    </h1>
    <p class="search-tip">
      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather info-svg"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line></svg
      ></span><span style="color:red;">Note!!! Adult entries aren't filtered out</span><br/>
      Not expected result? Check for typos and check your inputs it should have a proper spacing and spelling. Or try to put their japanese title
    </p>

    <div class="search-result" id="search-result-container">
       ${resultItems.join(" ")} 

    </div>

    <div class="pagination-container">
    <button id="prev-btn" onclick='prevPage("${queryLink}")' disabled ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg> Prev</button><span id="current-page" disabled> 1 </span><button id="next-btn" onclick='nextPage("${queryLink}")'>Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg></button>
</div>


    
    
    <script src="./scripts/pagination.js"></script>
    <script src="./scripts/rating-circle/circle-bar.js"></script>
    <script src="./scripts/search.js"></script>
    <script src="./scripts/script.js"></script>
    
    

  </body>
</html>
`;
  let tab = window.open(searchResultBlueprint, "_blank");
  tab.document.write(searchResultBlueprint);
  tab.document.close();
  searchingLoader.style.display = "none";
  searchingState = false;
}

// cant use the import so i put it
function displayRatingBar() {
  let meters = document.querySelectorAll("svg[data-value] .meter");
  // console.log(meters);
  meters.forEach((path) => {
    // Get the length of the path
    let length = path.getTotalLength();

    // Just need to set this once manually on the .meter element and then can be commented out
    // path.style.strokeDashoffset = length;
    // path.style.strokeDasharray = length;

    // Get the value of the meter
    let value = parseFloat(path.parentNode.getAttribute("data-value"));

    // Calculate the percentage of the total length
    let to = length * ((10 - value) / 10);
    path.getBoundingClientRect();
    // Set the Offset
    path.style.strokeDashoffset = Math.max(0, to);
    path.nextElementSibling.textContent = `${value}`;
  });
}
