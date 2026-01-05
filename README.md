# Harp and Code - Transforming Ideas into Intelligent Tools

**Harp and Code** is a corporate portfolio and digital service platform that bridges the gap between abstract concepts and functional technology. We specialize in transforming invisible logic into tangible digital products—ranging from high-performance websites to AI-powered automation agents.

![Harp and Code Banner](./public/heroharp.jpeg)

## 🚀 Project Overview

This project is a modern Single Page Application (SPA) built to showcase the services and products of **Harp and Code**. It features an immersive, interactive 3D interface that reflects our core philosophy: *Harp evokes invisible vibrations that move people; code makes invisible logic tangible.*

### Key Features
* **Immersive 3D Visuals**: Integrates a custom WebGL interactive globe to visualize global connectivity and specific service locations (e.g., Panama).
* **Bilingual Support (i18n)**: Fully localized for English and Spanish audiences using `i18next`, allowing dynamic language toggling without page reloads.
* **Modern SPA Architecture**: Built with React 19 and Vite for lightning-fast performance, smooth transitions, and a seamless user experience.
* **Dynamic Content Showcase**: Dedicated sections for Web Development, App Development, and AI Solutions, plus a spotlight on our flagship product, the **OneRetire App**.

## 🛠 Tech Stack

* **Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **3D/Visualization**: [Three.js](https://threejs.org/) & [react-globe.gl](https://github.com/vasturiano/react-globe.gl)
* **Routing**: [React Router v7](https://reactrouter.com/)
* **Internationalization**: [react-i18next](https://react.i18next.com/)
* **SEO**: [react-helmet-async](https://github.com/staylor/react-helmet-async)

## 📦 Installation & Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/harp-and-code.git](https://github.com/your-username/harp-and-code.git)
    cd harp-and-code
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```text
src/
├── components/        # Reusable UI components (Navbar, Hero, Products, etc.)
├── data/             # Static data files (GeoJSON for the globe)
├── locales/          # Translation files (en/es)
├── CSS/              # Modular CSS styles
├── App.jsx           # Main application layout and routing logic
└── main.jsx          # Entry point
