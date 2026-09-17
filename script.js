const dice = document.querySelector('#dice');
const rollButton = document.querySelector('#rollButton');
const resultValue = document.querySelector('#resultValue');
const statusText = document.querySelector('#statusText');
const rollNumber = document.querySelector('#rollNumber');
const historyList = document.querySelector('#historyList');
const historyCount = document.querySelector('#historyCount');
const clearButton = document.querySelector('#clearButton');
const emptyState = document.querySelector('#emptyState');
const pips = [...document.querySelectorAll('.pip')];

const pipPatterns = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9]
};

let rollCount = 0;
let rolling = false;

function showFace(value) {
  pips.forEach((pip, index) => {
    pip.classList.toggle('active', pipPatterns[value].includes(index + 1));
  });
  dice.setAttribute('aria-label', `骰子點數 ${value}`);
  resultValue.textContent = value;
}

function addHistory(value) {
  emptyState.hidden = true;
  const item = document.createElement('li');
  item.className = 'history-item';
  item.innerHTML = `<span class="history-meta">ROLL #${String(rollCount).padStart(2, '0')}</span><strong class="history-value">${value}</strong>`;
  historyList.prepend(item);
  historyCount.textContent = rollCount;
  clearButton.disabled = false;
}

function rollDice() {
  if (rolling) return;

  rolling = true;
  rollButton.disabled = true;
  statusText.textContent = '骰子滾動中...';
  dice.classList.remove('is-rolling');
  void dice.offsetWidth;
  dice.classList.add('is-rolling');

  const value = Math.floor(Math.random() * 6) + 1;
  window.setTimeout(() => {
    rollCount += 1;
    showFace(value);
    addHistory(value);
    statusText.textContent = value >= 4 ? '運氣不錯！' : '下一次會更好';
    rollNumber.textContent = `#${String(rollCount).padStart(2, '0')}`;
    rolling = false;
    rollButton.disabled = false;
  }, 650);
}

function clearHistory() {
  historyList.querySelectorAll('.history-item').forEach((item) => item.remove());
  rollCount = 0;
  historyCount.textContent = '0';
  rollNumber.textContent = '#01';
  statusText.textContent = '準備好了';
  clearButton.disabled = true;
  emptyState.hidden = false;
}

rollButton.addEventListener('click', rollDice);
clearButton.addEventListener('click', clearHistory);
showFace(1);
