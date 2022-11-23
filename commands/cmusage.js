const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("cmusage")
    .setDescription("See what the most used commands are!"),
  async execute(interaction) {
    const { client } = interaction;
    const { QuickDB } = require("quick.db");
    const db = new QuickDB({ table: `cmdserved`, filePath: "./db.sqlite" });
    const commands = await db.all();

    const sorted = commands.sort((a, b) => b.value - a.value);
    console.log(sorted);
    const top = sorted.slice(0, 10);
    // remove the served_
    const fields = [
      {
        name: "Command",
        value: "Times Used",
        inline: true,
      },
    ];
    top.forEach((c) => {
      fields.push({
        name: c.id.toString().replace("served_", ""),
        value: c.value.toString(),
        inline: false,
      });
    });
    await interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**Most used commands**",
          fields: fields,
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
          // footer
          timestamp: moment().format(),
        },
      ],
    });
  },
};
