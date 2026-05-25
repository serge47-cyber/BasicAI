# BasicAI — ШІ для всіх / AI for Everyone

> Практичний інтерактивний посібник для людей, які хочуть не просто прочитати про штучний інтелект, а одразу навчитися безпечно й корисно його застосовувати.

Основна версія сайту — українська (`index.html`). Доступні мовні дзеркала через перемикач у шапці: англійська (`en.html`), російська (`ru.html`), іспанська (`es.html`) і німецька (`de.html`). Дзеркала використовують той самий курс і логіку, а переклад виконується через Google Translate; сам перемикач мов позначений як `notranslate`, щоб кнопки `UA EN RU ES DE` не спотворювались.

---

## 🇺🇦 Українська

### Про проєкт

**BasicAI** — це безкоштовний інтерактивний веб-курс із 17 уроків, який охоплює все необхідне для впевненого і безпечного використання ШІ у повсякденному житті. Курс побудований на принципі «спочатку спроба — потім пояснення»: кожна сторінка змушує думати, а не просто читати.

### Ключові особливості

- **17 інтерактивних уроків** — від базових понять до практичних сценаріїв у роботі, навчанні, творчості, здоров'ї та фінансах
- **Два стилі навчання** замість вікового поділу:
  - 🔬 **Я дослідник** — для тих, хто любить розбиратися в деталях і одразу пробувати
  - 🌿 **Я практик** — для тих, хто хоче конкретних результатів без зайвої теорії
- **Блок "Спробуйте прямо зараз"** після кожного уроку — конкретне завдання на 5 хвилин
- **Готові шаблони запитів** з кнопкою копіювання в кожному уроці
- **Фінальний урок** — формування власних правил роботи з ШІ і персональна пам'ятка
- **Статичний HTML-файл** — не потребує сервера, бази даних або реєстрації
- **Мобільна навігація** — гамбургер-меню відкриває зміст курсу на малих екранах
- **PWA-підтримка** — можна встановити на мобільний пристрій

### Зміст курсу

| № | Тема |
|---|------|
| 01 | ШІ і Google — в чому різниця? |
| 02 | Що ШІ вміє і чого не вміє |
| 03 | Чи можна довіряти відповіді ШІ? |
| 04 | Як писати хороші запити |
| 05 | ШІ у повсякденних справах |
| 06 | Безпека і особисті дані |
| 07 | Різні ШІ-інструменти (ChatGPT, Claude, Gemini та інші) |
| 08 | ШІ для навчання |
| 09 | ШІ і фейки |
| 10 | Як вести діалог з ШІ |
| 11 | Мій перший AI-сценарій |
| 12 | ШІ і творчість |
| 13 | ШІ на роботі |
| 14 | ШІ і мова |
| 15 | ШІ і здоров'я |
| 16 | ШІ і гроші |
| 17 | Мої особисті правила роботи з ШІ |

### Як запустити

**Найпростіший спосіб** — відкрити файл у браузері:

```bash
open index.html
# або просто двічі клікніть на файл
```

**Для локального сервера** (потрібен для PWA):

```bash
python3 -m http.server 8080
# відкрийте http://localhost:8080
```

**Публікація на GitHub Pages:**

1. Завантажте `index.html`, мовні дзеркала (`en.html`, `ru.html`, `es.html`, `de.html`) та службові файли у репозиторій
2. Увімкніть GitHub Pages у Settings → Pages
3. Перевірте `https://<username>.github.io/<repo>/`

### Структура файлів

```
index.html             ← головний український файл курсу (17 уроків, ~360 KB)
en.html                ← англійське дзеркало
ru.html                ← російське дзеркало
es.html                ← іспанське дзеркало
de.html                ← німецьке дзеркало
manifest.webmanifest   ← PWA-маніфест
sw.js                  ← service worker для офлайн-режиму
icons/
  icon.svg             ← іконка додатку
  maskable.svg         ← іконка для Android
```

### Методика

Кожен урок побудований за циклом:

```
Гачок → Перша спроба → Пояснення → Сценарії → Шаблони → Практика → Спробуйте зараз
```

Перед поясненням — дія. Людина не пасивно читає, а включає власне мислення.

Три питання для кожного нового уроку:
- Що користувач зможе **зробити** після цього кроку?
- Чим відрізняється подача для **дослідника** і **практика**?
- Який **ризик або типову помилку** ми допомагаємо уникнути?

### Технічні деталі

