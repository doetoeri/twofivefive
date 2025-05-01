class PomodoroTimer {
  constructor() {
    this.timerSteps = [
      { label: "공부 시간", duration: 1500 },
      { label: "휴식 시간", duration: 300 },
      { label: "준비 시간", duration: 150 }
    ];
    this.currentStepIndex = 0;
    this.timeLeft = this.timerSteps[0].duration;
    this.timerId = null;
    this.isRunning = false;

    this.elements = {
      modeLabel: document.querySelector('.mode-label'),
      timeDisplay: document.querySelector('.time'),
      startPauseBtn: document.getElementById('startPauseBtn'),
      resetBtn: document.getElementById('resetBtn'),
      modeBtns: document.querySelectorAll('.mode-btn')
    };

    this.initEventListeners();
    this.updateDisplay();
  }

  initEventListeners() {
    this.elements.startPauseBtn.addEventListener('click', () => this.toggleTimer());
    this.elements.resetBtn.addEventListener('click', () => this.resetTimer());
    this.elements.modeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modeIndex = parseInt(e.target.dataset.mode);
        this.switchMode(modeIndex);
      });
    });
  }

  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.elements.startPauseBtn.innerHTML = '<span class="material-icons">pause</span>';
      this.timerId = setInterval(() => {
        this.timeLeft--;
        this.updateDisplay();
        if (this.timeLeft <= 0) {
          this.nextStep();
        }
      }, 1000);
    }
  }

  pauseTimer() {
    clearInterval(this.timerId);
    this.isRunning = false;
    this.elements.startPauseBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
  }

  resetTimer() {
    this.pauseTimer();
    this.timeLeft = this.timerSteps[this.currentStepIndex].duration;
    this.updateDisplay();
  }

  nextStep() {
    this.currentStepIndex = (this.currentStepIndex + 1) % this.timerSteps.length;
    this.timeLeft = this.timerSteps[this.currentStepIndex].duration;
    this.updateDisplay();
    this.highlightActiveMode();
    // 자동 연결(리다이렉트) 예시: 타이머가 끝날 때마다 특정 페이지로 이동
    // window.location.href = "https://example.com";
  }

  switchMode(modeIndex) {
    this.currentStepIndex = modeIndex;
    this.timeLeft = this.timerSteps[modeIndex].duration;
    this.resetTimer();
    this.highlightActiveMode();
  }

  highlightActiveMode() {
    this.elements.modeBtns.forEach((btn, index) => {
      btn.classList.toggle('active', index === this.currentStepIndex);
    });
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
    this.elements.timeDisplay.textContent = `${minutes}:${seconds}`;
    this.elements.modeLabel.textContent = this.timerSteps[this.currentStepIndex].label;
  }
}

new PomodoroTimer();

// 자동 리다이렉트 예시: 페이지가 열리자마자 다른 주소로 이동하려면 아래 주석 해제
// window.location.href = "https://example.com";
