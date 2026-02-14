<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/13eZiVfFzGIjPAJsCMadRzs7M1pMKSj4n

## Run Locally

**Prerequisites:**  Node.js


1. Clone the repository
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Google AI API key (supports Gemma 3)
3. Run `npm install`
4. Run `npm run dev` to start the application.

## Technologies Used
- **React 19** with TypeScript
- **Gemma 3 27B** via Google Generative AI SDK
- **Tailwind CSS** for styling
- **Lucide React** for iconography
- **Vite** for the build tool
- **Zod** for schema validation (via AI response)
