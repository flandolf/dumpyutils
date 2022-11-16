const { SlashCommandBuilder } = require("discord.js")
const moment = require('moment')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("cmusage")
        .setDescription("See what the most used commands are!"),
    async execute(interaction) {
        const { client } = interaction;
        const { QuickDB } = require("quick.db")
        const db = new QuickDB({ filePath: "../db.sqlite", table: "commands" })
        const commands = await db.all()
        const sorted = commands.sort((a, b) => b.value - a.value)
        const top = sorted.slice(0, 10)
        await interaction.reply({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**Most used commands**",
                    description: top.map((command, index) => `${index + 1}. ${command.key} - ${command.value} uses`).join("\n"),
                    thumbnail: {
                        url: client.user.displayAvatarURL,
                    },
                    // footer
                    timestamp: moment().format(),
                }
            ]

        })
    },
}