# GoNepal 🇳🇵

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React+TypeScript-%23087EA4?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-%23646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2306B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  <img src="public/android-chrome-512x512.png" alt="GoNepal Logo" width="200" height="200">
</p>

<h3 align="center">Discover Nepal Like Never Before</h3>

<p align="center">
  <strong>GoNepal</strong> is your ultimate digital companion for exploring Nepal's majestic Himalayas, vibrant culture, and hidden treasures. From adventure trekking to spiritual journeys, experience immersive travel planning and local discovery all in one platform.
</p>

---

## ✨ Key Features

### 🎬 Immersive Visual Experience
- **Dynamic Video Background**: Stunning full-screen video backdrop bringing Nepal's beauty to your screen
- **Smart Hero Text**: Text dynamically adapts its color (light/dark) to maintain perfect contrast with the video background in real-time
- **Parallax Effects**: Mouse-driven depth animations creating an engaging, interactive interface
- **Responsive Design**: Seamlessly adapts to all device sizes and orientations

### 🗺️ Travel Planning & Exploration
- **Province Guide**: Explore Nepal's 7 provinces with detailed cultural and landscape information
- **Destination Explorer**: Discover top destinations including Kathmandu Valley, Pokhara, Everest Base Camp, and sacred temples
- **Local Discovery**: Find nearby mandirs, heritage sites, restaurants, and shops (with simulated geolocation)
- **Seasonal Highlights**: Plan your visit based on seasonal attractions and weather patterns

### 🛠️ Smart Travel Tools
- **Live Weather**: Real-time weather updates for Kathmandu, Pokhara, and Lukla to help you plan safely
- **Hospital Locator**: Emergency medical facility finder for tourist safety and peace of mind
- **Nepal Time Widget**: Beautiful analog and digital clock displaying Nepal Standard Time (NPT)
- **AI Travel Assistant**: Intelligent chatbot ready to answer your travel questions instantly
- **Flight Booking**: Integrated flight search and booking for major airlines

---

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite (lightning-fast development and production builds)
- **Styling**: Tailwind CSS with custom Nepal-themed color palette
- **Maps & Geolocation**: Leaflet & React-Leaflet
- **UI Components**: Shadcn/ui component library
- **Testing**: Vitest for unit and integration tests
- **Icons & Fonts**: Lucide Icons, Google Fonts (Playfair Display, Inter, Montserrat)
- **State Management**: React Hooks (useState, useEffect, useContext)
- **API Integration**: OpenRouter for AI chatbot capabilities

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js**: v16 or higher
- **Package Manager**: npm, yarn, or bun

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nishantXnova/Go-nepal.git
   cd Go-nepal/temp-repo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

### Testing

```bash
npm run test
```

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components (Airlines, Destinations, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── data/            # Static data (destinations, etc.)
├── assets/          # Images and static files
└── App.tsx          # Main app component
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Nepal's incredible culture and landscapes for inspiration
- The open-source community for amazing tools and libraries
- All contributors who help improve GoNepal

---

**Made with ❤️ for Nepal lovers worldwide**

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for Nepal
</p>
