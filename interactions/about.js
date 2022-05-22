const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Shows you the info about the bot!"),
  async execute(interaction) {
    const { client } = interaction;

    const duration = moment
      .duration(client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    interaction.reply({
      embeds: [
        {
          color: "#00aeff",
          title: "Bot Information :heart:",
          description: "Info about the bot",
          fields: [
            {
              name: "Bot Version:",
              value: "6.9",
            },
            {
              //uptime
              name: "Uptime:",
              value: `${duration}`,
            },
            {
              name: "Servers the bot is in:",
              value: client.guilds.cache.size.toString(),
            },
            {
              name: "Owner:",
              value: "dumpy#6944",
            },
            {
              name: "Github:",
              value: "https://github.com/dumpydev/dumpyutils",
            },
            {
              name: "License:",
              value: "GPL-v3",

            },
          ],
          footer: {
            text: "Dumpy's Utilities",
          },
        },
      ],
      ephemeral: false,
    });
  },
};
