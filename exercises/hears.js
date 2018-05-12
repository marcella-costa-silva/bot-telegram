const env = require('../.env')
const Telegraf = require('telegraf')
const moment = require('moment')
const bot = new Telegraf(env.token)

// Respondendo a textos específicos.
bot.hears('pizza', ctx => ctx.reply('QUEROOOO!'))
bot.hears(['fígado', 'chuchu'], ctx => ctx.reply('ECAAA'))
bot.hears(/burguer/i, ctx => ctx.reply('Aceito, com chedar, por favor hehehe')) // Aceita maiúscula e minúscula.
bot.hears([/brocolis/i, /salada/i], ctx => ctx.reply('Hmm, acho que já almocei em casa'))
bot.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx => {
  moment.locale('pt-BR')
  const data = moment(ctx.match[1], 'DD/MM/YYYY')
  ctx.reply(`${ctx.match[1]} cai em ${data.format('dddd')}`)
})

bot.startPolling()