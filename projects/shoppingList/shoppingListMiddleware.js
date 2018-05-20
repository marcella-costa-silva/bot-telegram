// Midleware de segurança, só atende um tipo de usuário.
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

// Verificando de duas formas, pois pode vir de um 'text' ou uma 'action'. Eles possuem caminhos diferentes.
const checkUser = (ctx, next) => {
  const sameIDMsg = ctx.update.message
    && ctx.update.message.from.id == env.userID

  const sameIDCallback = ctx.update.callback_query
    && ctx.update.callback_query.from.id == env.userID

    if (sameIDMsg || sameIDCallback) {
      next() // Só chama o 'next' se entrar nessa condição.
    } else {
      ctx.reply('Desculpe, não posso conversar com você 😅')
    }
}

// Pode ter mais de um Middleware
const processing = ({ reply }, next) => 
  reply('Processando...').then(() => next()) // Em todas as situações chama o 'next'.

// Checando o usuário antes de começar.
bot.start(checkUser, async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo(a) ${name}! 😁`)
  await ctx.reply(`Digite os itens que você deseja adicionar a lista.
  Ex: arroz, feijão, macarrão...`)
  ctx.session.list = []
})

// Checando o usuário antes de começar e chamando 'processing'.
bot.on('text', checkUser, processing, ctx => {
  let element = ctx.update.message.text
  ctx.session.list.push(element) // Adicionando na lista.
  ctx.reply(`${element} adicionado! ✅`, generateButtons(ctx.session.list))
})

bot.action(/delete (.+)/, checkUser, ctx => {
  // Retorna todos os elementos que não deram 'match', ou seja, remove o item da lista.
  ctx.session.list = ctx.session.list.filter(
    item => item !== ctx.match[1])
  ctx.reply(`${ctx.match[1]} deletado! ❎`, generateButtons(ctx.session.list))
})

bot.startPolling()