const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const deploy = async () => {
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log("Started reloading global application (/) commands.");

            await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands });

            console.log("Successfully reloaded global application (/) commands.");
        } catch (error) {
            console.error(error);
        }
    })();
}
module.exports = {
    deploy
}

