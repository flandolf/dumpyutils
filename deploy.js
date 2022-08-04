const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
require('dotenv').config();
var AsciiTable = require('ascii-table')
require('colors')
const fs = require('node:fs');
const deploy = async () => {
    const commands = [];
    var table = new AsciiTable('Commands')
    table.setHeading('Name', 'Status')
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);

        table.addRow(command.data.name, "Loaded!")
        commands.push(command.data.toJSON());
    }
    console.log(table.toString().rainbow)
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log("Started reloading global application (/) commands.".green);

            await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands });

            console.log("Successfully reloaded global application (/) commands.".rainbow);
        } catch (error) {
            console.error(error);
        }
    })();
}
module.exports = {
    deploy
}

