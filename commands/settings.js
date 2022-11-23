const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("settings")
    .setDescription("bot settings")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("3warn")
        .setDescription("Choose what to do on 3 warns")
        .addNumberOption((option) =>
          option
            .setName("action")
            .setDescription("1 = kick, 2 = ban, 3 = mute")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const { client } = interaction;
    const { QuickDB } = require("quick.db");
    const db = new QuickDB({
      filePath: "./db.sqlite",
      table: `settings_${interaction.guild.id}`,
    });
    const action = interaction.options.getNumber("action");
    switch (action) {
      case 1:
        await db.set("action", "kick");
        interaction.reply({
          embeds: [
            {
              color: 0xff4816,
              title: "**Settings**",
              description: "Set action to kick",
            },
          ],
        });
        break;
      case 2:
        await db.set("action", "ban");
        interaction.reply({
          embeds: [
            {
              color: 0xff4816,
              title: "**Settings**",
              description: "Set action to ban",
            },
          ],
        });
        break;
      case 3:
        await db.set("action", "mute");
        interaction.reply({
          embeds: [
            {
              color: 0xff4816,
              title: "**Settings**",
              description: "Set action to mute",
            },
          ],
        });
        break;
      case 4:
        await db.set("action", "nothing");
        interaction.reply({
          embeds: [
            {
              color: 0xff4816,
              title: "**Settings**",
              description: "Set action to do nothing",
            },
          ],
        });
        break;
    }
  },
};
