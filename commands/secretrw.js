const { Permissions, MessageEmbed } = require("discord.js")
const db = require("quick.db")
let wrong = "#F04A47"
  module.exports = {
    name: 'secretrw',
    description: 'remove warn command (sec)',
    usage: '<user> <reason>',
    aliases: ['srw'],
	  guildOnly: false, //true if only used in server
	  args: true, //true if the command cant run without arguments
    category: "moderation",
    execute: async (message, args, client) => {
        const target = message.mentions.users.first()
        if(!target) {
          const embed = new MessageEmbed()
          .setDescription("Mention a member please.")
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
            try {
                target.send({
                    embeds: [embed],
                  })
            } catch (err) {
                message.channel.send('E')
            }
            
        }
        
    }
