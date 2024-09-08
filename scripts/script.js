let generatingState = false;
let loadingSquare = document.getElementById("loader-fullscreen");
let loaderSquare = document.getElementById("loader");

// searchBtn.addEventListener("click", () => getSearchResult());

function checkState() {
  if (generatingState) {
    loadingSquare.style.display = "block";
    loaderSquare.style.display = "block";
  } else {
    loadingSquare.style.display = "none";
    loaderSquare.style.display = "none";
  }
}

// let inputEl = document.getElementById("input-element");
// let searchBtn = document.getElementById("search-btn");
// let loadingEl = document.getElementById("loading")
// var generatingState = false
// // searchBtn.addEventListener("click", () => getSearchResult());
// function checkState(){
//   if (generatingState) {
//     loadingEl.style.display = 'block'
//   }else{
//     loadingEl.style.display = 'none'
//   }
// }

// DONT HOW THE ASYNC WORK
// PASS AN ANIME ID IN FUNCTION

async function getAnimeInfo(ANIME_ID) {
  generatingState = true;
  checkState();

  await fetch(`https://api.jikan.moe/v4/anime/${ANIME_ID}/full`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(async (anime) => {
      // console.log(anime);
      // console.log(anime.data.mal_id);
      // console.log(anime.data.genres[1].name);
      // GET AUTHOR
      let authorName = await getAnimeAuthor(ANIME_ID);
      // console.log(anime.data)
      // console.log(anime.data.synopsis.replaceAll("\n", '<br/>'))
      // THE BLUEPRINT
      // console.log(anime.data);
      // console.log(anime.data.genres.map(({ name }) => name).join(", "));

      let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${anime.data.title}</title>
    
        <link rel="stylesheet" href="./styles/card-style.css" />

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Sora&display=swap" rel="stylesheet">
        <style>
        #rangeSlider{
          position: fixed;
          top: 10px;
          left: 10px;
          opacity: 1;
          -webkit-transition: .2s;
          transition: opacity .2s;
          z-index: 9;
        }
        
        </style>
    
        </head>
      <body>
      ${
        window.innerWidth >= 768
          ? '<input type="range" min="50" max="150" id="rangeSlider" ></input>'
          : " "
      }
     
      
      
        <main id="main" >

          <div class="anime-cover-container">
            <img src="${anime.data.images.webp.large_image_url}" alt="aasd" />
          </div>
    
          <div class="anime-title-container" id="anime-cover-container">
            <h2>${
              anime.data.title_english
                ? anime.data.title_english
                : anime.data.title
            }</h2>
            <p>${anime.data.aired.prop.from.year} <i class="anime-season">${
        anime.data.season ? anime.data.season : ""
      }</i></p>
          </div>
    
          <p class="anime-description" id="anime-sypnosis">
            ${truncate(anime.data.synopsis)}
          </p>
    
          <div class="anime-info-container">
            
            <p><strong>Author: </strong>${authorName}</p>
           
            <p><strong>Genre: </strong> ${anime.data.genres
              .map(({ name }) => name)
              .join(" , ")}</p>
            ${
              anime.data.themes.length
                ? `<p><strong>Themes: </strong> ${anime.data.themes
                    .map(({ name }) => name)
                    .join(" , ")}</p>`
                : " "
            }
            
            
            <p><strong>Episode: </strong>${
              anime.data.episodes ? anime.data.episodes : "ongoing"
            }</p>
            <p><strong>Duration: </strong>${anime.data.duration}</p>
            <p>
              <strong>Status: </strong>${anime.data.status} <br />
              (${anime.data.aired.string})
            </p>
            <p><strong>Studio: </strong>${anime.data.studios.map(
              ({ name }) => name
            )}
            </p>
            <p><strong>MAL Rank: </strong>${anime.data.rank}</p>
            <p><strong>MAL Rating: </strong>${
              anime.data.score ? anime.data.score : "not rated"
            }</p>
          </div>
        </main>

        <script src="./scripts/script.js"></script>
        <script>
        const rangeSlider = document.getElementById('rangeSlider');
        const animeCover = document.getElementById("anime-cover-container")
        const animeMain = document.getElementById("main")
  
  rangeSlider.addEventListener('input', () => {
    
    if(rangeSlider.value){
    animeCover.style.width = rangeSlider.value + "%";
    animeMain.style.scale = rangeSlider.value / 100;
    }
  })
  
</script>
        
      </body> 
    </html>
    
  `;

      var tab = window.open(html, "_blank");
      tab.document.write(html); // where 'html' is a variable containing your HTML
      tab.document.close(); // to finish loading the page
    })
    .catch((error) => {
      alert(error);
    });

  generatingState = false;
  checkState();
  // console.log("fhgfgxhgyfn");
}

function getAnimeAuthor(ANIME_ID) {
  let myResponse = fetch(`https://api.jikan.moe/v4/anime/${ANIME_ID}/staff`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    })
    .then((staff) => {
      let originalCreator = "";
      if (!staff.data) {
        return "unknown";
      }

      let filtered = staff.data.filter((str) =>
        str.positions.includes("Original Creator")
      );

      // if have multiple author

      filtered.forEach((element, index) => {
        if (index === filtered.length - 1) {
          originalCreator += `${element.person.name}`;
        } else {
          originalCreator += `${element.person.name}   |   `;
        }
        // console.log(`${index} : ${filtered.length - 1}`);
      });
      // console.log(filtered);
      // console.log(originalCreator);
      return originalCreator;
    })
    .catch((error) => {
      alert(error);
      // Retry the fetch request after a delay
      setTimeout(getAnimeAuthor, 5000);
    });

  return myResponse;
}

function truncate(str) {
  if (!str) {
    return "not provided";
  }

  const fullText = str.replaceAll("\n", "<br/>");
  // GET THE FIRST 100 CHARACTER
  let myTruncatedString = fullText.substring(0, 200);
  // GET THE REMOVED CHARACTER OR THE CHARACTER FROM INDEX 100 TO THE LAST INDEX
  let myRemovedString = fullText.substring(200);

  return (
    myTruncatedString +
    `<span id="dots" onclick="showWholeText()">... <strong>+more</strong></span><span onclick="hideWholeText()" id="more">${myRemovedString}</span>`
  );
}

// hide the text next to the ellipsis or SHORTEN THE DESCRIPTION
function hideWholeText() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  // console.log("hide");
  // MAKE DOTS REAPPEAR AND SHORTEN TEXT
  dots.style.display = "inline";
  moreText.style.display = "none";
}
// show all the full description and HIDE THE ELLIPSIS
function showWholeText() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  // console.log("show");
  // MAKE THE DOT HIDE AND THE FULL TEXT APPEAR
  dots.style.display = "none";
  moreText.style.display = "inline";
}

