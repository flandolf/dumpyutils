const { SlashCommandBuilder } = require("discord.js")
const moment = require('moment')
const { QuickDB } = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("send")
        .setDescription("Send a message to a the database")
        .addStringOption(option => option.setName("message").setDescription("The message to send").setRequired(true))
        .addStringOption(option => option.setName("title").setDescription("The title of the message").setRequired(true)),
    async execute(interaction) {
        
        const { client } = interaction;
        const message = interaction.options.getString("message")
        const user = interaction.user.id
        const title = interaction.options.getString("title")
        const time = moment().format('MMMM Do YYYY, h:mm:ss a')
        const msgs = new QuickDB({table: `msgs_${user}`, filePath: './db.sqlite'});
        await msgs.push(`${title}`, `${message}`)

        await interaction.reply(
            {
                embeds: [
                    {
                        color: 0xff4816,
                        title: "**Message Sent**",
                        description: `Message sent to the database!`,
                        thumbnail: {
                            url: client.user.displayAvatarURL,
                        },
                        fields: [
                            {
                                name: "Message",
                                value: `${message}`,
                                inline: true,
                            },
                            {
                                name: "Title",
                                value: `${title}`,
                                inline: true,
                            },
                            {
                                name: "Time",
                                value: `${time}`,
                                inline: true,
                            },
                            
                        ]
                    },
                ]
            }
        )
    },
}