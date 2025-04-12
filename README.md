# El 5 araba 🤖

<div align="center">
  <img src="https://img.shields.io/badge/Discord.js-v14.14.1-blue?logo=discord" alt="Discord.js Version">
  <img src="https://img.shields.io/badge/TypeScript-v5.3.3-blue?logo=typescript" alt="TypeScript Version">
  <img src="https://img.shields.io/badge/Gemini-AI-orange?logo=google" alt="Gemini AI">
  <img src="https://img.shields.io/badge/License-ISC-green" alt="License">
</div>

## 📝 Description

El 5 araba is an intelligent Discord bot that uses Google's Gemini AI technology to communicate with users in Arabic. The bot excels in understanding questions and providing smart responses, with full Arabic language support.

## ✨ Features

- 🤖 Full Arabic language support
- 🧠 Smart responses using Gemini AI
- 👤 User registration system
- ⏱️ Rate limiting system
- 💬 Common question handling
- 🔒 High security and protection

## 📋 Requirements

- Node.js v16.9.0 or higher
- npm v7.0.0 or higher
- Gemini AI API key
- Discord bot token

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/Abu-al-Hun/discord-bot-ai.git
cd El-5-araba
```

2. Install dependencies:

```bash
npm install
```

3. Create a `config.json` file and add the following information:

```json
{
  "token": "TOKEN_BOT",
  "channelId": "CHANNEL_ID",
  "geminiApiKey": "GEMINI_API_KEY"
}
```

4. Start the bot:

```bash
npm start
```

## 🛠️ Project Structure

```
El-5-araba/
│── index.ts         # Main bot file
├── config.json          # Configuration file
├── users.json           # User database
├── package.json         # Project and dependencies info
└── README.md           # Documentation
```

## 🔧 Configuration

- `RATE_LIMIT_WINDOW`: Rate limit window (in milliseconds)
- `MAX_REQUESTS_PER_WINDOW`: Maximum requests per window
- `identityQuestions`: Bot identity-related questions
- `nameQuestions`: Bot name-related questions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more information.

## 📞 Contact

- 🌐 [Official Website](http://abualhun.wick.ink/)
- 🛍️ [Web Store](http://abualhun.shop.wick.ink/)
- 💬 [Discord Server](https://discord.gg/wjCq6n8R4g)
- 📧 Email: abualhun@wick-studio.com

## 🙏 Acknowledgments

- Special thanks to [Google AI](https://ai.google.dev/) for providing Gemini AI
- Special thanks to [Discord.js](https://discord.js.org/) for the amazing library

---

<div align="center">
  <p>© 2025 El 5 araba - All Rights Reserved</p>
  <p>Developed by <a href="https://github.com/Abu-al-Hun">Abu-al-Hun</a></p>
</div>