function untruncate(originalString) {
  let originalStr = originalString;
  let spanEl = document.getElementById("ellipsis");
  // console.log(spanEl.textContent);
  spanEl.addEventListener("click", () => {
    SpanEl.textContent = originalStr;
    // console.log("fsdfjhsbfsvfbsv");
  });
}

async function getTopAnime() {
  await fetch("https://api.jikan.moe/v4/top/anime?limit=10")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    })
    .then((anime) => {
      // console.log(anime);
      document.getElementById("cube-spinner").style.display = "block";
      document.getElementById("popular-anime-container").style.display = "none";
      // console.log(anime.data.rating)
      // console.log(anime.data)
      anime.data.forEach((element) => {
        // console.log(element)
        let div = document.createElement("div");
        let img = document.createElement("img");
        let par = document.createElement("p");
        let ratingDiv = document.createElement("div");
        let ratingbar = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" data-value="${element.score}">	
                <circle r="45" cx="50" cy="50" />	
                <!-- 282.78302001953125 is auto-calculated by path.getTotalLength() -->	
                <path class="meter" d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="282.78302001953125" stroke-dasharray="282.78302001953125" />	
                <!-- Value automatically updates based on data-value set above -->	
                <text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-size="20"></text>	
              </svg>
        `;
        ratingDiv.innerHTML = ratingbar;

        img.src = element.images.webp.large_image_url;
        par.textContent = element.title_english
          ? element.title_english
          : element.title;

        ratingDiv.setAttribute("class", "anime-rating");
        div.setAttribute("class", "anime-result");
        img.setAttribute(
          "alt",
          element.title_english ? element.title_english : element.title
        );

        // img.onload = function() {
        //   cubeSpinner.style.display = "none";
        //   img.style.display = "block";
        // };

        div.appendChild(ratingDiv);
        div.appendChild(img);
        div.appendChild(par);

        div.addEventListener("click", () => getAnimeInfo(element.mal_id));

        document.getElementById("popular-anime-container").appendChild(div);

        // THE COMMENTED CODE BELOW DON'T WORK IT GIVE ME FUNCTION UNDEFINED ON CLICK
        //   const blueprint = `
        // <div class="anime-result" >
        //   <img src="${element.images.webp.large_image_url}" alt="" />
        //   <p>${element.title}</p>
        // </div>
        // `
        // document.getElementById('popular-anime-container').insertAdjacentHTML("beforeend", blueprint);
        // console.log(element.mal_id)
        // console.log(element.images.webp.image_url)
        // console.log(element.title)
      });
      document.getElementById("cube-spinner").style.display = "none";
      document.getElementById("popular-anime-container").style.display = "grid";
      displayRatingBar();
    })
    .catch((error) => {
      alert(error);
    });
}
