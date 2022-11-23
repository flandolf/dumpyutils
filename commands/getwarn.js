const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("getwarn")
    .setDescription("Get the warns of a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to check how many warns they have")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const user = interaction.options.getUser("user");
    const { QuickDB } = require("quick.db");
    const db = new QuickDB({
      filePath: "./db.sqlite",
      table: `warns_${interaction.guild.id}_${user.id}`,
    });
    // see how many warns they have
    const warns = await db.all();
    const fields = [];
    if (warns.length == 0) {
      return interaction.reply({
        embeds: [
          {
            color: 0xff4816,
            title: "**No warns!**",
            description: `${user.tag} has no warns!`,
          },
        ],
      });
    } else {
      warns.forEach((warn) => {
        const id = warn.id;
        const reason = warn.value;
        console.log(id.toString().split("_")[1]);
        const time = moment(parseInt(id.toString().split("_")[1])).format(
          "MMM Do YYYY, h:mm:ss a"
        );
        fields.push({
          name: `Warn ${id.split("_")[0]}`,
          value: `Reason: ${reason}\nTime: ${time}`,
        });
      });
    }
    return interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title:
            warns == 1
              ? `**${user.tag} has 1 warn!**`
              : `**${user.tag} has ${warns.length} warns!**`,
          description: `Warns for ${user.tag}!`,
          fields: fields,
        },
      ],
    });
  },
};
