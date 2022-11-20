const { SlashCommandBuilder } = require("discord.js")
const moment = require('moment')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Flip a coin!"),
    async execute(interaction) {
        const { client } = interaction;
        const responses = [
            "Heads",
            "Tails",
        ]
        const response = responses[Math.floor(Math.random() * responses.length)];

        await interaction.reply({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**Coin flip!**",
                    description: "Results: " + response,
                    thumbnail: {
                        url: client.user.displayAvatarURL,
                    },
                }
            ]

        })
    },
}