const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
require('colors')
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
/*
Thanks to chewey for API.
*/
const cheweyBotAnalyticsAPI = require("discord-bot-analytics");
const customAnalytics = new cheweyBotAnalyticsAPI(
    "b18047df-3a09-4a97-b6ff-6dd5f6c7fd28",
    client
);
client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();
fs.readdir("./commands/", async (err, files) => {
    const commandHandler = require("./handler/commandHandler");
    await commandHandler(err, files, client);
});
fs.readdir("./events/", (err, files) => {
    const eventHandler = require("./handler/eventHandler");
    eventHandler(err, files, client);
});
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`.rainbow);
    client.user.setActivity(`in ${client.guilds.cache.size} servers!`, {
        type: "WATCHING",
    });
});
client.login(process.env.TOKEN);