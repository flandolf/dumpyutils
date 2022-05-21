const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Shows you the info about the bot!"),
  async execute(interaction) {
    const { client } = interaction;
    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**About This Bot**",
          description: "Info **raymond casually accusing of stealing**",
          fields: [
            {
              name: "Bot Version",
              value: "6.9",
            },
            {
              name: "Creator",
              value: "Andy (Dumpy)",
            },
            {
              name: "Bot Since",
              value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
            },
            {
              name: "Bot Website",
              value: "https://dumpyy.xyz",
            },
            {
              name: "Host",
              value: "[Oracle Cloud ARM: 4 Core 24GB Ram](https://cloud.oracle.com)",
            }, 
            
          ],
        },
      ],
    ephemeral: false});
  },
  
};
