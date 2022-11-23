const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
const { QuickDB } = require("quick.db");
const axios = require("axios");
const db = new QuickDB({ table: `cmdserved`, filePath: "./db.sqlite" });

function getVer() {
  return require("../package.json").version;
}
async function getMsgServed() {
  const msg = await db.all();
  let total = 0;
  msg.forEach((m) => {
    total += m.value;
  });
  return total;
}

async function mostRecentGithubCommit() {
  const { data } = await axios.get(
    "https://api.github.com/repos/dumpydev/dumpyutils/commits"
  );
  // how long ago was the repo last updated?
  const lastUpdated = moment(data[0].commit.author.date).fromNow();
  return `[${data[0].commit.message} by ${data[0].commit.author.name} ${lastUpdated}](${data[0].html_url})`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Shows the information about bot"),
  async execute(interaction) {
    const { client } = interaction;
    const uptime = (client) => {
      const time = moment.duration(client.uptime, "milliseconds");
      return `${time.hours()} hours, ${time.minutes()} minutes, ${time.seconds()} seconds`;
    };
    await interaction.reply({
      embeds: [
        {
          color: 0x4281f5,
          title: "**About this bot.....**",
          description: "Why do you care lmfao :skull:",
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
          fields: [
            {
              name: "Creator",
              value: "[dumpy](https://dumpyy.xyz)",
            },

            {
              name: "Hosting",
              value: "[OCI](https://www.oracle.com/cloud/)",
            },
            {
              name: "Library",
              value: "[Discord.js v14](https://discord.js.org/#/)",
            },
            {
              name: "Version",
              value: `${getVer()}`,
            },
            {
              name: "Servers",
              value: `${client.guilds.cache.size}`,
            },
            {
              name: "Commands served (lifetime)",
              value: `${await getMsgServed()}`,
            },
            {
              name: "Most recent commit",
              value: `${await mostRecentGithubCommit()}`,
            },
            {
              name: "Uptime",
              value: `${uptime(client)}`,
            },
          ],
        },
      ],
    });
  },
};
