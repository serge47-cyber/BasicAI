const lessons = [
  {
    id: "start",
    level: 1,
    icon: "1",
    title: "Що таке штучний інтелект",
    summary:
      "Пояснюємо ШІ як помічника, який знаходить закономірності, пише тексти, аналізує зображення та допомагає з ідеями.",
    task: "Складіть одне просте питання до ШІ про побутову справу.",
    quiz: {
      question: "Що найкраще описує сучасний ШІ?",
      options: [
        "Інструмент, який допомагає створювати й аналізувати інформацію",
        "Людина всередині комп'ютера",
        "Програма, якій можна без перевірки довіряти все"
      ],
      answer: 0
    }
  },
  {
    id: "prompt",
    level: 2,
    icon: "2",
    title: "Як ставити добрі запитання",
    summary:
      "Вчимося писати запити: роль, завдання, контекст, формат відповіді та обмеження.",
    task: "Попросіть ШІ пояснити складну тему простими словами для дитини.",
    quiz: {
      question: "Який запит зазвичай корисніший?",
      options: [
        "Напиши щось про здоров'я",
        "Поясни, як підготуватися до візиту лікаря: коротко, списком, без діагнозів",
        "Зроби правильно"
      ],
      answer: 1
    }
  },
  {
    id: "safety",
    level: 3,
    icon: "3",
    title: "Безпека та перевірка фактів",
    summary:
      "Розбираємо, коли треба перевіряти відповідь, чому не варто вводити приватні дані та як помічати помилки.",
    task: "Знайдіть у відповіді ШІ факт, який потрібно перевірити в надійному джерелі.",
    quiz: {
      question: "Що робити з важливою медичною або фінансовою порадою від ШІ?",
      options: [
        "Одразу виконати",
        "Попросити ще красивішу відповідь",
        "Перевірити в фахівця або офіційному джерелі"
      ],
      answer: 2
    }
  },
  {
    id: "models",
    level: 4,
    icon: "4",
    title: "Які бувають універсальні моделі",
    summary:
      "Оглядаємо популярні сімейства: GPT, Claude, Gemini, Llama, Mistral, Copilot та інші інструменти.",
    task: "Оберіть модель для написання листа, пошуку ідей або пояснення зображення.",
    quiz: {
      question: "Чому корисно знати кілька AI-сервісів?",
      options: [
        "Різні моделі мають різні сильні сторони та доступність",
        "Одна назва завжди означає найкращу відповідь",
        "Щоб ніколи не перевіряти результат"
      ],
      answer: 0
    }
  }
];

const modelFamilies = [
  {
    name: "OpenAI GPT",
    note: "Сильні універсальні моделі для тексту, коду, аналізу, зображень і голосових сценаріїв.",
    use: "Добре підходить для пояснень, чернеток, навчання, планування та роботи з документами."
  },
  {
    name: "Anthropic Claude",
    note: "Універсальні моделі з акцентом на уважну роботу з довгими текстами та безпечні відповіді.",
    use: "Зручно для читання великих матеріалів, редагування, порівняння та спокійних пояснень."
  },
  {
    name: "Google Gemini",
    note: "Моделі для тексту, зображень, відео, коду та інтеграції з екосистемою Google.",
    use: "Корисно для мультимодальних завдань, пошуку ідей, навчання та роботи з візуальним контентом."
  },
  {
    name: "Meta Llama",
    note: "Відкрите сімейство моделей, яке часто використовують розробники та освітні проєкти.",
    use: "Підходить для локальних експериментів, досліджень і рішень, де важливий контроль над системою."
  },
  {
    name: "Mistral AI",
    note: "Європейські універсальні та спеціалізовані моделі для тексту, коду й агентних завдань.",
    use: "Цікавий вибір для бізнес-процесів, багатомовних задач і розробницьких сценаріїв."
  },
  {
    name: "Microsoft Copilot",
    note: "AI-помічник у продуктах Microsoft, який поєднує моделі з роботою в офісних інструментах.",
    use: "Допомагає з листами, презентаціями, таблицями, нотатками та робочими підсумками."
  }
];

const scenarios = [
  {
    title: "Лист до установи",
    text: "Учень просить ШІ скласти ввічливий лист до школи або сервісного центру, а потім разом із дорослим перевіряє факти, імена та дати."
  },
  {
    title: "Пояснення для онука",
    text: "Бабуся питає: 'Поясни, що таке хмарне сховище, як для 10-річної дитини, з прикладом про фото'."
  },
  {
    title: "План без перевантаження",
    text: "Користувач просить ШІ скласти м'який план вивчення смартфона на 7 днів, по 15 хвилин щодня."
  },
  {
    title: "Творча історія",
    text: "Дитина вигадує героя, а ШІ допомагає створити коротку казку, де герой вчиться перевіряти інформацію."
  }
];

