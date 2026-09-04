/**
 * USELESS ENGINEERING QUICK REVISION PORTAL (Useless Edition)
 * Core Application Logic, Web Speech API Voice Reactions, Web Audio API Sound Generation,
 * 2-Field Form Tracking, and Dynamic Certificate.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. EXACT 4 IMMUTABLE QUESTIONS & OPTIONS (Do Not Alter)
     ========================================================================== */
  const REVISION_QUESTIONS = [
    {
      id: 1,
      domain: "⚡ DOMAIN: PROFESSOR CHALK DYNAMICS",
      category: "🔬 THERMODYNAMIC CLASSROOM FRACTURE",
      question: "If a professor drops a chalk on the floor and it breaks into two pieces, calculate the room temperature.",
      options: [
        "27°C",
        "Depends on the chalk's emotional state 💔",
        "You will fail the exam anyway 📉",
        "Not in the syllabus 🤷‍♂️"
      ]
    },
    {
      id: 2,
      domain: "⚡ DOMAIN: CANTEEN FLUID MECHANICS",
      category: "🥟 HIGH-VELOCITY OIL VISCOSITY",
      question: "Calculate the volume of a canteen samosa when the first bell rings at 1:30 PM.",
      options: [
        "3.14 cm³ 📐",
        "Inversely proportional to tea quality ☕",
        "Whatever seniors left behind 🍽️",
        "Zero 🚫"
      ]
    },
    {
      id: 3,
      domain: "⚡ DOMAIN: PSYCHIC CIRCUIT ANALYSIS",
      category: "🔥 RESISTOR SENTIENCE PROTOCOL",
      question: "When smoke comes out during a lab circuit connection, what is the primary emotion of the resistor?",
      options: [
        "Anger 😡",
        "Sadness 😢",
        "Extreme Joy 🎉",
        "Thermal Overload 🔥"
      ]
    },
    {
      id: 4,
      domain: "⚡ DOMAIN: RELATIVISTIC HOMEWORK COPYING",
      category: "✍️ FRICTIONAL ASSIGNMENT KINETICS",
      question: "Find the friction pressure exerted when a student copies an assignment 5 minutes before submission.",
      options: [
        "100 N/m² 📏",
        "Varies based on friend's handwriting ✍️",
        "Equal to hostel power outage speed ⚡",
        "Cannot be determined ❓"
      ]
    }
  ];

  /* ==========================================================================
     2. WEB SPEECH API (Enthusiastic Voice Reaction Engine)
     ========================================================================== */
  class VoiceReactionEngine {
    constructor() {
      this.supported = ('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window);
      this.reactions = [
        "Wonderful!",
        "Excellent!",
        "Beautiful!",
        "Fantastic!",
        "Brilliant!",
        "Outstanding unlearning!",
        "Mind-blowing logic!"
      ];
      this.lastIndex = -1;
      this.availableVoices = [];

      if (this.supported) {
        // Pre-fetch browser speech voices
        const loadVoices = () => {
          try {
            this.availableVoices = window.speechSynthesis.getVoices() || [];
          } catch (e) {
            this.availableVoices = [];
          }
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      }
    }

    speakRandomReaction(isMuted) {
      if (!this.supported || isMuted) return null;

      try {
        // Cancel any pending/ongoing speech immediately for snappy response
        window.speechSynthesis.cancel();

        // Pick next reaction sequentially/randomly without consecutive repetition
        let nextIdx;
        do {
          nextIdx = Math.floor(Math.random() * this.reactions.length);
        } while (nextIdx === this.lastIndex && this.reactions.length > 1);
        this.lastIndex = nextIdx;

        const text = this.reactions[nextIdx];
        const utterance = new SpeechSynthesisUtterance(text);

        // Select an energetic English voice if available
        if (this.availableVoices.length === 0) {
          this.availableVoices = window.speechSynthesis.getVoices() || [];
        }
        const engVoice = this.availableVoices.find(v => 
          v.lang.startsWith('en') && (
            v.name.includes('Natural') || 
            v.name.includes('Google') || 
            v.name.includes('Samantha') || 
            v.name.includes('David') || 
            v.name.includes('English') || 
            v.default
          )
        );
        if (engVoice) {
          utterance.voice = engVoice;
        }

        utterance.pitch = 1.25; // Cheerful, enthusiastic pitch
        utterance.rate = 1.08;  // Energetic pacing
        utterance.volume = 1.0;

        window.speechSynthesis.speak(utterance);
        return text;
      } catch (err) {
        console.warn('Speech synthesis playback error:', err);
        return null;
      }
    }

    stop() {
      if (this.supported) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
    }
  }

  const voiceEngine = new VoiceReactionEngine();

  /* ==========================================================================
     3. WEB AUDIO API SYNTHESIZER (Plain JS Procedural Sound Engine)
     ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return !this.isMuted;
    }

    // 1. Hilarious Goofy Bloop / Click on Option Selection
    playGoofyBloop() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Bouncy pitch bend
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(860, this.ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.11);

      gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    }

    // 2. Silly "Dududu / Ka-La-Ka-La" Effect on Next Question / Submit
    playDududuEffect() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      // Fast comedic staccato notes: du-du-du / ka-la-ka-la
      const notes = [320, 420, 520, 640, 480, 600];
      const noteDuration = 0.045;

      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + (i * noteDuration);

        osc.type = (i % 2 === 0) ? 'triangle' : 'square';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + noteDuration + 0.01);
      });
    }

    // 3. Victory / Confetti Fanfare on Final Result Screen
    playVictoryFanfare() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      // Silly, triumphant minor chord sequence
      const fanfareChords = [
        { f: 523.25, d: 0.14 }, // C5
        { f: 493.88, d: 0.14 }, // B4
        { f: 466.16, d: 0.14 }, // Bb4
        { f: 415.30, d: 0.55 }  // Ab4
      ];

      fanfareChords.forEach((c, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + (idx * 0.15);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(c.f, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + c.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + c.d + 0.05);
      });
    }
  }

  const sfx = new SoundEngine();

  /* ==========================================================================
     4. HTML5 CANVAS CELEBRATION CONFETTI ENGINE
     ========================================================================== */
  class CanvasConfetti {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animId = null;
      this.colors = ['#ff007f', '#00f0ff', '#ffee00', '#00ff88', '#a855f7', '#ff8c00'];

      this.resize = this.resize.bind(this);
      window.addEventListener('resize', this.resize);
      this.resize();
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    explode() {
      if (!this.canvas || !this.ctx) return;
      this.particles = [];
      const count = 150;

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: this.canvas.width * (0.2 + Math.random() * 0.6),
          y: this.canvas.height * 0.45,
          vx: (Math.random() - 0.5) * 22,
          vy: (Math.random() - 0.75) * 24,
          size: Math.random() * 9 + 5,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 12,
          opacity: 1,
          decay: Math.random() * 0.008 + 0.005
        });
      }

      if (this.animId) cancelAnimationFrame(this.animId);
      this.render();
    }

    render() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let alive = 0;
      for (let p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.42; // gravity
        p.vx *= 0.97; // air friction
        p.rotation += p.vRot;
        p.opacity -= p.decay;

        if (p.opacity > 0) {
          alive++;
          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.globalAlpha = Math.max(0, p.opacity);
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          this.ctx.restore();
        }
      }

      if (alive > 0) {
        this.animId = requestAnimationFrame(() => this.render());
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  const confetti = new CanvasConfetti('confetti-canvas');

  /* ==========================================================================
     5. APPLICATION STATE & DOM REFERENCES
     ========================================================================== */
  const state = {
    student: {
      name: 'Future Distinction Holder 🎓',
      department: 'CS - Code Strugglers'
    },
    currentQuestionIndex: 0,
    selectedOption: null,
    totalQuestions: REVISION_QUESTIONS.length,
    examFinished: false
  };

  const dom = {
    // Views
    welcomeView: document.getElementById('welcome-view'),
    quizView: document.getElementById('quiz-view'),
    resultView: document.getElementById('result-view'),

    // 2-Field Registration Form
    regForm: document.getElementById('registration-form'),
    studentNameInput: document.getElementById('student-name'),
    deptSelect: document.getElementById('dept-select'),
    nameError: document.getElementById('name-error'),
    deptError: document.getElementById('dept-error'),

    // Quiz Elements
    quizDomain: document.getElementById('quiz-domain'),
    currentQNum: document.getElementById('current-q-num'),
    totalQNum: document.getElementById('total-q-num'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    questionCategory: document.getElementById('question-category'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    skipBtn: document.getElementById('skip-btn'),
    nextBtn: document.getElementById('next-btn'),
    nextBtnText: document.getElementById('next-btn-text'),

    // Result & Certificate Elements
    summaryStudentName: document.getElementById('summary-student-name'),
    summaryDept: document.getElementById('summary-dept'),

    certStudentName: document.getElementById('cert-student-name'),
    certDept: document.getElementById('cert-dept'),
    certDateDisplay: document.getElementById('cert-date-display'),
    certHashDisplay: document.getElementById('cert-hash-display'),

    printCertificateBtn: document.getElementById('print-certificate-btn'),
    copySummaryBtn: document.getElementById('copy-summary-btn'),
    copyBtnLabel: document.getElementById('copy-btn-label'),
    restartQuizBtn: document.getElementById('restart-quiz-btn'),

    // Header & Audio
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    soundIcon: document.getElementById('sound-icon'),
    soundLabel: document.getElementById('sound-label'),

    // Toast
    toastPill: document.getElementById('toast-pill'),
    toastIcon: document.getElementById('toast-icon'),
    toastText: document.getElementById('toast-text')
  };

  /* ==========================================================================
     6. TOAST & NAVIGATION UTILITIES
     ========================================================================== */
  let toastTimer = null;

  function showToast(text, icon = 'ℹ️', duration = 2800) {
    if (!dom.toastPill) return;
    dom.toastText.textContent = text;
    dom.toastIcon.textContent = icon;
    dom.toastPill.classList.remove('hidden');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toastPill.classList.add('hidden');
    }, duration);
  }

  function switchView(targetView) {
    [dom.welcomeView, dom.quizView, dom.resultView].forEach(v => {
      if (v === targetView) {
        v.classList.remove('hidden');
        v.classList.add('active');
      } else {
        v.classList.add('hidden');
        v.classList.remove('active');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     7. FORM VALIDATION & REGISTRATION (ONLY 2 FIELDS)
     ========================================================================== */
  function validateRegistration() {
    let isValid = true;

    // Reset errors
    [dom.studentNameInput, dom.deptSelect].forEach(input => {
      input.classList.remove('input-error');
    });
    [dom.nameError, dom.deptError].forEach(err => {
      err.classList.remove('visible');
    });

    // Validate Student Name
    if (!dom.studentNameInput.value.trim()) {
      dom.studentNameInput.classList.add('input-error');
      dom.nameError.classList.add('visible');
      isValid = false;
    }

    // Validate Department Dropdown
    if (!dom.deptSelect.value) {
      dom.deptSelect.classList.add('input-error');
      dom.deptError.classList.add('visible');
      isValid = false;
    }

    return isValid;
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();

    if (!validateRegistration()) {
      sfx.playGoofyBloop();
      showToast('Please enter your name and department to accept 100% confidence!', '⚠️');
      return;
    }

    // Save Student Credentials (2 Fields)
    state.student.name = dom.studentNameInput.value.trim();
    state.student.department = dom.deptSelect.value;

    // Play silly transition dududu sound
    sfx.playDududuEffect();

    showToast(`Welcome, ${state.student.name}! 100% Confidence activated.`, '🚀');

    // Switch to Quiz view
    state.currentQuestionIndex = 0;
    dom.totalQNum.textContent = state.totalQuestions;
    switchView(dom.quizView);
    renderQuestion();
  }

  /* ==========================================================================
     8. QUIZ LOGIC & OPTION RENDERING (WITH WEB SPEECH API)
     ========================================================================== */
  const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

  function renderQuestion() {
    const q = REVISION_QUESTIONS[state.currentQuestionIndex];
    state.selectedOption = null;

    // Update Question Stats & Progress
    dom.currentQNum.textContent = state.currentQuestionIndex + 1;
    dom.quizDomain.textContent = q.domain;
    dom.questionCategory.textContent = q.category;
    dom.questionText.textContent = q.question;

    const progressPercent = ((state.currentQuestionIndex + 1) / state.totalQuestions) * 100;
    dom.progressBarFill.style.width = `${progressPercent}%`;

    // Render Option Cards
    dom.optionsContainer.innerHTML = '';
    q.options.forEach((optText, idx) => {
      const letter = OPTION_LETTERS[idx] || '•';
      const card = document.createElement('label');
      card.className = 'option-box';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'radio');
      card.setAttribute('aria-checked', 'false');

      card.innerHTML = `
        <input type="radio" name="revision-choice" value="${idx}">
        <span class="option-badge">${letter}</span>
        <span class="option-text-content">${optText}</span>
        <span class="option-radio-dot" aria-hidden="true"></span>
      `;

      const selectOption = () => {
        // 1. Play goofy bloop sound
        sfx.playGoofyBloop();

        // 2. Play funny enthusiastic voice reaction using Web Speech API
        const voiceText = voiceEngine.speakRandomReaction(sfx.isMuted);

        // 3. Highlight selected card
        document.querySelectorAll('.option-box').forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-checked', 'false');
        });
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
        card.querySelector('input').checked = true;
        state.selectedOption = idx;
        dom.nextBtn.disabled = false;

        // Display brief reaction toast if voice spoke
        if (voiceText && !sfx.isMuted) {
          showToast(`Voice Reaction: "${voiceText}"`, '🗣️', 1200);
        }
      };

      card.addEventListener('click', selectOption);
      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          selectOption();
        }
      });

      dom.optionsContainer.appendChild(card);
    });

    // Reset Next CTA Button
    dom.nextBtn.disabled = true;
    if (state.currentQuestionIndex === state.totalQuestions - 1) {
      dom.nextBtnText.textContent = 'Finish & Get Useless Certificate 🎓';
    } else {
      dom.nextBtnText.textContent = 'Lock In & Doubt Yourself 🤯';
    }
  }

  function advanceToNext() {
    // Stop ongoing speech on navigation
    voiceEngine.stop();

    // Play the silly "dududu / ka-la-ka-la" sound effect on moving to next question or submitting!
    sfx.playDududuEffect();

    if (state.currentQuestionIndex < state.totalQuestions - 1) {
      state.currentQuestionIndex++;
      renderQuestion();
    } else {
      showFinalResults();
    }
  }

  function skipQuestion() {
    voiceEngine.stop();
    sfx.playDududuEffect();
    showToast('Question skipped! 0 braincells protected.', '🏃‍♂️');

    if (state.currentQuestionIndex < state.totalQuestions - 1) {
      state.currentQuestionIndex++;
      renderQuestion();
    } else {
      showFinalResults();
    }
  }

  /* ==========================================================================
     9. FINAL RESULT & USELESS CERTIFICATE
     ========================================================================== */
  function showFinalResults() {
    voiceEngine.stop();
    state.examFinished = true;
    switchView(dom.resultView);

    // Victory fanfare & confetti explosion!
    setTimeout(() => {
      sfx.playVictoryFanfare();
      confetti.explode();
    }, 250);

    // Populate Candidate Summary
    dom.summaryStudentName.textContent = state.student.name;
    dom.summaryDept.textContent = state.student.department;

    // Dynamically Populate Certificate Credentials (Full Name & Department)
    dom.certStudentName.textContent = state.student.name;
    dom.certDept.textContent = state.student.department;

    // Format Current Date
    const today = new Date();
    dom.certDateDisplay.textContent = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Generate Certificate Hash
    const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase();
    dom.certHashDisplay.textContent = `USELESS-0x${randomHex}-404`;

    showToast('Certified -10/100 unlearning confirmed despite 100% confidence!', '🏆');
  }

  function printUselessCertificate() {
    sfx.playGoofyBloop();
    window.print();
  }

  function copyUnlearningSummary() {
    sfx.playGoofyBloop();
    const report = `⚡ [USELESS ENGINEERING QUICK REVISION PORTAL - RESULT REPORT] ⚡
Candidate: ${state.student.name}
Department: ${state.student.department}
Final Score: -10 / 100 (ROOM TEMPERATURE INTELLECT)
Official Grade: F- (Fatalistic Delusion)
Status: 100% CONFIDENCE YET 100% UNLEARNED 📉
Verified by: Prof. A. P. NullPointer & Dr. Samosa Sharma
Take the test at: Useless Engineering Quick Revision Portal 🤡`;

    navigator.clipboard.writeText(report)
      .then(() => {
        dom.copyBtnLabel.textContent = 'Report Copied! 📋';
        showToast('Diagnostic report copied to clipboard! Share the unlearning with your batchmates.', '📋');
        setTimeout(() => {
          dom.copyBtnLabel.textContent = 'Copy Unlearning Report 📋';
        }, 3000);
      })
      .catch(() => {
        showToast('Unable to copy automatically. Please copy manually.', '❌');
      });
  }

  function restartRevision() {
    voiceEngine.stop();
    sfx.playGoofyBloop();
    state.currentQuestionIndex = 0;
    state.selectedOption = null;
    state.examFinished = false;
    dom.regForm.reset();
    switchView(dom.welcomeView);
    showToast('Portal reset! Ready for next high-confidence victim.', '🔄');
  }

  /* ==========================================================================
     10. AUDIO TOGGLE & EVENT LISTENERS
     ========================================================================== */
  function toggleAudio() {
    const isActive = sfx.toggleMute();
    if (!isActive) {
      voiceEngine.stop();
    } else {
      sfx.playGoofyBloop();
    }

    if (isActive) {
      dom.soundIcon.textContent = '🔊';
      dom.soundLabel.textContent = 'Voice & Audio: ON';
      showToast('Voice reactions & sounds active! 🔊', '🗣️');
    } else {
      dom.soundIcon.textContent = '🔇';
      dom.soundLabel.textContent = 'Voice & Audio: OFF';
      showToast('Voice reactions & sounds muted. 🔇', '🤫');
    }
  }

  function initApp() {
    // Form submission
    dom.regForm.addEventListener('submit', handleRegistrationSubmit);

    // Quiz Navigation
    dom.nextBtn.addEventListener('click', advanceToNext);
    dom.skipBtn.addEventListener('click', skipQuestion);

    // Result & Certificate actions
    dom.printCertificateBtn.addEventListener('click', printUselessCertificate);
    dom.copySummaryBtn.addEventListener('click', copyUnlearningSummary);
    dom.restartQuizBtn.addEventListener('click', restartRevision);

    // Sound toggle
    dom.soundToggleBtn.addEventListener('click', toggleAudio);

    // Unlock Web Audio on first interaction
    const unlockAudio = () => {
      sfx.init();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
  }

  // Self-start on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();