- Чистий HTML/CSS/JS — без фреймворків і залежностей
- Весь контент генерується динамічно через JS при першому відкритті уроку
- Мовні дзеркала підключають переклад через параметр `?lang=...` без дублювання логіки уроків
- Прогрес позначається через `markDone()` — зберігається в пам'яті сесії
- Делегування подій через один `document.addEventListener('click')` — без inline `onclick`
- Підтримка мобільних пристроїв через медіа-запити та висувне меню

### Розвиток проєкту

Заплановані наступні кроки:
- Збереження прогресу в `localStorage`
- Експорт персональної пам'ятки у PDF
- Оновлений `sw.js` з кешуванням нового файлу

### Ліцензія та використання

Проєкт призначений для вільного використання в освітніх цілях. Якщо ви хочете вбудувати реальну інтеграцію з AI API — потрібен сервер або serverless-функція, щоб не відкривати API-ключ у браузері.

---

## 🇷🇺 Русский

### О проекте

**BasicAI** — бесплатный интерактивный веб-курс из 17 уроков о безопасном и практичном использовании искусственного интеллекта в повседневной жизни. Курс построен на принципе «сначала попытка — потом объяснение»: каждая страница заставляет думать, а не просто читать.

### Ключевые особенности

- **17 интерактивных уроков** — от базовых понятий до практических сценариев в работе, учёбе, творчестве, здоровье и финансах
- **Два стиля обучения** вместо возрастного деления:
  - 🔬 **Я исследователь** — для тех, кто любит разбираться в деталях и сразу пробовать
  - 🌿 **Я практик** — для тех, кто хочет конкретных результатов без лишней теории
- **Блок «Попробуйте прямо сейчас»** после каждого урока — конкретное задание на 5 минут
- **Готовые шаблоны запросов** с кнопкой копирования в каждом уроке
- **Финальный урок** — формирование собственных правил работы с ИИ и личная памятка
- **Статичный HTML-файл** — не требует сервера, базы данных или регистрации
- **Мобильная навигация** — гамбургер-меню открывает содержание курса на малых экранах
- **PWA-поддержка** — можно установить на мобильное устройство

### Содержание курса

| № | Тема |
|---|------|
| 01 | ИИ и Google — в чём разница? |
| 02 | Что ИИ умеет и чего не умеет |
| 03 | Можно ли доверять ответу ИИ? |
| 04 | Как писать хорошие запросы |
| 05 | ИИ в повседневных делах |
| 06 | Безопасность и личные данные |
| 07 | Разные ИИ-инструменты (ChatGPT, Claude, Gemini и другие) |
| 08 | ИИ для обучения |
| 09 | ИИ и фейки |
| 10 | Как вести диалог с ИИ |
| 11 | Мой первый AI-сценарий |
| 12 | ИИ и творчество |
| 13 | ИИ на работе |
| 14 | ИИ и язык |
| 15 | ИИ и здоровье |
| 16 | ИИ и деньги |
| 17 | Мои личные правила работы с ИИ |

### Как запустить

**Простейший способ** — открыть файл в браузере:

```bash
open index.html
# или просто дважды кликните на файл
```

**Для локального сервера** (нужен для PWA):

```bash
python3 -m http.server 8080
# откройте http://localhost:8080
```

**Публикация на GitHub Pages:**

1. Загрузите `index.html`, языковые зеркала (`en.html`, `ru.html`, `es.html`, `de.html`) и служебные файлы в репозиторий
2. Включите GitHub Pages в Settings → Pages
3. Проверьте `https://<username>.github.io/<repo>/`

### Структура файлов

```
index.html             ← главный украинский файл курса (17 уроков, ~360 KB)
en.html                ← английское зеркало
ru.html                ← русское зеркало
es.html                ← испанское зеркало
de.html                ← немецкое зеркало
manifest.webmanifest   ← PWA-манифест
sw.js                  ← service worker для офлайн-режима
icons/
  icon.svg             ← иконка приложения
  maskable.svg         ← иконка для Android
```

### Методика

Каждый урок построен по циклу:

```
Крючок → Первая попытка → Объяснение → Сценарии → Шаблоны → Практика → Попробуйте сейчас
```

Перед объяснением — действие. Человек не пассивно читает, а включает собственное мышление.

Три вопроса для каждого нового урока:
- Что пользователь сможет **сделать** после этого шага?
- Чем отличается подача для **исследователя** и **практика**?
- Какой **риск или типичную ошибку** мы помогаем избежать?

### Технические детали