const storageKey = "basicai-progress";
let currentLesson = getProgress();
let scenarioIndex = 0;

const lessonList = document.querySelector("#lesson-list");
const modelGrid = document.querySelector("#model-grid");
const quizTitle = document.querySelector("#quiz-title");
const quizBody = document.querySelector("#quiz-body");
const quizFeedback = document.querySelector("#quiz-feedback");
const progressText = document.querySelector("#progress-text");
const continueLink = document.querySelector("#continue-link");
const scenarioTitle = document.querySelector("#scenario-title");
const scenarioText = document.querySelector("#scenario-text");

function getProgress() {
  const stored = Number(localStorage.getItem(storageKey));
  return Number.isInteger(stored) && stored > 0 ? stored : 1;
}

function saveProgress(level) {
  currentLesson = Math.max(currentLesson, level);
  localStorage.setItem(storageKey, String(currentLesson));
  renderProgress();
  renderLessons();
}

function renderLessons() {
  lessonList.innerHTML = "";

  lessons.forEach((lesson) => {
    const isUnlocked = lesson.level <= currentLesson;
    const isDone = lesson.level < currentLesson;
    const card = document.createElement("article");
    card.className = `lesson-card${isUnlocked ? "" : " locked"}`;
    card.id = `lesson-${lesson.id}`;

    card.innerHTML = `
      <div class="lesson-illustration" aria-hidden="true">${lesson.icon}</div>
      <span class="status-pill">${isDone ? "Пройдено" : isUnlocked ? "Доступно" : "Відкриється пізніше"}</span>
      <h3>${lesson.title}</h3>
      <p>${lesson.summary}</p>
      <p><strong>Міні-дія:</strong> ${lesson.task}</p>
      <button class="button ${isUnlocked ? "primary" : "secondary"}" type="button" ${isUnlocked ? "" : "disabled"}>
        ${isDone ? "Повторити" : "Відкрити рівень"}
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      renderQuiz(lesson);
      document.querySelector("#quiz-card").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    lessonList.append(card);
  });
}

function renderModels() {
  modelGrid.innerHTML = "";

  modelFamilies.forEach((model) => {
    const card = document.createElement("article");
    card.className = "model-card";
    card.innerHTML = `
      <h3>${model.name}</h3>
      <p>${model.note}</p>
      <p><strong>Де пробувати:</strong> ${model.use}</p>
    `;
    modelGrid.append(card);
  });
}

function renderQuiz(lesson = lessons[Math.max(0, currentLesson - 1)]) {
  quizFeedback.textContent = "";
  quizTitle.textContent = `Рівень ${lesson.level}: ${lesson.title}`;
  quizBody.innerHTML = `
    <p>${lesson.quiz.question}</p>
    <div class="quiz-options"></div>
  `;

  const options = quizBody.querySelector(".quiz-options");
  lesson.quiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(button, index, lesson));
    options.append(button);
  });
}

function checkAnswer(button, selected, lesson) {
  const buttons = quizBody.querySelectorAll("button");
  buttons.forEach((item) => {
    item.disabled = true;
  });

  if (selected === lesson.quiz.answer) {
    button.classList.add("correct");
    quizFeedback.textContent = "Правильно. Рівень зараховано, можна рухатися далі.";
    saveProgress(lesson.level + 1);
  } else {
    button.classList.add("wrong");
    buttons[lesson.quiz.answer].classList.add("correct");
    quizFeedback.textContent = "Майже. Подивіться правильну відповідь і спробуйте рівень ще раз.";
  }
}

function renderProgress() {
  const completed = Math.max(0, currentLesson - 1);
  const cappedCompleted = Math.min(completed, lessons.length);
  const nextLesson = lessons[Math.min(currentLesson - 1, lessons.length - 1)];
  progressText.textContent = `Пройдено рівнів: ${cappedCompleted} з ${lessons.length}. Наступний крок: ${nextLesson.title}.`;
  continueLink.href = `#lesson-${nextLesson.id}`;
}

function renderScenario() {
  const scenario = scenarios[scenarioIndex];
  scenarioTitle.textContent = scenario.title;
  scenarioText.textContent = scenario.text;
}

document.querySelector("#next-scenario").addEventListener("click", () => {
  scenarioIndex = (scenarioIndex + 1) % scenarios.length;
  renderScenario();
});

document.querySelector("#reset-progress").addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  currentLesson = 1;
  renderProgress();
  renderLessons();
  renderQuiz(lessons[0]);
});

renderLessons();
renderModels();
renderQuiz();
renderProgress();
renderScenario();
