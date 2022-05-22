const { Permissions, MessageEmbed } = require("discord.js")
const db = require("quick.db")
let wrong = "#F04A47"
  module.exports = {
    name: 'resetwarn',
    description: 'warn command',
    usage: '<user> <reason>',
    aliases: ['rw'],
	  guildOnly: false, //true if only used in server
	  args: true, //true if the command cant run without arguments
    category: "moderation",
    execute: async (message, args, client) => {
      try {

        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
          const embed = new MessageEmbed()
          .setTitle("Denied")
          .setDescription("Missing permissions")
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
          .setDescription("You cannot warn bots")
          .setColor(wrong)
          return message.channel.send({
            embeds: [embed],
          })
        }
        if (target.id === message.author.id) {
          const embed = new MessageEmbed()
          .setDescription("You cannot reset warns yourself.")
          .setColor(wrong)
          return message.channel.send({
            embeds: [embed],
          })
        }

        if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1) {
          const embed = new MessageEmbed()
          .setDescription("You cannot remove warns on people higher than you!")
          .setColor(wrong)
          return message.channel.send({
            embeds: [embed],
          })
        }

        db.delete(`warns_${member.guild.id}_${target.id}`)
        db.set(`warns_${member.guild.id}_${target.id}`, 0)
        let x = db.get(`warns_${member.guild.id}_${target.id}`)
        const embed = new MessageEmbed()
        .setDescription(`Successfully reset <@${target.id}>'s warns`)
        .setColor(wrong)
        message.channel.send({
          embeds: [embed],
        })

        try {
          const embed = new MessageEmbed()
          .setDescription(`Your warns in ${message.guild.name} have now been reset, you now have ${x} infractions`)
          .setFooter(`Reason: ${reason}`)
          .setColor(wrong)
          target.send({
            embeds: [embed],
          })
        } catch (err) {
          const embed = new MessageEmbed()
          .setDescription("Could not DM user.")
          .setColor(wrong)
          message.channel.send({
            embeds: [embed],
          })
        }


      } catch (err) {
        console.log(err)

      }
    }

  }
