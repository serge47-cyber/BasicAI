const storageKey = "basicai-progress-v2";
const promptKey = "basicai-prompt-count";

const state = {
  content: null,
  currentLesson: getStoredNumber(storageKey, 1),
  promptCount: getStoredNumber(promptKey, 0),
  activeLesson: null,
  activeQuiz: null,
  scenarioIndex: 0
};

const lessonList = document.querySelector("#lesson-list");
const modelGrid = document.querySelector("#model-grid");
const mistakeList = document.querySelector("#mistake-list");
const quizTitle = document.querySelector("#quiz-title");
const quizBody = document.querySelector("#quiz-body");
const quizFeedback = document.querySelector("#quiz-feedback");
const progressText = document.querySelector("#progress-text");
const badgeList = document.querySelector("#badge-list");
const continueLink = document.querySelector("#continue-link");
const scenarioTitle = document.querySelector("#scenario-title");
const scenarioText = document.querySelector("#scenario-text");
const promptOutput = document.querySelector("#prompt-output");

init();

async function init() {
  try {
    const response = await fetch("data/content.json");
    state.content = await response.json();
  } catch (error) {
    showLoadError(error);
    return;
  }

  state.currentLesson = clamp(state.currentLesson, 1, state.content.lessons.length + 1);
  state.activeLesson = state.content.lessons[Math.max(0, state.currentLesson - 1)];

  renderLessons();
  renderModels();
  renderMistakes();
  renderQuiz(state.activeLesson);
  renderProgress();
  renderScenario();
  renderPrompt();
  bindEvents();
  registerServiceWorker();
}

function getStoredNumber(key, fallback) {
  const value = Number(localStorage.getItem(key));
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function showLoadError(error) {
  lessonList.innerHTML = `
    <article class="lesson-card">
      <h3>Не вдалося завантажити контент</h3>
      <p>Запустіть сайт через локальний сервер або GitHub Pages, щоб браузер міг прочитати data/content.json.</p>
      <p class="small-note">${error.message}</p>
    </article>
  `;
}

function bindEvents() {
  document.querySelector("#next-scenario").addEventListener("click", () => {
    state.scenarioIndex = (state.scenarioIndex + 1) % state.content.scenarios.length;
    renderScenario();
  });

  document.querySelector("#reset-progress").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(promptKey);
    state.currentLesson = 1;
    state.promptCount = 0;
    state.activeLesson = state.content.lessons[0];
    renderLessons();
    renderQuiz(state.activeLesson);
    renderProgress();
    renderPrompt();
  });

  document.querySelector("#prompt-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.promptCount += 1;
    localStorage.setItem(promptKey, String(state.promptCount));
    renderPrompt();
    renderProgress();
  });

  document.querySelector("#improve-prompt").addEventListener("click", () => {
    const goal = document.querySelector("#goal-input");
    goal.value = `${goal.value}; додай приклад, попередження про ризики і короткий тест`;
    state.promptCount += 1;
    localStorage.setItem(promptKey, String(state.promptCount));
    renderPrompt();
    renderProgress();
  });

  document.querySelector("#copy-prompt").addEventListener("click", copyPrompt);
}

function renderLessons() {
  lessonList.innerHTML = "";

  state.content.lessons.forEach((lesson) => {
    const isUnlocked = lesson.level <= state.currentLesson;
    const isDone = lesson.level < state.currentLesson;
    const card = document.createElement("article");
    card.className = `lesson-card${isUnlocked ? "" : " locked"}`;
    card.id = `lesson-${lesson.id}`;

    card.innerHTML = `
      <div class="lesson-illustration" aria-hidden="true">${lesson.icon}</div>
      <span class="status-pill">${isDone ? "Пройдено" : isUnlocked ? "Доступно" : "Відкриється пізніше"}</span>
      <h3>${lesson.title}</h3>
      <p><strong>Ціль:</strong> ${lesson.goal}</p>
      <p>${lesson.summary}</p>
      <div class="prompt-sample"><strong>Приклад запиту:</strong> ${lesson.prompt}</div>
      <p><strong>Практика:</strong> ${lesson.task}</p>
      ${isUnlocked ? "" : '<p class="small-note">Щоб відкрити цей рівень, пройдіть тест попереднього рівня.</p>'}
      <button class="button ${isUnlocked ? "primary" : "secondary"}" type="button" ${isUnlocked ? "" : "disabled"}>
        ${isDone ? "Повторити рівень" : "Відкрити рівень"}
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      state.activeLesson = lesson;
      renderQuiz(lesson);
      document.querySelector("#quiz-card").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    lessonList.append(card);
  });
}

function renderModels() {
  modelGrid.innerHTML = "";

  state.content.models.forEach((model) => {
    const card = document.createElement("article");
    card.className = "model-card";
    card.innerHTML = `
      <h3>${model.name}</h3>
      <p><strong>Сильні сторони:</strong> ${model.strengths}</p>
      <p><strong>Де доречно:</strong> ${model.bestFor}</p>
      <p><strong>Уважно:</strong> ${model.cautions}</p>
      <div class="prompt-sample"><strong>Приклад запиту:</strong> ${model.prompt}</div>
      <a class="text-link" href="${model.link}" target="_blank" rel="noreferrer">Офіційна сторінка</a>
    `;
    modelGrid.append(card);
  });
}

function renderMistakes() {
  mistakeList.innerHTML = "";

  state.content.mistakes.forEach((item) => {
    const card = document.createElement("article");
    card.className = "mistake-card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Кейс:</strong> ${item.case}</p>
      <p><strong>Що вчимо:</strong> ${item.lesson}</p>
    `;
    mistakeList.append(card);
  });
}

