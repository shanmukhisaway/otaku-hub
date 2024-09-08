async function getTopAnime() {
  await fetch("https://api.jikan.moe/v4/top/anime?limit=10")
    .then((response) => {
      // console.log(response.json)
      return response.json();
    })
    .then((anime) => {
      // console.log(anime)
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
        par.textContent = element.title;

        ratingDiv.setAttribute("class", "anime-rating");
        div.setAttribute("class", "anime-result");
        img.setAttribute("id", "poster-img");
        img.setAttribute("alt", element.title);

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
      // displayRatingBar()
    });
}
window.onload = () => {
  // const animeCover = document.querySelectorAll("#anime-cover")
  getTopAnime();
  // if(animeCover){
  //   console.log('loaded')
  //   animeCover.complete = ()=> {
  //     document.querySelectorAll("#cube-spinner").style.display = 'none'
  //   }
  // }else{
  //   console.log('no')
  // }
};
