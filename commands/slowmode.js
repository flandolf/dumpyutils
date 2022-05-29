const { time } = require("@discordjs/builders");
const Discord = require("discord.js");
const { prefix, colors } = require("./../utils/config.json");
module.exports = {
  name: "slowmode",
  description: "set slowmode channel",
  aliases: ["sm"],
  usage: "[command name]",
  guildOnly: false,
  args: true,
  execute: async (message, args, client) => {


    if (args.length < 1) {
      return message.reply({
        embeds: [{
          color: "red",
          description: "Please enter a number of seconds"
        }]
      });

    }

    let duration = args.shift().toLowerCase()
    if (duration === 'off') {
      duration = 0
    }

    if (isNaN(duration)) {
      message.reply(
        {
          embeds: [{
            color: colors.red,
            description: "Please enter a number of seconds"
          }]
        }
      )
      return
    }
    message.channel.setRateLimitPerUser(duration, args.join(' '))
    message.reply({embeds:[{
      color: colors.green,
      description: `Slowmode set to ${duration} seconds`,
      timestamp: new Date()
    }]})
  }
}

