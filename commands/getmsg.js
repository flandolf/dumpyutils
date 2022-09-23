const { SlashCommandBuilder } = require("discord.js");
const moment = require('moment');
const { QuickDB } = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getmsg")
        .setDescription("Get a message from the database"),
    async execute(interaction) {
        const { client } = interaction;
        const user = interaction.user.id
        const time = moment().format('MMMM Do YYYY, h:mm:ss a')
        const msgs = new QuickDB({ table: `msgs_${user}`, filePath: './db.sqlite' });
        const msg = await msgs.all()
        const fields = [

        ]
        msg.forEach((m) => {
            fields.push({
                name: m.id.toString(),
                value: m.value.toString(),
                inline: true,
            })
        })
        await interaction.reply(
            {
                embeds: [
                    {
                        color: 0xff4816,
                        title: "**Messages**",
                        description: `Messages from the database!`,
                        thumbnail: {
                            url: client.user.displayAvatarURL,
                        },
                        fields: fields
                    },
                ]
            }
        )
    }
}