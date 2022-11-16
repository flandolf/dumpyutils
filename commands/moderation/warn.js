const { SlashCommandBuilder } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a user")
        .addUserOption(option => option.setName("user").setDescription("The user to warn").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for the warn").setRequired(true)),
    async execute(interaction) {
        const { client } = interaction;
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const { QuickDB } = require("quick.db")
        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            return interaction.reply({
                content: "You don't have permissions to warn users!",
                ephemeral: true
            })
        }
        const db = new QuickDB({filePath: "../db.sqlite", table: "warns"})
        const warns = await db.get(`${user.id}_${interaction.guild.id}`)
        if (warns == null) {
            await db.set(`${user.id}_${interaction.guild.id}`, 1)
        } else {
            await db.set(`${user.id}_${interaction.guild.id}`, warns + 1)
        }
        
        return interaction.reply({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**Member warned!**",
                    description: `Warned ${user.tag} for ${reason}! They now have ${warns + 1} warns!`,
                    thumbnail: {
                        url: client.user.displayAvatarURL,
                    },
                }
            ]
        })
    },
}