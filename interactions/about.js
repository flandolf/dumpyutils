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
          description: "The information about this bot!",
          // thumbnail: {
          //   url: client.user.displayAvatarURL,
          // },
          fields: [
            {
              name: "Bot Version",
              value: "idk",
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
              name: "Creator",
              value: "Andy (Dumpy)",
            },
            {
              name: "Host",
              value: "[Oracle Cloud E2 Micro](https://cloud.oracle.com)",
            }, 
            {
              name: "Library",
              value: "[Discord.js](https://discord.js.org/) ",
            },
          ],
        },
      ],
    ephemeral: false});
  },
};
