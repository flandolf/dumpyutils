const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to purge.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const amount = interaction.options.getInteger("amount");
    // purge
    await interaction.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);
      interaction.reply({
        embeds: [
          {
            color: 0xff4816,
            title: "**Error**",
            description: "An error occured while purging messages.",
          },
        ],
        ephemeral: true,
      });
    });
  },
};
