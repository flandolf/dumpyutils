const Discord = require("discord.js");
const { prefix, colors } = require("./../utils/config.json");
const embedColor = colors.default;
const embedError = colors.error;
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Allows the admin or owner to ban the member.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The person who you want to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason to ban member")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    const user = interaction.options.getUser("user");
    const member =
      interaction.guild.members.cache.get(user.id) ||
      (await interaction.guild.members.fetch(user.id).catch((err) => {}));
    const reason = interaction.options.getString("reason") || "No reason given";

    if (!interaction.member.permissions.has("BAN_MEMBERS"))
      return interaction.followUp({
        embeds: [
          {
            title: "You do not have permissions! ⛔",
            color: embedError,
            description: "You do not have permissions to ban members.",
          },
        ],
        ephemeral: true,
      });
    if (!member)
      return interaction.reply({
        embeds: [
          {
            title: "User not found! ⛔",
            color: embedError,
            description: "The user you specified was not found.",
          },
        ],
      });

    try {
      await member.ban(reason);
      return interaction.reply({
        embeds: [
          {
            title: "Successfully banned member ✅",
            description: `${member.user.tag} has been banned for reason "${reason}"`,
            color: embedColor,
            timestamp: new Date(),
            footer: {
              text: "Dumpy's Utilities",
            },
          },
        ],
      });
    } catch (err) {
      if (err) {
        console.error(err);
        return interaction.reply({
          embeds: [
            {
              title: "An error occured! ⛔",
              color: embedError,
              description: "An error occured while trying to ban the member.",
            },
          ],
        });
      }
    }
  },
};
