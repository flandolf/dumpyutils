const Discord = require("discord.js");
const { prefix, colors } = require("./../utils/config.json");
const embedColor = colors.default;
const embedError = colors.error;
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Allows the admin or owner to kick the member.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The person who you want to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason to kick member")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    let member = interaction.options.getMember("user");
    let reason = interaction.options.getString("reason") || "No reason given";

    if (!interaction.member.permissions.has("KICK_MEMBERS"))
      return interaction.followUp({
        embeds: [
          {
            title: "You do not have permissions! ⛔",
            color: embedError,
            description: "You do not have permissions to kick members.",
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
      await interaction.guild.members.kick(member, reason);
      return interaction.reply({
        embeds: [
          {
            title: "Successfully kicked member ✅",
            description: `${member.user.tag} has been kicked for reason "${reason}"`,
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
              description: "An error occured while trying to kick the member.",
            },
          ],
        });
      }
    }
  },
};
