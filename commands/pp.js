const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder().setName("pp").setDescription("pp size lmao"),
  async execute(interaction) {
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    await interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**PP size**",
          description: "PP size machine!",
          fields: [
            {
              name: `8${"=".repeat(random(1, 20))}D`,
            },
          ],
        },
      ],
    });
  },
};
