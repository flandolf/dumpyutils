// Deploy Function
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
var AsciiTable = require('ascii-table')
require('dotenv').config();
require('colors')
const commands = [];
var table = new AsciiTable('Commands')
table.setHeading('Name', 'Status')
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    //scan for subdirectories
    const stat = fs.lstatSync(`./commands/${file}`);
    if (stat.isDirectory()) {
        const subFiles = fs.readdirSync(`./commands/${file}`);
        for (const subFile of subFiles) {
            const command = require(`./commands/${file}/${subFile}`);
            commands.push(command.data.toJSON());
            table.addRow(`${command.data.name}`, 'Deployed')
        }
    }
    else {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
        table.addRow(`${command.data.name}`, 'Deployed')
    }
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