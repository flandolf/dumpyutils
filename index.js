/*
* Name: DumpysUtils
* Version: 2.0.0
* License: MIT
* Author: Andy
* Last Updated: 20/09/2022
*/

const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();
require('colors')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**Error**",
                    description: "An error occured while executing the command.",
                }
            ], ephemeral: true
        });
    }
});

// Deploy Function
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
require('dotenv').config();
var AsciiTable = require('ascii-table')
require('colors')
async function deploy() {
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
deploy()


// Ready Event
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`.rainbow);
    client.user.setPresence({ activities: [{ name: ' fuck this shitty ass djs 14' }], status: 'idle' });
});



client.login(process.env.TOKEN);