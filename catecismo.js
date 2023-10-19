import 'dotenv/config'
import WhatsAppBot from '@green-api/whatsapp-bot'

const initialMsg = `Buenos días, ¿Qué te gustaría consultar hoy?
Escribe el número que corresponda a la opción.
1. Catecismo 📖
2. Reflexiones y temas de la vida diaria ✝️'
3. Lecturas, evangelio y homilía del día 🕊️'
4. El Rosario y oraciones 🙏'
5. Santoral 😇'
6. Música católica 🎵'
`

const bot = new WhatsAppBot({
    idInstance: process.env.ID_INSTANCE,
    apiTokenInstance: process.env.API_TOKEN_INSTANCE
})

bot.on('message', async (ctx) => {
    try {
        ctx.reply(initialMsg)
    } catch (error) {
        console.error(error)
        ctx.reply("No te entiendo, intenta de nuevo")
    }
})

bot.launch()
console.log("bot started")
