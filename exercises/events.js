const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
  const name = ctx.update.message.from.first_name
  ctx.reply(`Seja bem vindo(a), ${name} :)`)
})

bot.on('text', ctx => {
  text = ctx.update.message.text
  ctx.reply(`Texto '${text}' recebido com sucesso`)
})

bot.on('location', ctx => {
  const location = ctx.update.message.location
  console.log(location)
  ctx.reply(`Hmmm, Deixa eu ver aqui... Você está em: Lat: ${location.latitude}, Lon: ${location.longitude}`)
})

bot.on('contact', ctx => {
  const contact = ctx.update.message.contact
  console.log(contact)
  ctx.reply(`Vou lembrar do(a) ${contact.first_name} (${contact.phone_number})`)
})

bot.on('voice', ctx => {
  const voice = ctx.update.message.voice
  console.log(voice)
  ctx.reply(`Seu áudio possui ${voice.duration} segundos`)
})

bot.on('photo', ctx => {
  const photo = ctx.update.message.photo
  console.log(photo)
  photo.forEach((photo, i) => {
  ctx.reply(`A foto ${i} tem Largura x Altura: ${photo.width} x ${photo.height}`)
  })
})

bot.on('sticker', ctx => {
  const sticker = ctx.update.message.sticker
  console.log(sticker)
  ctx.reply(`Você enviou o sticker ${sticker.emoji} do conjunto ${sticker.set_name}`)
})

bot.startPolling()