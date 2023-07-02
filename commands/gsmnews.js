const puppeteer = require("puppeteer");

async function fetchGSM() {
  // launch puppeteer
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.gsmarena.com/news.php3");
  // get all the news titles
  const titles = await page.evaluate(() => {
    const news = document.querySelectorAll(".news-item");
    const titles = [];
    news.forEach((item) => {
      titles.push(item.querySelector("h3").innerText);
    });
    return titles;
  });
  const links = await page.evaluate(() => {
    const news = document.querySelectorAll(".news-item");
    const links = [];
    news.forEach((item) => {
      links.push(item.querySelector("a").href);
    });
    return links;
  });
  console.log(titles);
  console.log(links);
  return links.slice(0, 5).map((link, index) => {
    return {
      name: titles[index],
      value: `[Read more](${link})`,
    };
  });
}

const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("fetchnews")
    .setDescription("fetch the latest news from gsmarena"),
  async execute(interaction) {
    const { client } = interaction;
    const fields = await fetchGSM();
    await interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**Latest News**",
          description: "Latest news from gsmarena",
          fields: fields,
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
          footer: {
            text: `Requested by ${interaction.user.tag}, ${moment().format(
              "MMMM Do YYYY, h:mm:ss a"
            )}`,
          },
        },
      ],
    });
  },
};
