const text = `const mega_sena = [12, 32, 56, 87, 3, 9];

for (let i in mega_sena) {
  console.log(i, mega_sena[i]);
}

const cidade = {
  nome: "Patos",
  estado: "Paraiba",
  populacao: 120000,
  uf: "PB"
};

for (let atr in cidade) {
  console.log(\`\${atr} - \${cidade[atr]}\`);
}`;

const regexNewLine = /\n/g;
const regexSpace = /\s/g;

const lines = text.split(regexNewLine);
const linesReplaceSpace = lines.map(line => {
  line += "↵";
  return line.replace(regexSpace, "␣");
});

const linesCharacters = linesReplaceSpace.map(line => line.split(""));
const spanCharacters = linesCharacters.map(line =>
  line
    .map(char => {
      if (char == "↵" || char == "␣") {
        return `<span class="spaceOrNewLine">${char}</span>`;
      } else {
        return `<span>${char}</span>`;
      }
    })
    .join("")
);

const divs = spanCharacters.map(line => `<div>${line}</div>`);

const elementCode = document.getElementById("lines");

divs.forEach(div => elementCode.insertAdjacentHTML("beforeend", div));

// ======================= Blink ============================ //

const elementsChar = document.querySelectorAll("#lines span");

let charActive = 0;
let totalCharacters = elementsChar.length;
let wrongCharactersPressed = 0;
let totalPressed = 0;

const elementTotal = document.getElementById("total");
const elementPressed = document.getElementById("pressed");
const elementPressedIncorrectly = document.getElementById("pressedIncorrectly");
const elementSpeed = document.getElementById("speed");

elementTotal.innerText = totalCharacters;
elementPressed.innerText = totalPressed;
elementPressedIncorrectly.innerText = wrongCharactersPressed;

document.addEventListener("keypress", event => {
  if (charActive < totalCharacters) {
    if (
      event.key === elementsChar[charActive].innerHTML ||
      (elementsChar[charActive].innerHTML == "␣" && event.keyCode == 32) ||
      (elementsChar[charActive].innerHTML == "↵" && event.keyCode == 13)
    ) {
      elementsChar[charActive++].classList.remove("blink");
      elementPressed.innerText = ++totalPressed;
    } else {
      elementPressed.innerText = ++totalPressed;
      elementPressedIncorrectly.innerText = ++wrongCharactersPressed;
      elementsChar[charActive].classList.add("wrong");
    }
  }
});

let counter = 0;

const timerBlink = setInterval(() => {
  try {
    elementsChar[charActive].classList.toggle("blink");
    counter += 500;
  } catch (e) {
    let speed = Math.floor(totalCharacters / (counter / 60000));
    elementSpeed.innerText = speed;
    clearInterval(timerBlink);
  }
}, 500);
