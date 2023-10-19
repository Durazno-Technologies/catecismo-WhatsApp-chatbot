import 'dotenv/config'
import WhatsAppBot from '@green-api/whatsapp-bot'
import {
    MENU_MESSAGE,
    CATECISMO_MESSAGE,
    FE_MESSAGE,
    MISTERIO_MESSAGE,
    VIDA_MESSAGE,
    ORACION_MESSAGE,
    EVANGELIO_MESSAGE,
} from './messages.js'

const session = WhatsAppBot.session
const Stage = WhatsAppBot.Stage
const Scene = WhatsAppBot.BaseScene

const bot = new WhatsAppBot({
    idInstance: process.env.ID_INSTANCE,
    apiTokenInstance: process.env.API_TOKEN_INSTANCE
})

// Main Menu scene
const menuScene = new Scene('menu')
menuScene.enter((ctx) => ctx.reply(MENU_MESSAGE))
menuScene.leave((ctx) => ctx.reply('Dejando el menú principal, entrando a...'))
menuScene.hears(['1'], async (ctx) => {
    await ctx.scene.leave('menu')
    ctx.scene.enter('catecismo')
})
menuScene.hears(['3'], async (ctx) => {
    await ctx.scene.leave('menu')
    ctx.scene.enter('evangelio')
})

// Catecismo scene
const catecismoScene = new Scene('catecismo')
catecismoScene.enter((ctx) => ctx.reply(CATECISMO_MESSAGE))
catecismoScene.leave((ctx) => ctx.reply('Dejando Catecismo 📖, entrando a...'))
catecismoScene.hears('1', async (ctx) => {
    await ctx.scene.leave('catecismo')
    ctx.scene.enter('fe')
})
catecismoScene.hears('2', async (ctx) => {
    await ctx.scene.leave('catecismo')
    ctx.scene.enter('misterio')
})
catecismoScene.hears('3', async (ctx) => {
    await ctx.scene.leave('catecismo')
    ctx.scene.enter('vida')
})
catecismoScene.hears('4', async (ctx) => {
    await ctx.scene.leave('catecismo')
    ctx.scene.enter('oracion')
})
catecismoScene.hears('5', async (ctx) => {
    await ctx.scene.leave('catecismo')
    ctx.scene.enter('menu')
})

// Fe scene
const feScene = new Scene('fe')
feScene.enter((ctx) => ctx.reply(FE_MESSAGE))
feScene.leave((ctx) => ctx.reply('Saliendo de Fe 🏈'))
feScene.hears('*', (ctx) => leave('fe'))

// Misterio scene
const misterioScene = new Scene('misterio')
misterioScene.enter((ctx) => ctx.reply(MISTERIO_MESSAGE))
misterioScene.leave((ctx) => ctx.reply('Saliendo de Misterio 🏓'))
misterioScene.hears('*', async (ctx) => {
    await ctx.scene.leave('misterio')
    ctx.scene.enter('catecismo')
})

// Vida scene
const vidaScene = new Scene('vida')
vidaScene.enter((ctx) => ctx.reply(VIDA_MESSAGE))
vidaScene.leave((ctx) => ctx.reply('Saliendo de Vida 🥏'))
misterioScene.hears('*', async (ctx) => {
    await ctx.scene.leave('vida')
    ctx.scene.enter('catecismo')
})

// Oración scene
const oracionScene = new Scene('oracion')
oracionScene.enter((ctx) => ctx.reply(ORACION_MESSAGE))
oracionScene.leave((ctx) => ctx.reply('Saliendo de Oracion 🛼'))
misterioScene.hears('*', async (ctx) => {
    await ctx.scene.leave('oracion')
    ctx.scene.enter('catecismo')
})

// Evangelio scene
const evangelioScene = new Scene('evangelio')
evangelioScene.enter((ctx) => ctx.reply(EVANGELIO_MESSAGE))
evangelioScene.leave((ctx) => ctx.reply('Saliendo de Evangelio 🕊️'))
misterioScene.hears('*', async (ctx) => {
    await ctx.scene.leave('evangelio')
    ctx.scene.enter('catecismo')
})

const stage = new Stage([menuScene, catecismoScene, feScene, misterioScene, vidaScene, oracionScene, evangelioScene])
bot.use(session())
bot.use(stage.middleware())
bot.on('message', (ctx) => ctx.scene.enter('menu'))
bot.launch()
