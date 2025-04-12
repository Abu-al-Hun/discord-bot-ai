import { Client, GatewayIntentBits, Message, ChannelType } from 'discord.js';
import * as fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration and Constants
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const line = '════════════════════════════════════════════════════════════════════════════════';

const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS_PER_WINDOW = 2;
let requestCount = 0;
let windowStart = Date.now();

// Types and Interfaces
interface UserData {
    id: string;
    name: string;
    registrationDate: string;
}

interface UsersDatabase {
    users: { [key: string]: UserData };
}

// Database Management
let usersDb: UsersDatabase = { users: {} };
try {
    usersDb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
} catch (error) {
    console.log('No existing users database found. Creating new one.');
}

const userRegistrationState: { [key: string]: boolean } = {};

// Bot Configuration
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// AI Configuration
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Utility Functions
function saveUsersDb() {
    fs.writeFileSync('./users.json', JSON.stringify(usersDb, null, 2));
}

async function checkRateLimit(): Promise<boolean> {
    const now = Date.now();
    if (now - windowStart >= RATE_LIMIT_WINDOW) {
        requestCount = 0;
        windowStart = now;
    }
    if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
        return false;
    }
    requestCount++;
    return true;
}

async function generateResponse(prompt: string): Promise<string> {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text() || 'عذراً، لم أستطع توليد إجابة';
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}

// Question Arrays
const identityQuestions = [
    'من أنت',
    'من هو',
    'من انت',
    'من انت؟',
    'من أنت؟',
    'من هو؟',
    'من انتي',
    'من انتي؟'
];

const nameQuestions = [
    'اسمك',
    'اسمك؟',
    'ما اسمك',
    'ما اسمك؟',
    'شو اسمك',
    'شو اسمك؟',
    'اسمك ايه',
    'اسمك ايه؟'
];

// Bot Event Handlers
client.once('ready', () => {
    if (!client.user) {
        console.error('Client user is not available')
        return
    }

    console.log(line)
    console.log(`🌐 ${client.user.tag} is now online!`)
    console.log(line)
    console.log(`🤖 Bot Username  : ${client.user.username}`)
    console.log(`🆔 Bot ID        : ${client.user.id}`)
    console.log(`📅 Launched On   : ${new Date().toLocaleString()}`)
    console.log(line)
    console.log(`📊 Connected to  : ${client.guilds.cache.size} servers`)
    console.log(`👥 Total Users   : ${client.users.cache.size}`)
    console.log(`📁 Loaded Events : ${client.eventNames().length}`)
    console.log(line)
    console.log(`© 2025 El 5 araba - All Rights Reserved.`)
    console.log(`🔗 GitHub: https://github.com/Abu-al-Hun`)
    console.log(`🌐 Website: http://abualhun.wick.ink/`)
    console.log(`🌐 Web Store: http://abualhun.shop.wick.ink/`)
    console.log(`💬 Discord: https://discord.gg/wjCq6n8R4g`)
    console.log(line)
    console.log("✅ Bot is fully operational and ready to serve!")
    console.log(line)
})

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return;
    if (message.channel.id === config.channelId) {
        try {
            if (message.channel.type === ChannelType.GuildText || message.channel.type === ChannelType.DM) {
                await message.channel.sendTyping();
            }

            const userId = message.author.id;

            // User Registration Logic
            if (!usersDb.users[userId]) {
                if (!userRegistrationState[userId]) {
                    userRegistrationState[userId] = true;
                    const welcomeMessage = `مرحباً 👋 أنا الخرابة، بوت الذكاء الاصطناعي الخاص بهذا السيرفر 🤖\nما اسمك؟ أود أن أتعرف عليك 😊`;
                    await message.reply(welcomeMessage);
                    return;
                } else {
                    const userName = message.content.trim();
                    usersDb.users[userId] = {
                        id: userId,
                        name: userName,
                        registrationDate: new Date().toLocaleDateString('ar-SA')
                    };
                    saveUsersDb();
                    delete userRegistrationState[userId];
                    const registrationComplete = `أهلاً ${userName} 😊 سعيد بالتعرف عليك أنا هنا لمساعدتك في أي وقت 🌟`;
                    await message.reply(registrationComplete);
                    return;
                }
            }

            const userData = usersDb.users[userId];

            // Identity Question Handling
            const isIdentityQuestion = identityQuestions.some(question => 
                message.content.toLowerCase().includes(question.toLowerCase())
            );

            if (isIdentityQuestion) {
                const response = `أنا بوت الخرابة AI 🤖\n\nأهلاً ${userData.name} أنا أتذكرك جيداً 😊\nتم تدريبي من قبل مطورين متميزين في هذا السيرفر\n\nتاريخ بدء تدريبي: ${new Date().toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}\n\nأنا هنا لمساعدتك والإجابة على أسئلتك 🌟`;
                await message.reply(response);
                return;
            }

            // Name Question Handling
            const isNameQuestion = nameQuestions.some(question => 
                message.content.toLowerCase().includes(question.toLowerCase())
            );

            if (isNameQuestion) {
                const response = `اسمي الخرابة 😎\nوأنت ${userData.name}، أتذكرك منذ ${userData.registrationDate} 🌟\nأنا بوت ذكاء اصطناعي متخصص في مساعدتك والإجابة على أسئلتك 🤖`;
                await message.reply(response);
                return;
            }
            
            // AI Response Generation
            if (await checkRateLimit()) {
                const prompt = `المستخدم اسمه ${userData.name} ${message.content}`;
                const response = await generateResponse(prompt);
                await message.reply(response);
            } else {
                await message.reply('عذراً، لقد تجاوزت الحد المسموح به من الطلبات يرجى المحاولة بعد دقيقة ⏳');
            }
        } catch (error) {
            console.error('Error:', error);
            await message.reply('عذراً، حدث خطأ أثناء معالجة طلبك');
        }
    }
});

// Start the bot
client.login(config.token);