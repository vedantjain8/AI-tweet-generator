# 🚀 AI Tweet Generator

An AI-powered Tweet Generator built with ⚡ Next.js, 🧠 Azure AI Foundry, and 💅 shadcn/ui. Enter a sentence, choose a character (like a pirate 🏴‍☠️ or Shakespeare 🎭), and watch the AI transform your words into a unique tweet — all under 280 characters!

---

## 📸 Screenshots

| Input Form | Generated Tweet |
|------------|-----------------|
| ![Input UI](https://raw.githubusercontent.com/vedantjain8/AI-tweet-generator/main/public/screenshot1.png) | ![Output UI](https://raw.githubusercontent.com/vedantjain8/AI-tweet-generator/main/public/screenshot2.png) |

---

## ✨ Features

- 🔮 Rewrites your sentence in any character's tone (pirate, Shakespeare, cyberpunk, etc.)
- ⚙️ Powered by Azure AI Foundry (DeepSeek-V3)
- 🎨 Beautiful UI with animations (Framer Motion + shadcn/ui)
- 🧠 Prompt engineering without model fine-tuning
- 🧾 Copy-to-clipboard, rate limiting, and logging
- 🌐 Fully deployable on Azure Web Apps
- 📦 Docker-ready for local and cloud hosting

---

## 🧪 How to Run

### 🐳 Run with Docker

1. **Clone the repo**:
   ```bash
   git clone https://github.com/vedantjain8/AI-tweet-generator.git
   cd AI-tweet-generator
   ```

2. **Set environment variables** in `.env`:
   ```env
   AZURE_AI_ENDPOINT=your-key-here
   AZURE_AI_API_KEY=https://your-azure-endpoint
   AZURE_MODEL_NAME=deepseek-v3
   ```

3. **Build and run the container**:
   ```bash
   docker build -t ai-tweet-generator .
   docker run -p 3000:3000 --env-file .env ai-tweet-generator
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

---

### 💻 Run Locally (without Docker)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file** and fill in your Azure values:
   ```env
   AZURE_OPENAI_KEY=your-key-here
   AZURE_OPENAI_ENDPOINT=https://your-openai-endpoint
   AZURE_OPENAI_MODEL_NAME=deepseek-v3
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/vedantjain8.png" width="80" />
      <br />
      <b>@vedantjain8</b>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org)
- **UI**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [lucide-react](https://lucide.dev)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **AI**: [Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-services/)
- **Styling**: Tailwind CSS
- **Deployment**: Azure App Service / Docker

---

## ⭐️ Star this repo if you like it!