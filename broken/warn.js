const { SlashCommandBuilder } = require("discord.js")
const moment = require('moment')
const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver
module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warns a user")
        .addUserOption((option) => {
            option
                .setName("user")
                .setDescription("The user to warn")
                .setRequired(true)
        })
        .addStringOption((option) => {
            option
                .setName("reason")
                .setDescription("The reason for the warning")
                .setRequired(false)
        }),
    async execute(interaction) {
        const { client } = interaction;
        const user = await interaction.getOption("user");
        const reason = await interaction.getOption("reason");
        const member = client.guilds.cache.get(interaction.guild.id).members.cache.get(user.id);
        if (!user.bannable) {
            await interaction.reply({
                embeds: [
                    {
                        color: 0xff4816,
                        title: "**Error**",
                        description: "I can't warn that user",
                    }],
            });
            return;
        }
        if (
            interaction.member.roles.highest.position <= member.roles.highest.position
        )
            return interaction.reply({
                embeds: [
                    {
                        color: 0xf04a47,
                        title: "**Error**",
                        description: "You can't ban someone with a role higher than yours!",
                    },
                ],
                ephemeral: true,
            });
        await db.add(`warns_${interaction.guild.id}_${user.id}`, 1)
        await member.send({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**Warning**",
                    description: `You have been warned in ${interaction.guild.name} for ${reason}`,
                    thumbnail: {
                        url: client.user.displayAvatarURL,
                    }
                }
            ]
        }
        );

    },
}
