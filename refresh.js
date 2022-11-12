const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
require('dotenv').config();
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
    console.log("Deleting commands...");
    rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
})()