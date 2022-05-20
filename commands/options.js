const { Permissions, MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "options",
  description: "Options command",
  aliases: [],
  usage: "",
  guildOnly: false,
  args: false,
  permissions: {
    bot: [],
    user: [],
  },
  execute: (message, args, client) => {
    if (args[0] === "help" || !args[0]) {
      return message.channel.send({
        embeds: [
          {
            color: "#F04A47",
            title: "Options",
            description: "This is a list of options for the bot! \n `3warn`",
          },
        ],
      });
    }
    switch (args[0]) {
      case "3warn":
        if (
          !message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) ||
          !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
        ) {
          return message.channel.send({
            embeds: [
              {
                color: "#F04A47",
                title: "Missing KICK MEMBERS permission",
                description:
                  "You need to have the KICK MEMBERS / ADMINISTRATOR permission to use this command!",
              },
            ],
          });
        } else {
          switch (args[1]) {
            case "kick":
              db.set(`${message.guild.id}.3warn`, 0);
              return message.channel.send({
                embeds: [
                  {
                    color: "#F04A47",
                    title: "3 Warn",
                    description: "You have set the 3 warn to kick",
                  },
                ],
              });
            case "ban":
              db.set(`${message.guild.id}.3warn`, 1);
              return message.channel.send({
                embeds: [
                  {
                    color: "#F04A47",
                    title: "3 Warn",
                    description: "You have set the 3 warn to ban",
                  },
                ],
              });
            case "nothing":
              db.set(`${message.guild.id}.3warn`, 2);
              return message.channel.send({
                embeds: [
                  {
                    color: "#F04A47",
                    title: "3 Warn",
                    description: "You have set the 3 warn to nothing",
                  },
                ],
              });
            default:
              return message.channel.send({
                embeds: [
                  {
                    color: "#F04A47",
                    title: "3 Warn",
                    description:
                      `Please provide a valid option (kick, ban, nothing)\n Currently set to ${db.get(`${message.guild.id}.3warn`)}`,
                  },
                ],
              });
          }
        }
    }
  },
};
