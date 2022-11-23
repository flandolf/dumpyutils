const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder().setName("test").setDescription("Test"),
  async execute(interaction) {
    const { client } = interaction;
    await interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**Test**",
          description: "Test",
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
        },
      ],
    });
  },
};
