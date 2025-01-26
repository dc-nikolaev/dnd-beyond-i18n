# D&D Beyond i18n

> ⚠️ **WARNING**: This is an experimental concept project in a very early stage of development.
> The current version is a proof of concept to test the hypothesis of D&D Beyond localization possibility.
> The code is unstable, bugs and unexpected behavior are possible.

Browser extension for D&D Beyond content localization.

[Русская версия](./README_RU.md)

## About

This extension is created for personal use by a small group of tabletop gamers who want to see D&D Beyond content in Russian. Unlike existing solutions (e.g., [D&D Beyond Kit](https://github.com/hotaydev/dnd-beyond-kit)), we decided to create our own extension that:

- Implements only the functionality we need
- Doesn't require trust in third-party code
- Remains under full group control
- Is not intended for Chrome Web Store publication

## How It Works

The extension injects a script into D&D Beyond pages (specifically character pages: `https://www.dndbeyond.com/characters/*`) that:

1. Intercepts XHR requests to modify data
2. Translates character sheet interface
3. Translates characteristics, skills, and other game terms

Here's a simplified example of how we intercept and modify XHR responses:

```typescript
// Patch XMLHttpRequest to intercept responses
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method: string, url: string) {
  // Only intercept character data requests
  if (url.includes('/character/')) {
    const originalOnReadyStateChange = this.onreadystatechange;
    this.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(this.responseText);
        // Translate character data
        data.character.stats = translateStats(data.character.stats);
        data.character.skills = translateSkills(data.character.skills);
        // Override response
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

## Technology Stack

Built with:
- [CRXJS Vite Plugin](https://github.com/crxjs/chrome-extension-tools) - modern Chrome Extension development tool
- React + TypeScript

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Load the extension in your browser:
   - Open Chrome/Brave/Edge/Arc/etc.
   - Go to extension management
   - Enable "Developer mode"
   - Click "Load unpacked extension"
   - Select the `dist` folder from the project

## Security

The extension doesn't collect any data and works entirely locally. All code is open source and available for audit.

## Limitations

- Works only with character pages
- Supports only Russian language
- Not all interface elements can be translated

## Development

```bash
npm install    # install dependencies
npm run dev    # start development mode
npm run build  # build for production
```

## Contributing

As this is a personal project for a closed group of players, we don't accept external pull requests. Forks are welcome!
