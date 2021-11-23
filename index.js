window.addEventListener("load", function () {
  picture = document.getElementById("image");
  picture.addEventListener("click", getPicureCoordinates);
  picture.addEventListener("click", highlight);
  picture.addEventListener("click", dropdown);
  image1 = document.getElementsByClassName("checker")[0];
  image2 = document.getElementsByClassName("checker")[1];
  image3 = document.getElementsByClassName("checker")[2];
  image1.addEventListener("click", (e) => {
    if (x > 359 && x < 384 && y > 527 && y < 556) {
      console.log("Youve found image 1!");
    }
  });
  image2.addEventListener("click", (e) => {
    if (x > 980 && x < 1005 && y > 322 && y < 357) {
      console.log("Youve found image 2!");
    }
  });
  image3.addEventListener("click", (e) => {
    if (x > 870 && x < 900 && y > 513 && y < 543) {
      console.log("Youve found image 3!");
    }
  });
});

let x = 0;
let y = 0;

function getPicureCoordinates(e) {
  x = e.offsetX;
  y = e.offsetY;
  document.getElementById("demo").innerHTML = "Coordinates: " + x + " " + y;
}

function highlight(e) {
  highlighter = document.getElementsByClassName("highlight")[0];
  highlighter.style.display = "block";
  highlighter.style.top = e.pageY - 28 + "px";
  highlighter.style.left = e.pageX - 28 + "px";
  setTimeout(unhighlight, 500);
}

function unhighlight() {
  highlighter.style.display = "none";
}

function dropdown(e) {
  dropdown = document.getElementsByClassName("dropdown")[0];
  dropdown.style.display = "block";
  dropdown.style.top = e.pageY + 35 + "px";
  dropdown.style.left = e.pageX + "px";
}
