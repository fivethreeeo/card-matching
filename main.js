'use-strict';

const $startScreen = document.querySelector('#start-screen');
const $startScreenInput = document.querySelector('#start-screen input');
const $wrapper = document.querySelector('#wrapper');

const allColors = [
  'burlywood',
  'cadetblue',
  'coral',
  'deeppink',
  'gold',
  'magenta',
  'black',
  'grey',
  'yellow',
  'red',
];

// const userSelectNumber = 0;
// const totalCardAmount = userSelectNumber * 2;
// const useColors = allColors.slice(0, userSelectNumber);
// let colorCopy = useColors.concat(useColors);

// 사용할 색상 배열 추출
function setColorArr(pairNumber) {
  const useColors = allColors.slice(0, pairNumber);
  colorCopy = useColors.concat(useColors);
  console.log(colorCopy);
}

// 색상 순서 섞기
function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
  console.log(shuffled);
}

// 카드 만들기
function createCard(i) {
  const card = document.createElement('div');
  const cardInner = document.createElement('div');
  const cardFront = document.createElement('div');
  const cardBack = document.createElement('div');
  card.className = 'card';
  cardInner.className = 'card-inner';
  cardFront.className = 'card-front';
  cardBack.className = 'card-back';
  cardFront.style.backgroundColor = shuffled[i];
  card.appendChild(cardInner);
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  return card;
}

// 게임 시작
function startGame() {
  setColorArr(pairNumber);
  shuffle();
  let totalCardAmount = pairNumber * 2;
  for (i = 0; i < totalCardAmount; i++) {
    const card = createCard(i);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
  }, 5000);
}

// --------------------------

let pairNumber = 0; // 카드 페어 수
let colorCopy = []; // 사용 색상 * 2
let shuffled = []; // 색상 섞기

$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  pairNumber = event.target['start-screen-input'].value;
  startGame();
});
