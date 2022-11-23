const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
const axios = require("axios");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ghstats")
    .setDescription("Github Stats"),
  async execute(interaction) {
    const { client } = interaction;
    async function mostRecentGithubCommit() {
      const { data } = await axios.get(
        "https://api.github.com/repos/dumpydev/dumpyutils/commits"
      );
      // how long ago was the repo last updated?
      const lastUpdated = moment(data[0].commit.author.date).fromNow();
      return `[${data[0].commit.message} by ${data[0].commit.author.name} ${lastUpdated}](${data[0].html_url})`;
    }
    async function githubCreationDate() {
      const { data } = await axios.get(
        "https://api.github.com/repos/dumpydev/dumpyutils"
      );
      return `${moment(data.created_at).format("MMMM Do YYYY")}`;
    }
    async function githubStars() {
      const { data } = await axios.get(
        "https://api.github.com/repos/dumpydev/dumpyutils"
      );
      return `${data.stargazers_count}`;
    }
    await interaction.reply({
      embeds: [
        {
          color: 0x4281f5,
          title: "**Github Stats :octopus:**",
          description: "[github link](https://github.com/dumpydev/dumpyutils)",
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
          fields: [
            {
              name: "Most recent commit",
              value: `${await mostRecentGithubCommit()}`,
            },
            {
              name: "Creation Date",
              value: `${await githubCreationDate()}`,
            },
            {
              name: "Stars",
              value: `${await githubStars()}`,
            },
          ],
        },
      ],
    });
  },
};
