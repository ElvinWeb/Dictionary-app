//API url
let url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
const result = document.getElementById("result");
const soundSource = document.querySelector("#sound source");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

//sound play function
function playSound() {
  sound.play();
}

//search btn click function
btn.addEventListener("click", () => {
  let wordInput = document.getElementById("inp-word").value.trim();

  //Dictionary api fetching the data
  fetch(`${url}${wordInput}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = ` 
      <div class="word">
        <h3>${wordInput}</h3>
        <button onclick="playSound()">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
      <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>${data[0].phonetic}</p>
      </div>
      <p class="word-meaning">${
        data[0].meanings[0].definitions[0].definition
      }</p>
      <p class="word-example">${
        data[0].meanings[0].definitions[0].example || "not found :("
      }</p>
    `;
      soundSource.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    })
    //error message
    .catch(() => {
      result.innerHTML = `<h2 class="error">Couldn't Find The Word</h2>`;
    });
});
