// Deploy Function
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
require('dotenv').config();
require('colors')
const commands = [];
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    //scan for subdirectories
    const stat = fs.lstatSync(`./commands/${file}`);
    if (stat.isDirectory()) {
        const subFiles = fs.readdirSync(`./commands/${file}`)
        for (const subFile of subFiles) {
            const command = require(`./commands/${file}/${subFile}`);
            commands.push(command.data.toJSON());
        }
    }
    else {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

}
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    console.log("Reloading commands...");
    rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
    await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
        .then(() => console.log('Successfully reloaded global application (/) commands.'))
            .catch(console.error);
})();