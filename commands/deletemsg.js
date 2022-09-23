const {SlashCommandBuilder} = require("discord.js");
const moment = require('moment');
const {QuickDB} = require('quick.db');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("deletemsg")
        .setDescription("Delete a message from the database")
        .addStringOption(option => option.setName("title").setDescription("The title of the message").setRequired(false)),
    async execute(interaction) {
        const {client} = interaction;
        const title = interaction.options.getString("title")
        if (title == '' || title == null) {
            const db = new QuickDB({table: `msgs_${interaction.user.id}`, filePath: './db.sqlite'});
            await db.deleteAll()
            await interaction.reply(
                {
                    embeds: [
                        {
                            color: 0xff4816,
                            title: "**Messages Deleted**",
                            description: `All messages deleted from the database!`,
                            thumbnail: {
                                url: client.user.displayAvatarURL,
                            },
                        },
                    ]
                })
        } else {
            const db = new QuickDB({table: `msgs_${interaction.user.id}`, filePath: './db.sqlite'});
            await db.delete(title)
            await interaction.reply(
                {
                    embeds: [
                        {
                            color: 0xff4816,
                            title: "**Message Deleted**",
                            description: `Message deleted from the database!`,
                            thumbnail: {
                                url: client.user.displayAvatarURL,
                            },
                        },
                    ]
                })
        }
    }
}