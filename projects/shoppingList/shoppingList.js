const env = require('../../.env')
const Telegraf =  require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let list = []

const generateButtons = () => Extra.markup(
  Markup.inlineKeyboard(
    // Percorre a lista e gera um botão para cada item.
    list.map(item => Markup.callbackButton(item, `delete ${item}`)),
    { columns: 3 }
  )
)

bot.start(async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo(a) ${name}!`)
  await ctx.reply(`Digite os itens que você deseja adicionar a lista`)
})

bot.on('text', ctx => {
  list.push(ctx.update.message.text) // Adicionando na lista.
  ctx.reply(`${ctx.update.message.text} adicionado com sucesso!`, generateButtons())
})

bot.action(/delete (.+)/, ctx => {
  // Retorna todos os elementos que não deram 'match', ou seja, remove o item da lista.
  list = list.filter(item => item !== ctx.match[1])
  ctx.reply(`${ctx.match[1]} deletado!`, generateButtons())
})

bot.startPolling()