<div align="center">
  <img src="./src/assets/images/logo.svg" alt="KDerma Logo" width="150">
  <h1>KDerma Frontend</h1>
  <p><strong>Authentic Korean Beauty, Curated for You.</strong></p>
  <p>KDerma brings you trusted Korean skincare and beauty essentials with a seamless shopping experience designed to make self-care simple, elegant, and effective.</p>
</div>

---

## ✨ Tech Stack

This project is built with a modern, performant, and scalable tech stack:

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **E-commerce**: [Snipcart](https://snipcart.com/)
- **Linting/Formatting**: ESLint & Prettier

## 🚀 Local Development Setup

To get the project running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd kderma-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Then, fill in the required API keys and configuration in `.env.local`.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

### Other Scripts

- **Build for production:**
  ```bash
  npm run build
  ```
- **Lint your code:**
  ```bash
  npm run lint
  ```
- **Format your code:**
  ```bash
  npm run format
  ```

## 🤝 Contribution Guidelines

- **Branching**: Create a new feature branch from `main` for every new feature or bug fix (e.g., `feature/add-product-page` or `fix/checkout-bug`).
- **Commits**: Follow the Conventional Commits specification for clear and automated versioning.
- **Husky Hooks**: This project uses `husky` and `lint-staged` to automatically lint and format code on every commit. Please ensure your commits pass these checks.

## 📂 Project Structure

```
kderma-frontend/
├── public/
└── src/
    ├── assets/
    │   ├── fonts/      # Custom font files
    │   ├── icons/      # SVG icons (cart, user, etc.)
    │   └── images/     # Logo, product photos, banners
    ├── components/     # Reusable React components
    ├── pages/          # Page components
    ├── services/       # API calls, external services
    ├── styles/         # Global styles
    ├── utils/          # Utility functions
    └── App.tsx         # Main application component
```
