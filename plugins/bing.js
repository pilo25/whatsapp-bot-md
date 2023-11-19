const { config } = require('dotenv')
const { bot, bing } = require('../lib/')

bot(
  {
    pattern: 'bing ?(.*)',
    fromMe: true,
    desc: 'bing ai',
    type: 'ai',
  },
  async (message, match) => {
    if (!config.BING_COOKIE)
      return await message.send(
        `Please set a bing cookie, log in to bing.com, use bing AI chat once, and then copy the cookie.\n\nsetvar BING_COOKIE = copied_cookie`
      )
    match = match || message.reply_message.text
    if (!match) return await message.send('*Example : bing Hi*')
    const res = await bing(match)
    return await message.send(res, { quoted: message.data })
  }
)