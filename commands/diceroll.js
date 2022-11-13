const { SlashCommandBuilder } = require("discord.js")
const moment = require('moment')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("diceroll")
        .setDescription("Dice roll ig?!")
        .addIntegerOption(option => option.setName("number").setDescription("The number of dice to roll").setRequired(false)),
    async execute(interaction) {
        const { client } = interaction;
        let number = interaction.options.getInteger("number")
        if(number == null) { number = 6 }
        const dice = Math.floor(Math.random() * number) + 1
        await interaction.reply({
            embeds: [
                {
                    color: 0x4281f5,
                    title: "**Random dice roll!**",
                    description: `${dice}`,
                    thumbnail: {
                        url: client.user.displayAvatarURL,
                    },
                }
            ]

        })
    },
}

function color2hex(htmlcolor) {
    // convert html color to hex
    htmlcolor = htmlcolor.replace('#', '');
    var r = parseInt(htmlcolor.substring(0, 2), 16);
    var g = parseInt(htmlcolor.substring(2, 4), 16);
    var b = parseInt(htmlcolor.substring(4, 6), 16);
    // return hex 
    return r + g + b;
}