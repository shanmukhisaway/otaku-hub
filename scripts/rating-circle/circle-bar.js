function displayRatingBar() {
  // Get all the Meters
  let meters = document.querySelectorAll("svg[data-value] .meter");

  meters.forEach((path) => {
    // Get the length of the path
    let length = path.getTotalLength();


    // console.log(length);

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

    if (!value) {
      path.nextElementSibling.textContent = `no rating`;
      return;
    }
    path.nextElementSibling.textContent = `${value}`;
  });
}

const posterImages = document.getElementById("poster-img");
// if the image is ok it will make the rating meter move
if (posterImages) {
  posterImages.addEventListener("onload", displayRatingBar());
}
