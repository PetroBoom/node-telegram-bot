const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, backOptions} = require(`./options.js`)
const token = '5455077738:AAH1M9M6LB47LxxTkF6Kp1xlk8lj_efBWIw'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const StartGame = async (chatid) => {
    bot.sendMessage(chatid, 'Бот загадывает число от 0 до 9, а ты должен ее угадать')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatid] = randomNumber;
    bot.sendMessage(chatid, `Отгадывай`, gameOptions)
}

//Устанавливаем меню
const start = () => {
    bot.setMyCommands([
        {command:'/start', description: 'Начальное привестствие'},
        {command:'/info', description: 'Информация о проекте'},
        {command:'/game', description: 'Играй и выигрывай'}
    ])

//Принимаем команды от бота

    bot.on('message', msg => {
        const text = msg.text
        const chatid = msg.chat.id

        if (text === '/start') {
            return bot.sendMessage(chatid, 'good night!')
        }

        if (text=== '/info') {
            return bot.sendMessage(chatid, `HELLO ${msg.from.first_name}`)
            return bot.sendSticker(chatid, 'https://cdn.tlgrm.app/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/192/1.webp')
        }

        if (text=== '/game'){
            StartGame(chatid)
        }
        return bot.sendMessage(chatid, 'Я тебя не понимаю, попробуй еще раз')

    })

//Трекер на кнопки
bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
        return StartGame(chatId)
    }
    if (data === chats[chatId]) {
        return bot.sendMessage(chatId, `Поздравляю ты угадал ${chats[chatId]} `, backOptions)
    }
    else {
        return bot.sendMessage(chatId, `К сожалению ты не угадала, была цифра ${chats[chatId]} `,backOptions)
    }
})

}

start()