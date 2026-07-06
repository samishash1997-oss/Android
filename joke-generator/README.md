# Random Joke Generator

A simple, interactive joke generator that fetches random jokes from an external API and displays them with a clean, modern UI.

## Features

- 🎲 Fetch random jokes from JokeAPI
- 😂 Display jokes with setup/delivery or single-line format
- 🔄 One-click joke refresh
- ⏱️ Loading state with spinner
- 🎨 Modern, responsive UI design
- 📱 Mobile & tablet friendly
- ♿ Accessible components with ARIA labels
- 🌙 Dark mode support

## API Used

[JokeAPI](https://v2.jokeapi.dev/) - Free joke API with multiple categories and formats

## Project Structure

```
joke-generator/
├── src/
│   ├── components/
│   │   ├── JokeCard.tsx          # Main joke display card
│   │   └── JokeButton.tsx        # Fetch button component
│   ├── services/
│   │   └── jokeService.ts        # API integration
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── styles/
│   │   └── joke.css              # Component styles
│   ├── App.tsx                   # Main app component
│   └── index.tsx                 # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

## Build

```bash
npm run build
```

## Usage

Simply click the "Get Random Joke" button to fetch and display a new joke. The app handles both single-line and multi-line (setup/delivery) joke formats automatically.

## Technologies

- React 18.2
- TypeScript 5.0
- Fetch API
- CSS3
