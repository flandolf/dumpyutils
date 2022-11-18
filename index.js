/*
* Name: DumpysUtils
* Version: 2.0.0
* License: MIT
* Author: Andy
* Last Updated: 20/09/2022
*/

const fs = require('node:fs');
const path = require('node:path');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ table: `cmdserved`, filePath: './db.sqlite' });
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const al = require("@dumpy/andylib");
const l = new al.logger();
require('colors')
require('dotenv').config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}


//log whenever a user sends a message
client.on('messageCreate', async message => {
    if (message.author.bot) return; 
    const { author, guild } = message;
    console.log(`${author.username} sent a message in ${guild.name}`.green)
})


client.on('interactionCreate', async (interaction) => {
    // check if the interaction is in a dm
    if (!interaction.guild) return interaction.reply({
        embeds: [
            {
                color: 0xff0000,
                title: 'Error',
                description: 'This bot cannot be used in a DM.',
            }
        ]
    });
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    
    if (!command) return;
    l.info(`Command ${interaction.commandName} was executed by ${interaction.user.username} in ${interaction.guild.name}`)
    await db.add(`served_${interaction.commandName}`, 1);

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

// Ready Event
client.on('ready', () => {
    l.info(`Logged in as ${client.user.tag}!`.rainbow);
    client.user.setPresence({ activities: [{ name: ' with some peanut butter.' }], status: 'online' });
});
client.login(process.env.TOKEN);