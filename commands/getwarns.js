const { Permissions, MessageEmbed } = require("discord.js")
const db = require("quick.db")
let wrong = "#F04A47"

module.exports = {
  name: 'getwarns',
    description: 'warn command',
    usage: '<user>',
    aliases: ['gw'],
	  guildOnly: false, //true if only used in server
	  args: true, //true if the command cant run without arguments
    category: "moderation",
  execute: async (message, args, client) => {
    try {

      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        const embed = new MessageEmbed()
        .setTitle("Denied")
        .setDescription("Missing permissions.")
        return message.channel.send({
          embeds: [embed],
        })
      }

      const target = message.mentions.users.first()
      if(!target) {
        const embed = new MessageEmbed()
        .setDescription("Mention a member please.")
        .setColor(wrong)

        return message.channel.send({
          embeds: [embed],
        })

      }

      if (target.bot){
        const embed = new MessageEmbed()
        .setDescription("Bots cannot get warnings.")
        .setColor(wrong)
        return message.channel.send({
          embeds: [embed],
        })
      }
      if (target.id === message.author.id) {
        const embed = new MessageEmbed()
        .setDescription("You cannot see warns yourself.")
        .setColor(wrong)
        return message.channel.send({
          embeds: [embed],
        })
      }

      if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1) {
        const embed = new MessageEmbed()
        .setDescription("You cannot see warns on people higher than you!")
        .setColor(wrong)
        return message.channel.send({
          embeds: [embed],
        })
      }
      let x = db.get(`warns_${target.id}`)
      const embed = new MessageEmbed()
      .setDescription(`<@${target.id}> has ${x} warning(s)`)
      .setColor(wrong)
      message.channel.send({
        embeds: [embed],
      })

    } catch (err) {
      console.log(err)

    }
  }

}
