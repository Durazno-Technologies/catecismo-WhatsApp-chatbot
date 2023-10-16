import 'dotenv/config'
import WhatsAppBot from '@green-api/whatsapp-bot'
import OpenAI from 'openai'

const bot = new WhatsAppBot({
    idInstance: process.env.ID_INSTANCE,
    apiTokenInstance: process.env.API_TOKEN_INSTANCE
})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const debug = (request, response) => {
    [request, response].map((item) => {
        console.log(
            Array.isArray(item) ? 'response' : 'request',
            'length=', item.length,
            'type=', Array.isArray(item) ? 'Array' : typeof item,
            'content=', item,
        )
    })
}

const getChatGPTResponse = async (content) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content }],
        model: 'gpt-4',
    })
    debug(content, chatCompletion.choices)
    return chatCompletion.choices.reduce((acc, curr) => acc + curr.message.content, '')
}

bot.on('message', async (ctx) => {
    try {
        ctx.reply('Permiteme un momento 🙏')
        ctx.reply('Estoy 🤔💭 para darte una ✅ respuesta')
        ctx.reply(await getChatGPTResponse(ctx.message.text))
    } catch (error) {
        console.error(error)
        ctx.reply("No te entiendo, intenta de nuevo")
    }
})

bot.launch()
console.log("bot started")
