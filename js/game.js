let scoreA = 0, scoreB = 0, questionIndex = 0;
let gameQuestions = [], locked = false, currentWinner = null, answered = false;
let answerCountdown = null, timeoutAdvance = null, secondsLeft = 10;
const ANSWER_SECONDS = 10;
const AUTO_NEXT_DELAY = 2200;
const $ = (id) => document.getElementById(id);

function clearAnswerTimers() {
  if (answerCountdown !== null) {
    clearInterval(answerCountdown);
    answerCountdown = null;
  }
  if (timeoutAdvance !== null) {
    clearTimeout(timeoutAdvance);
    timeoutAdvance = null;
  }
}
function teamName(team) {
  const name = team === "A" ? $("teamAName").value.trim() : $("teamBName").value.trim();
  return name || `Kelompok ${team}`;
}
function updateScores() {
  $("scoreA").textContent = scoreA;
  $("scoreB").textContent = scoreB;
  $("buzzAName").textContent = teamName("A").toUpperCase();
  $("buzzBName").textContent = teamName("B").toUpperCase();
}
function updateProgress() {
  $("progressBar").style.width = `${(questionIndex / gameQuestions.length) * 100}%`;
  $("roundLabel").textContent = `Soal ${Math.min(questionIndex + 1, gameQuestions.length)} dari ${gameQuestions.length}`;
}
function startGame() {
  clearAnswerTimers();
  scoreA = 0; scoreB = 0; questionIndex = 0; locked = false; currentWinner = null; answered = false;
  gameQuestions = [...questions].sort(() => Math.random() - 0.5);
  updateScores();
  $("welcome").classList.add("hidden");
  $("resultArea").classList.add("hidden");
  $("buzzArea").classList.remove("hidden");
  showQuestion();
}
function showQuestion() {
  clearAnswerTimers();
  if (questionIndex >= gameQuestions.length) return showResults();
  locked = false; currentWinner = null; answered = false;
  $("questionNumber").textContent = `SOAL ${questionIndex + 1}`;
  $("questionText").textContent = gameQuestions[questionIndex].question;
  $("statusLabel").textContent = "Tekan tombol rebutan untuk mendapat kesempatan menjawab";
  $("buzzFeedback").textContent = "";
  $("buzzFeedback").className = "feedback";
  $("answerFeedback").textContent = "";
  $("answerFeedback").className = "feedback";
  $("answerArea").classList.add("hidden");
  $("answerTimer").classList.add("hidden");
  $("answerTimer").textContent = ANSWER_SECONDS;
  $("nextBtn").classList.add("hidden");
  $("buzzA").disabled = false;
  $("buzzB").disabled = false;
  $("buzzAName").textContent = teamName("A").toUpperCase();
  $("buzzBName").textContent = teamName("B").toUpperCase();
  updateProgress();
}
function buzz(team) {
  if (locked || answered) return;
  locked = true;
  currentWinner = team;
  $("buzzA").disabled = true;
  $("buzzB").disabled = true;
  $("statusLabel").textContent = `${teamName(team)} mendapat 10 detik untuk menjawab`;
  $("buzzFeedback").textContent = `🔔 ${teamName(team)} paling cepat menekan tombol!`;
  $("buzzFeedback").className = "feedback good";
  $("answerTurn").textContent = `${teamName(team)}, pilih jawaban sebelum waktu habis:`;
  $("answerArea").classList.remove("hidden");
  $("answerTimer").classList.remove("hidden");
  secondsLeft = ANSWER_SECONDS;
  updateTimerDisplay();
  renderAnswers();
  answerCountdown = setInterval(() => {
    secondsLeft -= 1;
    updateTimerDisplay();
    if (secondsLeft <= 0) expireQuestion();
  }, 1000);
}
function updateTimerDisplay() {
  const timer = $("answerTimer");
  timer.textContent = `${secondsLeft} detik`;
  timer.classList.toggle("timer-urgent", secondsLeft <= 3);
}
function renderAnswers() {
  const q = gameQuestions[questionIndex];
  const container = $("answers");
  container.innerHTML = "";
  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + i);
    btn.append(letter, document.createTextNode(answer));
    btn.addEventListener("click", () => chooseAnswer(i, btn));
    container.appendChild(btn);
  });
}
function chooseAnswer(index, selectedButton) {
  if (answered || !locked) return;
  clearAnswerTimers();
  answered = true;
  const q = gameQuestions[questionIndex];
  const buttons = [...$("answers").querySelectorAll("button")];
  buttons.forEach((b) => b.disabled = true);
  $("answerTimer").classList.add("hidden");
  if (index === q.correct) {
    if (currentWinner === "A") scoreA += 10; else scoreB += 10;
    selectedButton.classList.add("correct");
    $("answerFeedback").textContent = `Benar! ${teamName(currentWinner)} mendapat +10 poin. ${q.explanation}`;
    $("answerFeedback").classList.add("good");
  } else {
    selectedButton.classList.add("wrong");
    buttons[q.correct].classList.add("correct");
    $("answerFeedback").textContent = `Jawaban belum tepat. Tidak ada poin untuk soal ini. ${q.explanation}`;
    $("answerFeedback").classList.add("bad");
  }
  updateScores();
  $("statusLabel").textContent = "Jawaban terkunci";
  $("nextBtn").textContent = questionIndex === gameQuestions.length - 1 ? "Lihat Hasil 🏆" : "Soal berikutnya →";
  $("nextBtn").classList.remove("hidden");
}
function expireQuestion() {
  if (answered) return;
  clearAnswerTimers();
  answered = true;
  const buttons = [...$("answers").querySelectorAll("button")];
  buttons.forEach((b) => b.disabled = true);
  $("answerTimer").textContent = "WAKTU HABIS!";
  $("answerTimer").classList.add("timer-urgent");
  $("answerFeedback").textContent = "⏰ Waktu 10 detik habis! Soal hangus, tidak ada poin. Bersiap untuk soal berikutnya...";
  $("answerFeedback").className = "feedback bad";
  $("statusLabel").textContent = "Waktu habis — soal hangus";
  $("buzzFeedback").textContent = "";
  timeoutAdvance = setTimeout(() => {
    questionIndex += 1;
    showQuestion();
  }, AUTO_NEXT_DELAY);
}
function nextQuestion() {
  if (!answered) return;
  clearAnswerTimers();
  questionIndex++;
  showQuestion();
}
function showResults() {
  clearAnswerTimers();
  $("buzzArea").classList.add("hidden");
  $("resultArea").classList.remove("hidden");
  $("progressBar").style.width = "100%";
  $("roundLabel").textContent = "Selesai";
  $("statusLabel").textContent = "Hasil akhir";
  if (scoreA === scoreB) $("winnerText").textContent = "🤝 Pertandingan Seri!";
  else $("winnerText").textContent = `🏆 ${scoreA > scoreB ? teamName("A") : teamName("B")} Menang!`;
  $("resultSummary").textContent = `${teamName("A")}: ${scoreA} poin — ${teamName("B")}: ${scoreB} poin. Terima kasih sudah bermain!`;
}
$("startBtn").addEventListener("click", startGame);
$("buzzA").addEventListener("click", () => buzz("A"));
$("buzzB").addEventListener("click", () => buzz("B"));
$("nextBtn").addEventListener("click", nextQuestion);
$("restartBtn").addEventListener("click", startGame);
$("fullscreenBtn").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch {
    alert("Layar penuh tidak didukung browser ini. Coba tekan F11 pada keyboard.");
  }
});
$("teamAName").addEventListener("input", updateScores);
$("teamBName").addEventListener("input", updateScores);
updateScores();
