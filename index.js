/* It's importing the required modules. */
const al = require('@dumpy/andylib')
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
/* Creating a new collection for the commands, aliases, and interactions. */
client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();
al.log("Loading commands...");
fs.readdir("./commands/", async (err, files) => {
    const commandHandler = require("./handler/commandHandler");
    await commandHandler(err, files, client);
});
fs.readdir("./events/", (err, files) => {
    const eventHandler = require("./handler/eventHandler");
    eventHandler(err, files, client);
});
/* Setting the bot's activity to "Watching over X servers" */
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`.rainbow);
    client.user.setActivity(`over ${client.guilds.cache.size} servers! | /help | -help`, {
        type: "WATCHING",
    });
});
client.on("messageCreate", async (message) => {

    if (message.author.bot) return;
    al.log(`Message received from ${message.author.tag} in #${message.channel.name}`, "success");

})
al.log("Bot is now running!", "info");
client.login(process.env.TOKEN);