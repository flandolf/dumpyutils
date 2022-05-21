const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Simon Says....")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text you want to repeat")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    let text = await interaction.options.getString("text");
    interaction.reply({
      embeds: [{
          fields: [{
            name: '**Simon Says**',
            value: text,
          }]
      }],
    });
  },
};
