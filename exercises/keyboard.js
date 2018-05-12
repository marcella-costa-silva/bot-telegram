const env = require('../.env')
const Telegraf = require('telegraf')
const Markup =  require('telegraf/markup') // Teclado personalizado.
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
  ['🐷 Porco', '🐮 Vaca', '🐑 Carneiro'],
  ['🐔 Galinha', '🐣 Eu como é ovo'],
  ['🐟 Peixe', '🐙 Frutos do mar'],
  ['🍄 Eu sou vegetariano']
]).resize().extra()

bot.start(async ctx => {
  await ctx.reply(`Seja bem-vindo(a), ${ctx.update.message.from.first_name}!`)
  await ctx.reply(`Qual bebida você prefere?`,
  Markup.keyboard(['Coca-cola', 'Pepsi']).resize().oneTime().extra())
})

bot.hears(['Coca-cola', 'Pepsi'], async ctx => {
  await ctx.reply(`Nossa, eu também AMO ${ctx.match}`)
  await ctx.reply('Qual seu tipo de carne preferido?', tecladoCarne)
})

bot.hears('🐟 Peixe', ctx => ctx.reply('OBA! É o meu predileto também. Que tal marcarmos um almoço?'))
bot.hears('🍄 Eu sou vegetariano', ctx => ctx.reply('Hmm, legal! Mas eu adoro uma carninha hehehe'))
bot.on('text', ctx => ctx.reply('Shooow! Também curto, mas prefiro peixe. Hmmmmm'))

bot.startPolling()