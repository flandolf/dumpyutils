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
                    color: 0x426cf5,
                    title: "**Poll**",
                    description: question,
                    fields: [
                        {
                            name: "Votes for yes: ",
                            value: 0,
                            inline: true
                        },
                        {
                            name: "Votes for no: ",
                            value: 0,
                            inline: true
                        }
                    ],
                }

            ],
            components: [btns]
        })

        // on click
        const filter = i => i.customId === 'poll_yes' || i.customId === 'poll_no';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: time * 1000 });
        var yes = 0;
        var no = 0;
        let votedyes = []
        let votedno = []
        collector.on('collect', async i => {
            if (i.customId === 'poll_yes') {
                if (votedyes.includes(i.user.id)) {
                    await i.reply({ content: 'You already voted yes!', ephemeral: true })
                }
                if (votedno.includes(i.user.id) && !votedyes.includes(i.user.id)) {
                    // switch vote
                    votedno.splice(votedno.indexOf(i.user.id), 1)
                    votedyes.push(i.user.id)
                    yes++
                    no--
                    i.reply({ content: 'Switched vote to yes!', ephemeral: true })
                } else if (!votedyes.includes(i.user.id) && !votedno.includes(i.user.id)) {
                    votedyes.push(i.user.id)
                    yes++
                    i.reply({ content: 'Voted yes!', ephemeral: true })
                }
            } else if (i.customId === 'poll_no') {
                if (votedno.includes(i.user.id)) {
                    await i.reply({ content: 'You already voted no!', ephemeral: true })
                }
                if (!votedno.includes(i.user.id) && votedyes.includes(i.user.id)) {
                    // switch vote
                    votedyes.splice(votedyes.indexOf(i.user.id), 1)
                    votedno.push(i.user.id)
                    yes--
                    no++
                    i.reply({ content: 'Switched vote to no!', ephemeral: true })
                } else if (!votedno.includes(i.user.id) && !votedyes.includes(i.user.id)) {
                    votedno.push(i.user.id)
                    no++
                    i.reply({ content: 'Voted no!', ephemeral: true })
                }
            }
            interaction.editReply({
                embeds: [
                    {
                        color: 0x426cf5,
                        title: "**Poll**",
                        description: question,
                        fields: [
                            {
                                name: "Votes for yes: ",
                                value: yes,
                                inline: true
                            },
                            {
                                name: "Votes for no: ",
                                value: no,
                                inline: true
                            }
                        ],
                    }
                ]
            })

        })

        // constantly update poll 
        await setInterval(async () => {
            interaction.editReply({
                embeds: [
                    {
                        color: 0x426cf5,
                        title: "**Poll**",
                        description: question,
                        fields: [
                            {
                                name: "Votes for yes: ",
                                value: yes,
                                inline: true
                            },
                            {
                                name: "Votes for no: ",
                                value: no,
                                inline: true
                            }
                        ],
                        footer: {
                            text: `Poll ends in ${moment(moment.duration(time * 1000 - collector.collected.size * 1000)).format('h [hours], m [minutes], s [seconds]')}`
                        }
                    }
                ]
            })
        }, 100)
        collector.on('end', async collected => {
            // end poll
            await interaction.editReply({
                embeds: [{
                    color: 0x426cf5,
                    title: "**Poll Results!**",
                    description: `The results for **"${question}"** are in!`,
                    fields: [
                        {
                            name: "Votes for yes: ",
                            value: yes,
                            inline: true
                        },
                        {
                            name: "Votes for no: ",
                            value: no,
                            inline: true
                        },]
                }],
                components: []
            })
        })
    },
}