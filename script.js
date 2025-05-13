const form = document.getElementById('input-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

let lossCount = 0;
let started = false;

function appendMessage(text, sender = 'bot') {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  const icon = document.createElement('i');
  icon.className = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
  div.appendChild(icon);
  const span = document.createElement('span');
  span.textContent = text;
  div.appendChild(span);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function botTyping(callback) {
  appendMessage('Typing...', 'bot');
  setTimeout(() => {
    chatBox.lastChild.remove();
    callback();
  }, 2000);
}

function processUserMessage(msg) {
  appendMessage(msg, 'user');

  if (!started && msg.toLowerCase() === 'start') {
    started = true;
    botTyping(() => appendMessage("Hello user, welcome to Trading VX."));
    setTimeout(() => botTyping(() => appendMessage("Trading VX is analyzing the game data, reading patterns, and giving you highly profitable bets.")), 2500);
    setTimeout(() => botTyping(() => appendMessage("Please enter the last 3-digit number of the period.")), 5000);
  } else if (/^\d{3}$/.test(msg)) {
    const period = msg;
    const result = Math.random() > 0.5 ? 'Big' : 'Small';
    const number = Math.floor(Math.random() * 10);
    const chance = `${Math.floor(60 + Math.random() * 25)}%`;
    botTyping(() => {
      appendMessage(`Analyzing game data...\nPeriod - ${period}\nUpcoming result - ${result}\nPredicted number - ${number}\nChance to win - ${chance}`);
      setTimeout(() => botTyping(() => appendMessage("Was it a Win or Loss?")), 2000);
    });
  } else if (msg.toLowerCase() === 'win') {
    lossCount = 0;
    botTyping(() => appendMessage("Please enter the last 3-digit number of the period."));
  } else if (msg.toLowerCase() === 'loss') {
    lossCount++;
    if (lossCount >= 3) {
      botTyping(() => appendMessage("We are sorry for your loss. Please try this hack after 20 minutes. I can’t analyze the trend at this time."));
    } else {
      botTyping(() => appendMessage("Please enter the last 3-digit number of the period."));
    }
  } else if (/^\d+$/.test(msg)) {
    appendMessage("Sorry, please enter only a 3-digit number.");
  } else {
    appendMessage("Please enter a valid 3-digit number.");
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg) {
    processUserMessage(msg);
    input.value = '';
  }
});

// Load particles.js
particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.json')
