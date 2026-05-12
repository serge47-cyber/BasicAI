# BasicAI

Інтерактивний статичний посібник з основ штучного інтелекту для дітей, людей старшого віку та початківців.

## Що є у версії 2

- 8 послідовних рівнів: бази AI, промпти, prompt chaining, безпека, вибір моделей, помилки AI, автоматизація, fine-tuning basics.
- Hands-on завдання і приклади промптів у кожному рівні.
- Рандомізовані міні-тести: питання та варіанти відповідей перемішуються.
- Prompt-lab: симулятор створення корисного промпта без передачі даних у зовнішній API.
- Порівняння універсальних AI-сімейств із посиланнями на офіційні сторінки.
- Розділ "Помилки ШІ" з життєвими кейсами.
- Прогрес, бали й бейджі через `localStorage`.
- PWA-заготовка: `manifest.webmanifest` і `sw.js` для офлайн-кешування.
- Контент винесено в `data/content.json`.

## Як запустити локально

Через `fetch()` браузер має отримувати `data/content.json`, тому краще запускати через локальний сервер:

```bash
python3 -m http.server 8080
```

Після цього відкрийте `http://localhost:8080`.

## Як додавати уроки

Додайте новий об'єкт у `data/content.json` в масив `lessons`:

```json
{
  "id": "new-topic",
  "level": 9,
  "icon": "9",
  "title": "Назва рівня",
  "goal": "Навчальна ціль",
  "summary": "Коротке пояснення",
  "prompt": "Приклад промпта",
  "task": "Практичне завдання",
  "quiz": [
    {
      "question": "Питання",
      "options": ["Варіант 1", "Варіант 2", "Варіант 3"],
      "answer": 0
    }
  ]
}
```

## Про реальну AI-інтеграцію

У браузерній статичній версії не можна безпечно зберігати API-ключ. Для реального ChatGPT/OpenAI demo потрібен невеликий сервер або serverless-функція, яка:

- приймає промпт від сайту;
- додає обмеження безпеки;
- викликає AI API;
- повертає відповідь без розкриття ключа користувачу.

Це наступний технічний крок після публікації базового GitHub Pages сайту.

## Офіційні джерела для оновлення моделей

- OpenAI models: https://platform.openai.com/docs/models
- Anthropic Claude models: https://docs.anthropic.com/en/docs/about-claude/models/overview
- Google Gemini models: https://ai.google.dev/gemini-api/docs/models
- Meta Llama: https://www.llama.com/
- Mistral AI models: https://docs.mistral.ai/models/overview
- Microsoft Copilot: https://www.microsoft.com/en-us/microsoft-copilot
