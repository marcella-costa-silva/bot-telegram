const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
  const name = ctx.update.message.from.first_name
  ctx.reply(`Seja bem vindo(a) ${name}!\n Avise-me se precisar de /ajuda`)
})

// Criando comandos.
bot.command('ajuda', ctx => ctx.reply('/ajuda: Vou te mostrar as opções'
  + '\n/ajuda2: Para testar via hears'
  + '\n/op2: Opção genérica'
  + '\n/op3: Outra opção genérica'))

bot.hears('/ajuda2', ctx => ctx.reply('Eu também consigo capturar comandos'
  + ', mas utilize a opção /ajuda mesmo'))

// /\op\d+/i: com número depois. | /\op(2|3)/i: resposta para op2 ou op3.
bot.hears(/\op(2|3)/i, ctx => ctx.reply('Resposta padrão para comandos genéricos'))

bot.startPolling()