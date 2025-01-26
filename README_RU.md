# D&D Beyond i18n

> ⚠️ **ВНИМАНИЕ**: Это экспериментальный проект-концепт, находящийся на очень ранней стадии разработки. 
> Текущая версия представляет собой proof of concept для проверки гипотезы о возможности локализации D&D Beyond.
> Код нестабилен, возможны ошибки и неожиданное поведение.

Браузерное расширение для локализации контента на D&D Beyond

[English Version](./README.md)

## О проекте

Это расширение создано для личного использования группой игроков, которые хотят видеть контент D&D Beyond на русском языке. В отличие от существующих решений (например, [D&D Beyond Kit](https://github.com/hotaydev/dnd-beyond-kit)), мы решили создать собственное расширение, которое:

- Реализует только необходимый нам функционал
- Не требует доверия к стороннему коду
- Находится под полным контролем группы
- Не предполагается к публикации в Chrome Web Store

## Как это работает

Расширение внедряет скрипт на страницы D&D Beyond (конкретно на страницы с персонажами: `https://www.dndbeyond.com/characters/*`), который:

1. Перехватывает XHR-запросы для модификации данных
2. Переводит интерфейс листа персонажа
3. Переводит характеристики, навыки и другие игровые термины

Вот упрощённый пример того, как мы перехватываем и модифицируем ответы XHR:

```typescript
// Патчим XMLHttpRequest для перехвата ответов
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method: string, url: string) {
  // Перехватываем только запросы данных персонажа
  if (url.includes('/character/')) {
    const originalOnReadyStateChange = this.onreadystatechange;
    this.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(this.responseText);
        // Переводим данные персонажа
        data.character.stats = translateStats(data.character.stats);
        data.character.skills = translateSkills(data.character.skills);
        // Подменяем ответ
        Object.defineProperty(this, 'responseText', {
          value: JSON.stringify(data)
        });
      }
      originalOnReadyStateChange?.apply(this);
    };
  }
  originalXHROpen.apply(this, arguments);
};
```

## Технологии

Проект построен с использованием:
- [CRXJS Vite Plugin](https://github.com/crxjs/chrome-extension-tools) - современный инструмент для разработки браузерных расширений
- React + TypeScript

## Установка

1. Склонируйте репозиторий
2. Установите зависимости: `npm install`
3. Соберите проект: `npm run build`
4. Загрузите расширение в браузер:
   - Откройте Chrome/Brave/Edge/Arc/etc.
   - Перейдите в управление расширениями
   - Включите "Режим разработчика"
   - Нажмите "Загрузить распакованное расширение"
   - Выберите папку `dist` из проекта

## Безопасность

Расширение не собирает никаких данных и работает полностью локально. Весь код открыт и доступен для аудита.

## Ограничения

- Работает только со страницами персонажей
- Поддерживается только русский язык
- Не все элементы интерфейса могут быть переведены

## Разработка

```bash
npm install    # установка зависимостей
npm run dev    # запуск в режиме разработки
npm run build  # сборка для продакшена
```

## Участие в разработке

Поскольку это личный проект для закрытой группы игроков, мы не принимаем внешние pull request'ы. Форки приветствуются! 