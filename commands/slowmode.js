const Discord = require("discord.js");
const { prefix, colors } = require("./../utils/config.json");
const embedColor = colors.default;
const embedError = colors.error;

module.exports = {
  name: "slowmode",
  description: "set slowmode channel",
  aliases: ["sm"],
  usage: "[command name]",
  guildOnly: false,
  args: true,
  execute: async (message, args, client) => {

    
    if (args.length < 1) {
        message.reply('Please provide a duration')
        return
      }
  
      let duration = args.shift().toLowerCase()
      if (duration === 'off') {
        duration = 0
      }
  
      if (isNaN(duration)) {
        message.reply(
          'Please provide either a number of seconds or the word "off"'
        )
        return
      }
  
      //['testing','hello','world']
      //.join(' ')
      //testing hello world
  
      message.channel.setRateLimitPerUser(duration, args.join(' '))
      message.reply(`The slowmode for this channel has been set to ${duration}`)
  }
}

