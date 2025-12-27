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

// -------------------------------
// ฟังก์ชันเริ่มเกมใหม่
// - สุ่มตัวเลข 1–100
// - รีเซ็ตจำนวนครั้งที่ทาย
// - อัปเดตการแสดงผล
// -------------------------------
function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptCount = 0;
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
    resultContainer.innerHTML = `
      <div class="alert alert-success" role="alert">
        <h5>✓ ถูกต้อง!</h5>
        <p>คุณทายถูกในครั้งที่ ${attemptCount}</p>
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
// ฟังก์ชันรีเซ็ตเกม
// - เริ่มเกมใหม่
// - ล้างผลลัพธ์เดิม
// - เคลียร์ช่องกรอก
// -------------------------------
function resetGame() {
  initializeGame();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}

// -------------------------------
// เริ่มเกมอัตโนมัติเมื่อโหลดหน้าเว็บ
// -------------------------------
window.addEventListener("load", initializeGame);
