const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to mute.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("The duration of the mute in minutes.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the mute.")
        .setRequired(false)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const user = interaction.options.getUser("user");
    const duration = interaction.options.getInteger("duration");
    const reason =
      interaction.options.getString("reason") || "No reason given.";
    const guild = interaction.guild;
    const member = guild.members.cache.get(user.id);

    await member.timeout(duration * 60 * 1000, { reason: reason });

    await interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**User Muted**",
          description: `<@${user.id}> has been muted for ${duration} minutes.\nReason: ${reason}`,
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
          footer: {
            text: `Muted by ${interaction.user.tag} at ${moment().format("h:mm:ss a")}`,
          }
        },

      ],
    });
  },
};
