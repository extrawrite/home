// animatef logo after 2s of loading complete
window.onload = function () {
  setTimeout(function () {
    document.getElementById("logo").classList.add("logo-anim");
  }, 1200);
};

const heroText = document.getElementById('hero-text');
const lines = [
  "A New Era of Expression.",
  "The Future of Writing.",
  "Coming Soon. Stay Tuned."
];

let lineIndex = 0;
let charIndex = 0;
const typingSpeed = 50; // Speed of typing
const erasingSpeed = 25; // Speed of erasing
const newLineDelay = 2000; // Delay before typing next line

function typeLine() {
    if (charIndex < lines[lineIndex].length) {
        heroText.textContent += lines[lineIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeLine, typingSpeed);
    } else {
        setTimeout(eraseLine, newLineDelay);
    }
}

function eraseLine() {
    if (charIndex > 0) {
        heroText.textContent = lines[lineIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseLine, erasingSpeed);
    } else {
        lineIndex = (lineIndex + 1) % lines.length;
        setTimeout(typeLine, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(typeLine, newLineDelay);
});

// dancing balls

