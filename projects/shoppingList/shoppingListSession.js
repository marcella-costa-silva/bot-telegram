const env = require('../../.env')
const Telegraf =  require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)

const generateButtons = list => Extra.markup(
  Markup.inlineKeyboard(
    // Percorre a lista e gera um botão para cada item.
    list.map(item => Markup.callbackButton(item, `delete ${item}`)),
    { columns: 3 }
  )
)

bot.use(session())

bot.start(async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo(a) ${name}! 😁`)
  await ctx.reply(`Digite os itens que você deseja adicionar a lista.
  Ex: arroz, feijão, macarrão...`)
  ctx.session.list = []
})

bot.on('text', ctx => {
  let element = ctx.update.message.text
  ctx.session.list.push(element) // Adicionando na lista.
  ctx.reply(`${element} adicionado! ✅`, generateButtons(ctx.session.list))
})

bot.action(/delete (.+)/, ctx => {
  // Retorna todos os elementos que não deram 'match', ou seja, remove o item da lista.
  ctx.session.list = ctx.session.list.filter(item => item !== ctx.match[1])
  ctx.reply(`${ctx.match[1]} deletado! ❎`, generateButtons(ctx.session.list))
})

bot.startPolling()