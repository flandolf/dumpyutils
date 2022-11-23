const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("API/BOT ping"),
  async execute(interaction) {
    const { client } = interaction;
    await interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**bot ping again....**",
          description: "BRO WHY TF DO YOU CAREEEE",
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
          fields: [
            {
              name: "API",
              value: `${Math.round(interaction.client.ws.ping)}ms`,
              inline: true,
            },
            {
              name: "BOT",
              value: `${Math.abs(Date.now() - interaction.createdTimestamp)}ms`,
              inline: true,
            },
          ],
        },
      ],
    });
  },
};
