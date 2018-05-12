const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

// Irá seguir a ordem declarada.
bot.start(async ctx => {
  await ctx.reply(`Olá, ${ctx.update.message.from.first_name}! 😁`)
  await ctx.replyWithHTML(`Testando mensagem com HTML: <b>Olá, tudo bem?</b>`)
  await ctx.replyWithMarkdown('Destacando mensagem *Markdown*'
    + ' _de várias_ `formas` ```possíveis```'
    + ' [Google](http://www.google.com)')
  await ctx.replyWithPhoto({source: `${__dirname}/img/coffe.png`})
  await ctx.replyWithPhoto('https://amenteemaravilhosa.com.br/wp-content/uploads/2016/06/Cafe%CC%811-1024x768-1024x768.jpg',
    {caption: 'Já tomou o seu café hoje?'})
  await ctx.replyWithPhoto({url: 'https://amenteemaravilhosa.com.br/wp-content/uploads/2016/06/Cafe%CC%811-1024x768-1024x768.jpg'})
  await ctx.replyWithLocation(29.9773008, 31.1303068)
  // await ctx.replyWithVideo('')
})

bot.startPolling()