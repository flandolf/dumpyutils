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

client.on('messageCreate', async message => {
    console.log(message.content)
})



// Ready Event
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`.rainbow);
    client.user.setPresence({ activities: [{ name: ' with some peanut butter.' }], status: 'idle' });
});



client.login(process.env.TOKEN);