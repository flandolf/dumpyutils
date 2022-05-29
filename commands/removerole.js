const Discord = require("discord.js");
const { prefix, colors } = require("../utils/config.json");
const embedColor = colors.default;
const embedError = colors.error;

module.exports = {
  name: "removerole",
  description: "give roles to People",
  aliases: ["rr"],
  usage: "[user] [role name]",
  guildOnly: false,
  args: true,
  execute: async (message, args, client) => {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('Please specify someone to give a role to.')
      return
    }

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

    if (member.roles.cache.get(role.id)) {
      member.roles.remove(role)
      message.reply(`That user no longer has the ${roleName} role`)
    } else {
      message.reply(`That user does not have the ${roleName} role`)
    }
  },
}
