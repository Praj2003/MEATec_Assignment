## TaskNest — Task Manager App
Overview
A modern task manager application built with React, TypeScript, and Vite.
It allows users to add, update, delete, and fetch tasks with a clean and responsive UI.

Features
Vite + React.js + TypeScript for fast and type-safe development

Tailwind CSS + shadcn/ui for responsive and modern styling

CRUD operations: add, edit, delete, and view tasks

Context API for managing authentication state across the app

MSW (Mock Service Worker) for simulating backend APIs in development

Tech Stack
Frontend: React.js, TypeScript, Vite

Styling: Tailwind CSS, shadcn/ui

State Management: Context API

API Mocking: MSW

Docker - Containerizing Application

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Core Features and UI
### Home Page

https://github.com/user-attachments/assets/05673727-4630-4c29-bedf-04615a19b042

### Task Manager (CRUD) Operation


https://github.com/user-attachments/assets/b2602e9f-58cf-4406-b86f-7070817f647d


https://github.com/user-attachments/assets/5921188b-5bb0-40fb-975d-d9a1265ff8ef


#### Mobile Friendly


https://github.com/user-attachments/assets/104d3fff-4df6-4300-89f6-cccbd8207e0a



https://github.com/user-attachments/assets/0a7e2c6e-163c-4d08-8b33-33812811ad1f


### Login Functionality and Context API Usage (For Passing Session and IsLoggedIn or not)


https://github.com/user-attachments/assets/a04060f3-a479-4a2e-bd2d-c5a9a9682bb6

### MSW Screenshot
<img width="654" height="677" alt="Screenshot 2025-08-13 at 2 04 13 PM" src="https://github.com/user-attachments/assets/a1165c76-ce43-4dcd-a64d-a498d54d7f6b" />




## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
