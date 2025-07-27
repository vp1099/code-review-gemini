# Gemini Code Reviewer

An AI-powered tool that uses the Google Gemini API to provide expert-level code reviews. Paste your code snippet, and receive instant, comprehensive feedback on bugs, performance, security vulnerabilities, and adherence to best practices.

*A screenshot of the application showing the code input on the left and the AI-generated review on the right.*

---

## ✨ Features

- **Comprehensive AI Analysis**: Leverages the power of Google's `gemini-2.5-flash` model to perform in-depth code analysis.
- **Side-by-Side View**: A clean, intuitive interface with the code editor on one side and the review output on the other.
- **Multi-faceted Feedback**: Get insights into:
    - 🐛 Bugs and Logic Errors
    - ⚡ Performance Bottlenecks
    - 🛡️ Security Vulnerabilities
    - 🎨 Best Practices & Readability
- **Markdown Support**: The review is rendered in easy-to-read Markdown, with proper formatting for headings, lists, and code blocks.
- **Copy Code Snippets**: Easily copy suggested code improvements to your clipboard with a single click.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Clear Loading & Error States**: Provides clear user feedback while the AI is processing the request or if an error occurs.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/docs) (`@google/genai`)
- **Module System**: ES Modules with `importmap` for browser-native module loading (no build step required).

## 🚀 Setup and Deployment

This project is a static web application that can be served from any simple HTTP server.

### Prerequisites

- A valid Google Gemini API key. You can get one from [Google AI Studio](https://makersuite.google.com/).
- A deployment environment or local server capable of injecting environment variables into static client-side code.

### Configuration

The application requires the Google Gemini API key to be available as an environment variable named `API_KEY`.

The application code (`services/geminiService.ts`) is designed to read this key directly from the execution environment:
```javascript
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
```

You must configure your hosting provider (like Vercel, Netlify, or a custom server) to expose your API key under this name.

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Set up the environment:**
    The challenge with running locally is providing the `process.env.API_KEY`. A standard static file server will not substitute this value. You would need a development server like Vite or to run a custom script that replaces the placeholder before serving.

3.  **Serve the files:**
    Once the API key is handled, you can serve the project's root directory with any static server. For example, using the `serve` package:
    ```bash
    npx serve
    ```
    Then, open your browser to the URL provided (e.g., `http://localhost:3000`).

## ✍️ How to Use

1.  Open the application in your browser.
2.  Paste the code you wish to have reviewed into the text area on the left. You can also modify the placeholder code.
3.  Click the **"✨ Review Code"** button.
4.  Wait for a moment while Gemini analyzes your code. A loading indicator will be displayed.
5.  View the detailed, formatted review in the panel on the right.
