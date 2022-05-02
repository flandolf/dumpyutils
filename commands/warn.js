const { Permissions, MessageEmbed } = require("discord.js")
const db = require("quick.db")


let wrong = "#F04A47"

module.exports = {
    name: 'warn',
    description: 'warn command',
    usage: '<user> <reason>',
    aliases: ['none'],
	  guildOnly: false, //true if only used in server
	  args: true, //true if the command cant run without arguments
    category: "moderation",
    execute: async (message, args, client) => {
      try {

        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
          const embed = new MessageEmbed()
          .setDescription("Missing KICK MEMBERS permission")
          return message.channel.send(embed)
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
          .setDescription("You cannot warn yourself.")
          .setColor(wrong)
          return message.channel.send({
            embeds: [embed],
          })
        }

        if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1) {
          const embed = new MessageEmbed()
          .setDescription("You cannot warn people higher than you!")
          .setColor(wrong)
          return message.channel.send({
            embeds: [embed],
          })
        }

        let reason = args.slice(1).join(" ")

        if(!reason) {
          const embed = new MessageEmbed()
          .setDescription("Please provide a reason")
          .setColor(wrong)
          return message.channel.send({
            embeds: [embed],
          })
        }


        db.add(`warns_${target.id}`, 1)
        var x = db.get(`warns_${target.id}`)

        
        const embed = new MessageEmbed()
        .setDescription(`Successfully warned ${target.username} for reason ${reason}, this user now has ${x} warning(s)`)
        .setColor(wrong)
        message.channel.send({
          embeds: [embed],
        })

        try {
          const embed = new MessageEmbed()
          .setDescription(`You have been warned in ${message.guild.name}, you now have ${x} infractions`)
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
