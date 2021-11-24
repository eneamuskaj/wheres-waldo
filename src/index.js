import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH_3oN2YqdsJefZJ4WYnHpFgFhV3ibP7s",
  authDomain: "waldo-988be.firebaseapp.com",
  projectId: "waldo-988be",
  storageBucket: "waldo-988be.appspot.com",
  messagingSenderId: "437388930252",
  appId: "1:437388930252:web:a912444ef0dcf9d50ae669",
};

//initialize firebase app
initializeApp(firebaseConfig);
//init services
const db = getFirestore();
//collection ref
const colRef1 = collection(db, "mapdata");
const colRef2 = collection(db, "scoreboard");
//get collection data
getDocs(colRef1).then((snapshot) => {
  let imageData = [];
  snapshot.docs.forEach((doc) => {
    imageData.push({ ...doc.data(), id: doc.id });
  });
  var picture = document.getElementById("image");
  picture.addEventListener("click", getPicureCoordinates);
  picture.addEventListener("click", highlight);
  picture.addEventListener("click", dropdown);
  var image1 = document.getElementsByClassName("checker")[0];
  var image2 = document.getElementsByClassName("checker")[1];
  var image3 = document.getElementsByClassName("checker")[2];
  var popup = document.getElementsByClassName("popuptext")[0];
  var counter = document.getElementById("counter");
  var scoreForm = document.getElementById("inputName");

  function checkWinner() {
    if (
      image1.style.display === "none" &&
      image2.style.display === "none" &&
      image3.style.display === "none"
    ) {
      let message = "You Won!!!";
      showPopup(message);
      console.log(counter.innerHTML);
      showPopup("Your Score is: " + counter.innerHTML);
      myStopFunction();
      scoreForm.style.zIndex = 1;
      let submit = document.querySelector(".inputForm");
      submit.addEventListener("submit", (e) => {
        e.preventDefault();

        addScore(counter.innerHTML, submit.name.value);
      });
    }
  }
  function hideDropdown() {
    dropdown.style.display = "none";
  }
  function showPopup(message) {
    popup.style.display = "block";
    popup.innerHTML = message;
  }
  function hidePopup() {
    popup.style.display = "none";
  }

  image1.addEventListener("click", (e) => {
    if (
      x > imageData[0].xmin &&
      x < imageData[0].xmax &&
      y > imageData[0].ymin &&
      y < imageData[0].ymax
    ) {
      let message = "You've Found the First Image!";
      showPopup(message);
      setTimeout(hidePopup, 3000);
      image1.style.display = "none";
      setTimeout(hideDropdown, 2000);
      checkWinner();
    }
  });
  image2.addEventListener("click", (e) => {
    if (
      x > imageData[1].xmin &&
      x < imageData[1].xmax &&
      y > imageData[1].ymin &&
      y < imageData[1].ymax
    ) {
      let message = "You've Found the Second Image!";
      showPopup(message);
      setTimeout(hidePopup, 3000);
      image2.style.display = "none";
      setTimeout(hideDropdown, 2000);
      checkWinner();
    }
  });
  image3.addEventListener("click", (e) => {
    if (
      x > imageData[2].xmin &&
      x < imageData[2].xmax &&
      y > imageData[2].ymin &&
      y < imageData[2].ymax
    ) {
      let message = "You've Found the Third Image!";
      showPopup(message);
      setTimeout(hidePopup, 3000);
      image3.style.display = "none";
      setTimeout(hideDropdown, 2000);
      checkWinner();
    }
  });
});
let interval;
function myStopFunction() {
  clearInterval(interval);
}

function addScore(score, userName) {
  addDoc(colRef2, {
    name: userName,
    seconds: parseInt(score),
  });
}

window.addEventListener("load", function () {
  var start = document.getElementById("startButton");
  var startScreen = document.getElementById("startScreen");
  start.addEventListener("click", () => {
    startScreen.style.display = "none";
    var counter = document.getElementById("counter");

    function startTimer() {
      interval = setInterval(reload, 100);
    }

    function reload() {
      let newTime = parseFloat(counter.textContent) + 0.1;
      counter.textContent = newTime.toFixed(1);
    }

    startTimer();
  });
});

let x = 0;
let y = 0;

function getPicureCoordinates(e) {
  x = e.offsetX;
  y = e.offsetY;
}

function highlight(e) {
  var highlighter = document.getElementsByClassName("highlight")[0];
  highlighter.style.display = "block";
  highlighter.style.top = e.pageY - 28 + "px";
  highlighter.style.left = e.pageX - 28 + "px";
  setTimeout(unhighlight, 500);
  function unhighlight() {
    highlighter.style.display = "none";
  }
}

function dropdown(e) {
  dropdown = document.getElementsByClassName("dropdown")[0];
  dropdown.style.display = "block";
  dropdown.style.top = e.pageY + 35 + "px";
  dropdown.style.left = e.pageX + "px";
}
