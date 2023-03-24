const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("selfpunish")
    .setDescription("thx raymond - this actually works :p")
    .addStringOption((option) =>
      option
        .setName("subcommand")
        .setDescription("The subcommand to use")
        .addChoices({ name: "ban", value: "ban urself" })
        .addChoices({ name: "kick", value: "kick urself" })
        .addChoices({ name: "mute", value: "mute urself" })
    ),
  async execute(interaction) {
    const { client } = interaction;
    const user = interaction.user;
    const subcommand = interaction.options.getString("subcommand");
    if (subcommand === "ban") {
      await interaction.guild.members.ban(user, {
        reason: "bro u literally wanted to get banned :P",
      });
      user.send({
        embeds: [
          {
            color: 0xff4816,
            title: "**Banned** " + ":skull: ".repeat(5),
            description: `lmao u banned urself rip :skull: go cry in a corner \nunban: https://forms.gle/FutyMgmSzaSrEbQ68`,
          },
        ],
      });
    } else if (subcommand === "kick") {
      await interaction.guild.members.kick(user, {
        reason: "bro u literally wanted to get kicked :P",
      });
      user.send({
        embeds: [
          {
            color: 0xff4816,
            title: "**Kicked** " + ":skull: ".repeat(5),
            description: `lmao u kicked urself rip :skull: go cry in a corner `,
          },
        ],
      });
    } else {
      function d2ms(days) {
        return days * 24 * 60 * 60 * 1000;
      }
      let member = await interaction.guild.members.fetch(user.id);
      member.timeout(d2ms(1), "bro u literally wanted to get muted :P");
      user.send({
        embeds: [
          {
            color: 0xff4816,
            title: "**Muted** " + ":skull: ".repeat(5),
            description: `lmao u muted urself rip :skull: go cry in a corner `,
          },
        ],
      });
    }
    return interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**Self Punish** " + ":skull: ".repeat(5),
          description: `lmao u punished urself rip :skull: go cry in a corner `,
        },
      ],
    });
  },
};
