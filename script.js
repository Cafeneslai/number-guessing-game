let ans = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
  let g = parseInt(document.getElementById("txt").value);
  let result = document.getElementById("result");

  if (g === ans) {
    result.textContent = "✓ ถูกต้อง!";
  } else if (g > ans) {
    result.textContent = "↓ ตัวเลขสูงไป";
  } else {
    result.textContent = "↑ ตัวเลขต่ำไป";
  }
}