- Чистый HTML/CSS/JS — без фреймворков и зависимостей
- Весь контент генерируется динамически через JS при первом открытии урока
- Языковые зеркала подключают перевод через параметр `?lang=...` без дублирования логики уроков
- Делегирование событий через один `document.addEventListener('click')` — без inline `onclick`
- Поддержка мобильных устройств через медиазапросы и выдвижное меню

### Развитие проекта

Запланированные следующие шаги:
- Сохранение прогресса в `localStorage`
- Экспорт личной памятки в PDF
- Обновлённый `sw.js` с кешированием нового файла

### Лицензия и использование

Проект предназначен для свободного использования в образовательных целях. Если вы хотите встроить реальную интеграцию с AI API — нужен сервер или serverless-функция, чтобы не открывать API-ключ в браузере.

---

## 🇬🇧 English

### About the Project

**BasicAI** is a free, interactive 17-lesson web course about using artificial intelligence safely and practically in everyday life. The course is built on the principle of "attempt first, explain after" — every page makes you think rather than just read.

### Key Features

- **17 interactive lessons** — from basic concepts to practical scenarios in work, study, creativity, health, and finance
- **Two learning styles** instead of age-based segmentation:
  - 🔬 **Explorer** — for those who love understanding how things work and trying immediately
  - 🌿 **Practitioner** — for those who want concrete results without extra theory
- **"Try It Now" block** after every lesson — a specific 5-minute task
- **Ready-to-use prompt templates** with a copy button in every lesson
- **Final lesson** — build your own personal AI rules and take them with you
- **Static HTML file** — no server, database, or registration required
- **Mobile navigation** — a hamburger menu opens the course contents on small screens
- **PWA support** — installable on mobile devices

### Course Contents

| # | Topic |
|---|-------|
| 01 | AI vs Google — what's the difference? |
| 02 | What AI can and cannot do |
| 03 | Can you trust AI responses? |
| 04 | How to write good prompts |
| 05 | AI in everyday life |
| 06 | Security and personal data |
| 07 | Different AI tools (ChatGPT, Claude, Gemini and others) |
| 08 | AI for learning |
| 09 | AI and misinformation |
| 10 | How to have a dialogue with AI |
| 11 | My first AI scenario |
| 12 | AI and creativity |
| 13 | AI at work |
| 14 | AI and language |
| 15 | AI and health |
| 16 | AI and money |
| 17 | My personal rules for working with AI |

### How to Run

**Simplest way** — open the file in a browser:

```bash
open index.html
# or just double-click the file
```

**Local server** (required for PWA features):

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

**Publishing to GitHub Pages:**

1. Push `index.html`, language mirrors (`en.html`, `ru.html`, `es.html`, `de.html`), and support files to your repository
2. Enable GitHub Pages in Settings → Pages
3. Check `https://<username>.github.io/<repo>/`

### File Structure

```
index.html             ← main Ukrainian course file (17 lessons, ~360 KB)
en.html                ← English mirror
ru.html                ← Russian mirror
es.html                ← Spanish mirror
de.html                ← German mirror
manifest.webmanifest   ← PWA manifest
sw.js                  ← service worker for offline support
icons/
  icon.svg             ← app icon
  maskable.svg         ← Android adaptive icon
```

### Pedagogical Approach

Each lesson follows this cycle:

```
Hook → First Attempt → Explanation → Scenarios → Templates → Practice → Try It Now
```

Action comes before explanation. The learner engages their own thinking before receiving new information.

Three questions for every new lesson:
- What will the user be able to **do** after this step?
- How does the delivery differ for the **Explorer** and **Practitioner**?
- What **risk or common mistake** are we helping them avoid?

### Technical Details

- Pure HTML/CSS/JS — no frameworks or external dependencies
- All lesson content is built dynamically via JS on first open
- Language mirrors use the `?lang=...` parameter and Google Translate without duplicating lesson logic
- Single delegated `document.addEventListener('click')` handler — no inline `onclick` attributes
- Mobile-responsive via CSS media queries and a slide-out menu
- All 17 lessons, templates, scenarios, and feedback texts are embedded in one file

### Roadmap

Planned next steps:
- Progress persistence via `localStorage`
- Export personal rules as PDF
- Updated `sw.js` caching strategy for the new file

### License and Usage

The project is intended for free use in educational contexts. If you want to embed real AI API integration, you'll need a server or serverless function to avoid exposing your API key in the browser.

---

*BasicAI — навчаємо думати разом з ШІ, а не замість нього.*  
*BasicAI — учим думать вместе с ИИ, а не вместо него.*  
*BasicAI — learning to think with AI, not instead of it.*
