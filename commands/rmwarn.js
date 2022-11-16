const { SlashCommandBuilder } = require("discord.js")
// paste this where you defined SlashCommandBuilder
const { PermissionFlagsBits } = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rmwarn")
        .setDescription("Remove warns from a user")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName("user").setDescription("The user to warn").setRequired(true))
        .addIntegerOption(option => option.setName("nums").setDescription("The amount of warns to remove").setRequired(false)),
    async execute(interaction) {
        const { client } = interaction;
        const user = interaction.options.getUser("user");
        const nums = interaction.options.getString("nums") || 0;


        const { QuickDB } = require("quick.db");
        const db = new QuickDB({ filePath: "./db.sqlite", table: `warns_${interaction.guild.id}_${user.id}` });
        if (nums != 0) {
            const all = await db.all();
            const toRemove = all.slice(0, nums);
            toRemove.forEach(async (warn) => {
                await db.delete(warn.id);
            })
            return interaction.reply({
                embeds: [
                    {
                        color: 0xff4816,
                        title: `** ${user.tag} has gotten ${nums} warns removed!**`,
                        description: `Removed ${nums} warns from ${user.tag}!`,
                        thumbnail: {
                            url: client.user.displayAvatarURL,
                        },
                    }
                ]
            })
        } else {
            await db.deleteAll()
            return interaction.reply({
                embeds: [
                    {
                        color: 0xff4816,
                        title: `** ${user.tag} has gotten all warns removed!**`,
                        description: `Removed all warns from ${user.tag}!`,
                        thumbnail: {
                            url: client.user.displayAvatarURL,
                        },
                    }
                ]
            })

        }


    },
}