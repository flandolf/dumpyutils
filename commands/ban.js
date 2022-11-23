const { SlashCommandBuilder } = require("discord.js");
// paste this where you defined SlashCommandBuilder
const { PermissionFlagsBits } = require("discord-api-types/v10");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban")
        .setRequired(false)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    if (!interaction.member.permissions.has("BAN_MEMBERS")) {
      return await interaction.reply({
        embeds: [
          {
            color: 0xff4816,
            title: "**Error!**",
            description: `You do not have permission to ban members!`,
          },
        ],
      });
    }

    await interaction.guild.members.ban(user, { reason: reason });
    await interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**Banned**" + ":skull: ".repeat(5),
          description: `Banned <@${user.id}> from the server! lmao rip :skull:`,
          fields: [
            {
              name: "Reason",
              value: reason,
            },
          ],
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
        },
      ],
    });
  },
};
