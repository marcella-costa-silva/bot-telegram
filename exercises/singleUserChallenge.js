const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
  const from = ctx.update.message.from
  console.log(from)

  if (from.id === 123456) {
    ctx.reply('Olááá!')
  } else {
    ctx.reply('Desculpa, não posso falar com você :(')
  }
})

bot.startPolling()