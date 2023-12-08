var audio = new Audio('sound/audio.mp3');
var isSoundOn = false;

function toggleSound() {
  var musicButton = document.getElementById('musicbtn');
  var musicState = document.querySelector('.musicstate');
  
  if (isSoundOn) {
    isSoundOn = false;
    pauseSound();
    musicButton.classList.remove('active');
    musicState.textContent = 'OFF';
  } else {
    isSoundOn = true;
    playSound();
    musicButton.classList.add('active');
    musicState.textContent = 'ON';
  }
}

function playSound() {
  audio.loop = true; // Set the audio to loop
  audio.play();
}

function pauseSound() {
  audio.pause();
}
