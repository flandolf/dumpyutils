const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const moment = require('moment')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("make a poll!")
        .addStringOption(option => option.setName("question").setDescription("The question to ask.").setRequired(true))
        .addIntegerOption(option => option.setName("time").setDescription("The time in seconds to run the poll for.").setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString("question");
        const time = interaction.options.getInteger("time");
        const btns = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("poll_yes")
                    .setLabel("Yes")
                    .setStyle(3),
                new ButtonBuilder()
                    .setCustomId("poll_no")
                    .setLabel("No")
                    .setStyle(4),
            );

        // create poll
        await interaction.reply({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**Poll**",
                    description: question,
                }

            ],
            components: [btns]
        })

        // on click
        const filter = i => i.customId === 'poll_yes' || i.customId === 'poll_no';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: time * 1000 });
        var yes = 0;
        var no = 0;
        let voted = []
        collector.on('collect', async i => {
            if (voted.includes(i.user.id)) {
                await i.reply({
                    embeds: [
                        {
                            color: 0xff4816,
                            title: "**Error**",
                            description: "You have already voted!",
                        }
                    ], ephemeral: true
                });
            } else {
                voted.push(i.user.id)
            }
            if (i.customId === 'poll_yes') {
                yes++;
                i.reply({
                    content: "You voted yes!",
                    ephemeral: true
                })
            } else if (i.customId === 'poll_no') {
                no++;
                i.reply({
                    content: "You voted no!",
                    ephemeral: true
                })
            }
            interaction.editReply({
                embeds: [{
                    color: 0xff4816,
                    title: "**Poll**",
                    description: question,
                    fields: [
                        {
                            name: "Yes",
                            value: yes,
                            inline: true
                        },
                        {
                            name: "No",
                            value: no,
                            inline: true
                        }],
                }]
            })
        })

        // wait for time
        await new Promise(r => setTimeout(r, time * 1000));

        // end poll
        await interaction.editReply({
            embeds: [{
                color: 0xff4816,
                title: "**Poll Results!**",
                description: `The results for **${question}** are in!`,
                fields: [
                    {
                        name: "Yes",
                        value: yes,
                        inline: true
                    },
                    {
                        name: "No",
                        value: no,
                        inline: true
                    },]
            }],
        })
    },
}