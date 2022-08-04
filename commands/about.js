const { SlashCommandBuilder } = require("discord.js")
const moment = require('moment')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Shows the information about bot"),
    async execute(interaction) {
        const { client } = interaction;
        await interaction.reply({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**About This Bot**",
                    description: "Information about this bot!",
                    thumbnail: {
                        url: client.user.displayAvatarURL,
                      },
                      fields: [
                        {
                          name: "Owner",
                          value: "[dumpy](https://dumpyy.xyz)",
                        },
                        
                        {
                            name: "Hosting",
                            value: "[OCI](https://www.oracle.com/cloud/)",
                        },
                        {
                            name: "Library",
                            value: "[Discord.js v14](https://discord.js.org/#/)",
                        },
                        {
                            name: "Uptime",
                            value: `${moment.duration(client.uptime).format("D [days], H [hours], m [minutes], s [seconds]")}`,
                        }
                      ]
                },
            ]
        })
    },
}