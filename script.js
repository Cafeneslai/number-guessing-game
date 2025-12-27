// filepath: script.js
// ================================
// เกมทายตัวเลข (Number Guessing Game)
// ================================

// -------------------------------
// ตัวแปรสถานะของเกม
// -------------------------------

// ตัวเลขลับ (สุ่มใหม่ทุกครั้งที่เริ่มเกม)
let secretNumber = 0;

// ตัวแปรนับจำนวนครั้งที่ผู้เล่นทาย
let attemptCount = 0;

// ตัวแปรสำหรับตัวจับเวลา
let timeLeft = 60;
let timerInterval = null;
let gameActive = false;
const TOTAL_TIME = 60; // เวลาทั้งหมด (วินาที)
const CIRCUMFERENCE = 283; // 2 * π * 45 (รัศมีของวงกลม)

// -------------------------------
// ฟังก์ชันเริ่มเกมใหม่
// - สุ่มตัวเลข 1–100
// - รีเซ็ตจำนวนครั้งที่ทาย
// - เริ่มตัวจับเวลา
// - อัปเดตการแสดงผล
// -------------------------------
function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptCount = 0;
  gameActive = true;
  resetTimer();
  startTimer();
  updateDisplay();
}

// -------------------------------
// ฟังก์ชันตรวจสอบค่าที่ผู้เล่นทาย
// - ตรวจสอบความถูกต้องของข้อมูล (validation)
// - เพิ่มจำนวนครั้งที่ทาย
// - แสดงผลลัพธ์ว่าถูก / สูงไป / ต่ำไป
// -------------------------------
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guessValue = parseInt(guessInput.value);
  const resultContainer = document.getElementById("resultContainer");

  // ตรวจสอบว่าเกมยังเปิดอยู่หรือไม่
  if (!gameActive) {
    resultContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        หมดเวลา! กรุณากด "เริ่มใหม่" เพื่อเล่นอีกครั้ง
      </div>
    `;
    return;
  }

  // Validation: ตรวจสอบว่ามีการใส่ค่าและเป็นตัวเลขหรือไม่
  if (isNaN(guessValue) || guessInput.value === "") {
    resultContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        กรุณาใส่ตัวเลข!
      </div>
    `;
    return;
  }

  // Validation: ตรวจสอบว่าตัวเลขอยู่ในช่วง 1–100 หรือไม่
  if (guessValue < 1 || guessValue > 100) {
    resultContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100!
      </div>
    `;
    return;
  }

  // เพิ่มจำนวนครั้งที่ผู้เล่นทาย
  attemptCount++;

  // ตรวจสอบผลลัพธ์การทาย
  if (guessValue === secretNumber) {
    stopTimer();
    gameActive = false;
    resultContainer.innerHTML = `
      <div class="alert alert-success" role="alert">
        <h5>✓ ถูกต้อง!</h5>
        <p>คุณทายถูกในครั้งที่ ${attemptCount} (เหลือเวลา ${timeLeft} วินาที)</p>
      </div>
    `;
  } else if (guessValue > secretNumber) {
    resultContainer.innerHTML = `
      <div class="alert alert-warning" role="alert">
        ↓ ตัวเลขสูงไป
      </div>
    `;
  } else {
    resultContainer.innerHTML = `
      <div class="alert alert-info" role="alert">
        ↑ ตัวเลขต่ำไป
      </div>
    `;
  }

  // อัปเดตจำนวนครั้งที่ทายบนหน้าจอ
  updateDisplay();

  // เคลียร์ช่องกรอกและโฟกัสเพื่อทายครั้งถัดไป
  guessInput.value = "";
  guessInput.focus();
}

// -------------------------------
// ฟังก์ชันอัปเดตการแสดงจำนวนครั้งที่ทาย
// -------------------------------
function updateDisplay() {
  const attemptsContainer = document.getElementById("attemptsContainer");
  attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
}

// -------------------------------
// ฟังก์ชันเริ่มตัวจับเวลา
// -------------------------------
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      gameOver();
    }
  }, 1000);
}

// -------------------------------
// ฟังก์ชันหยุดตัวจับเวลา
// -------------------------------
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// -------------------------------
// ฟังก์ชันรีเซ็ตตัวจับเวลา
// -------------------------------
function resetTimer() {
  stopTimer();
  timeLeft = TOTAL_TIME;
  updateTimerDisplay();
}

// -------------------------------
// ฟังก์ชันอัปเดตการแสดงผลตัวจับเวลา
// -------------------------------
function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timerDisplay");
  const timerProgress = document.getElementById("timerProgress");

  // อัปเดตตัวเลข
  timerDisplay.textContent = timeLeft;

  // อัปเดต progress circle
  const offset = CIRCUMFERENCE - (timeLeft / TOTAL_TIME) * CIRCUMFERENCE;
  timerProgress.style.strokeDashoffset = offset;

  // เปลี่ยนสีตามเวลาที่เหลือ
  timerDisplay.classList.remove("warning", "danger");
  timerProgress.classList.remove("warning", "danger");

  if (timeLeft <= 10) {
    timerDisplay.classList.add("danger");
    timerProgress.classList.add("danger");
  } else if (timeLeft <= 20) {
    timerDisplay.classList.add("warning");
    timerProgress.classList.add("warning");
  }
}

// -------------------------------
// ฟังก์ชันจบเกมเมื่อหมดเวลา
// -------------------------------
function gameOver() {
  stopTimer();
  gameActive = false;
  timeLeft = 0;
  updateTimerDisplay();

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = `
    <div class="alert alert-danger" role="alert">
      <h5>⏰ หมดเวลา!</h5>
      <p>คำตอบที่ถูกต้องคือ <strong>${secretNumber}</strong></p>
      <p>คุณทายไป ${attemptCount} ครั้ง</p>
    </div>
  `;

  document.getElementById("guessInput").disabled = true;
}

// -------------------------------
// ฟังก์ชันรีเซ็ตเกม
// - เริ่มเกมใหม่
// - ล้างผลลัพธ์เดิม
// - เคลียร์ช่องกรอก
// -------------------------------
function resetGame() {
  stopTimer();
  document.getElementById("guessInput").disabled = false;
  initializeGame();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}

// -------------------------------
// เริ่มเกมอัตโนมัติเมื่อโหลดหน้าเว็บ
// -------------------------------
window.addEventListener("load", initializeGame);

// เพิ่มการรองรับ Enter key
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("guessInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        checkGuess();
      }
    });
});