function renderQuiz(lesson) {
  const quiz = pickRandom(lesson.quiz);
  const options = shuffleOptions(quiz.options, quiz.answer);
  state.activeQuiz = { lesson, quiz, options };
  quizFeedback.textContent = "";
  quizTitle.textContent = `Рівень ${lesson.level}: ${lesson.title}`;
  quizBody.innerHTML = `
    <p>${quiz.question}</p>
    <div class="quiz-options"></div>
  `;

  const optionBox = quizBody.querySelector(".quiz-options");
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.text;
    button.addEventListener("click", () => checkAnswer(button, option.isCorrect));
    optionBox.append(button);
  });
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffleOptions(options, answerIndex) {
  return options
    .map((text, index) => ({ text, isCorrect: index === answerIndex }))
    .sort(() => Math.random() - 0.5);
}

function checkAnswer(button, isCorrect) {
  const buttons = quizBody.querySelectorAll("button");
  buttons.forEach((item) => {
    item.disabled = true;
    const option = state.activeQuiz.options.find((entry) => entry.text === item.textContent);
    if (option?.isCorrect) {
      item.classList.add("correct");
    }
  });

  if (isCorrect) {
    button.classList.add("correct");
    quizFeedback.textContent = "Правильно. Рівень зараховано, +10 балів.";
    saveProgress(state.activeQuiz.lesson.level + 1);
  } else {
    button.classList.add("wrong");
    quizFeedback.textContent = "Майже. Подивіться правильну відповідь і повторіть рівень.";
  }
}

function saveProgress(level) {
  state.currentLesson = clamp(Math.max(state.currentLesson, level), 1, state.content.lessons.length + 1);
  localStorage.setItem(storageKey, String(state.currentLesson));
  renderLessons();
  renderProgress();
}

function renderProgress() {
  const completed = Math.min(Math.max(0, state.currentLesson - 1), state.content.lessons.length);
  const score = completed * 10 + Math.min(state.promptCount, 10) * 2;
  const isFinished = completed >= state.content.lessons.length;
  const nextLesson = state.content.lessons[Math.min(state.currentLesson - 1, state.content.lessons.length - 1)];
  const nextText = isFinished
    ? "Маршрут завершено. Можна повторювати рівні або додавати нові."
    : `Наступний крок: ${nextLesson.title}.`;
  progressText.textContent = `Пройдено рівнів: ${completed} з ${state.content.lessons.length}. Балів: ${score}. Майстер запитів використано: ${state.promptCount}. ${nextText}`;
  continueLink.href = `#lesson-${nextLesson.id}`;
  renderBadges(completed);
}

function renderBadges(completed) {
  const earned = state.content.badges.filter((badge) => completed >= badge.minCompleted);
  badgeList.innerHTML = "";

  if (earned.length === 0) {
    badgeList.innerHTML = '<span class="badge muted-badge">Бейджі відкриються після першого рівня</span>';
    return;
  }

  earned.forEach((badge) => {
    const item = document.createElement("span");
    item.className = "badge";
    item.textContent = badge.title;
    badgeList.append(item);
  });
}

function renderScenario() {
  const scenario = state.content.scenarios[state.scenarioIndex];
  scenarioTitle.textContent = scenario.title;
  scenarioText.textContent = scenario.text;
}

function renderPrompt() {
  const audience = document.querySelector("#audience-select").value;
  const goal = document.querySelector("#goal-input").value.trim();
  const format = document.querySelector("#format-select").value;
  const lessonHint = state.activeLesson?.title || "основи штучного інтелекту";

  promptOutput.textContent = `Ти терплячий AI-наставник. Допоможи ${audience} ${goal}. Пояснюй без поспіху, на прикладі з життя. Тема уроку: "${lessonHint}". Дай відповідь ${format}. Наприкінці додай: 1) що треба перевірити, 2) які приватні дані не вводити, 3) одне питання для самоперевірки.`;
}

async function copyPrompt() {
  const text = promptOutput.textContent.trim();
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    quizFeedback.textContent = "Запит скопійовано. Можна вставити його в AI-сервіс і перевірити відповідь.";
  } catch {
    quizFeedback.textContent = "Скопіюйте запит вручну з блоку майстра запитів.";
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.register("sw.js").catch(() => {
    // Offline mode is optional; the site still works as a normal static page.
  });
}
