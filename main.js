'use-strict';

const $startScreen = document.querySelector('#start-screen');
const $startScreenInput = document.querySelector('#start-screen input');
const $startScreenButton = document.querySelector('#start-screen button');
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

let pairNumber; // 카드 페어 수
let totalCardAmount;
let colorCopy = []; // 실제 게임에 사용 될 카드 색상 배열 (색상 * 2)
let shuffled = []; // 무작위로 색상을 섞은 배열
let clicked = []; // 클릭한(선택한) 카드 배열
let completed = []; // 완료한(성공한) 카드 배열
let clickable = false; // 카드 클릭 발생 상황 제어
let startTime;
let endTime;
let gameTime;

// 사용할 색상 배열 추출
function setColorArr(pairNumber) {
  const useColors = allColors.slice(0, pairNumber);
  colorCopy = useColors.concat(useColors);
}

// 색상 순서 섞기
function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
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

// 게임 카드 엘리먼트 리셋
function cardReset() {
  $wrapper.innerHTML = '';
}

// 시작 버튼 비활성화
function buttonDisabled(value) {
  $startScreenButton.disabled = value;
}

// 카드 클릭
function onClickCard() {
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  this.classList.toggle('flipped');
  clicked.push(this);

  // 클릭된 카드 개수가 2가 아닐 경우
  if (clicked.length !== 2) {
    return;
  }

  // 클릭된 카드 개수가 2인 경우
  // 클릭된 카드 색상 비교
  const firstCardColor =
    clicked[0].querySelector('.card-front').style.backgroundColor;
  const secondCardColor =
    clicked[1].querySelector('.card-front').style.backgroundColor;

  // 두 카드 색상이 같으면
  if (firstCardColor === secondCardColor) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    if (completed.length !== totalCardAmount) {
      return;
    }

    // 타임 스탬프 종료
    endTime = new Date();
    gameTime = (endTime - startTime) / 1000;
    setTimeout(() => {
      alert(`성공!!, 소요시간: ${gameTime}초`);
    }, 1000);
    return;
  }

  // 두 카드 색상이 다르면
  clickable = false;
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
    clickable = true;
  }, 500);
}

// 게임 시작
function startGame() {
  setColorArr(pairNumber);
  shuffle();
  for (i = 0; i < totalCardAmount; i++) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
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
    buttonDisabled(false);
    clickable = true;

    // 타임 스탬프 시작
    startTime = new Date();
  }, 5000);
}

// --------------------------

$startScreen.addEventListener('submit', (event) => {
  buttonDisabled(true);
  cardReset();
  clickable = false;
  event.preventDefault();
  pairNumber = event.target['start-screen-input'].value;
  totalCardAmount = pairNumber * 2;
  startGame();
});
