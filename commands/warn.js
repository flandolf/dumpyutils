const { SlashCommandBuilder } = require("discord.js")
// paste this where you defined SlashCommandBuilder
const { PermissionFlagsBits } = require("discord-api-types/v10");
const moment = require('moment')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a user")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName("user").setDescription("The user to warn").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for the warn").setRequired(true)),
    async execute(interaction) {
        const { client } = interaction;
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const { QuickDB } = require("quick.db");
        const db = new QuickDB({filePath: "./db.sqlite", table: `warns_${interaction.guild.id}_${user.id}`});
        // see how many warns they have
        const warns = await db.all() || [];
        // add a new warn
        await db.set(`${warns.length + 1}_${moment.now()}`, reason);
        console.log(moment.now())
        return interaction.reply({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**Member warned!**",
                    description: `Warned ${user.tag} for ${reason}! They now have ${warns.length + 1} warns!`,
                    thumbnail: {
                        url: client.user.displayAvatarURL,
                    },
                }
            ]
        })
    },
}