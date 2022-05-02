const Discord = require("discord.js");
const { prefix, colors } = require("../utils/config.json");
const embedColor = colors.default;
const embedError = colors.error;

module.exports = {
  name: "giverole",
  description: "give roles to People",
  aliases: ["gr"],
  usage: "[role name]",
  guildOnly: false,
  args: true,
  execute: async (message, args, client) => {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('Please specify someone to give a role to.')
      return
    }
    if(targetUser == message.author) return;

    args.shift()

    const roleName = args.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      message.reply(`There is no role with the name "${roleName}"`)
      return
    }

    const member = guild.members.cache.get(targetUser.id)
    member.roles.add(role)

    message.reply(`That user now has the "${roleName}" role`)
  },
}
