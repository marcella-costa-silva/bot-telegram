const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let count = 0

// Teclado que irá aparecer dentro de um teclado inline.
const buttons = Extra.markup(Markup.inlineKeyboard([ 
  // Botões que vão disparar ações (label + ação).
  Markup.callbackButton('+1', 'add 1'),
  Markup.callbackButton('+10', 'add 10'),
  Markup.callbackButton('+100', 'add 100'),
  Markup.callbackButton('-1', 'sub 1'),
  Markup.callbackButton('-10', 'sub 10'),
  Markup.callbackButton('-100', 'sub 100'),
  Markup.callbackButton('🔄 Zerar', 'reset'),
  Markup.callbackButton('✔ Resultado', 'result')
], { columns: 3 }))

bot.start(async ctx => {
  const nome = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo(a), ${nome}! 😁😁`)
  await ctx.reply(`A contagem atual está em ${count}`, buttons)
})

bot.action(/add (\d+)/, ctx => {
  count += parseInt(ctx.match[1])
  ctx.reply(`A contagem atual está em ${count}`, buttons)
})

bot.action(/sub (\d+)/, ctx => {
  count -= parseInt(ctx.match[1])
  ctx.reply(`A contagem atual está em ${count}`, buttons)
})

bot.action('reset', ctx => {
  count = 0
  ctx.reply(`A contagem atual está em ${count}`, buttons)
})

bot.action('result', ctx => {
  ctx.answerCbQuery(`A contagem atual está em ${count}`)
})

bot.startPolling()