const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data:
        new SlashCommandBuilder()
            .setName("ban")
            .setDescription("Ban a user from the server")
            .addUserOption(option => option.setName("user").setDescription("The user to ban").setRequired(true))
            .addStringOption(option => option.setName("reason").setDescription("The reason for the ban").setRequired(false)),
    async execute(interaction) {
        const { client } = interaction;
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            return await interaction.reply({
                embeds: [
                    {
                        color: 0xff4816,
                        title: "**Error!**",
                        description: `You do not have permission to ban members!`,
                    }
                ]
            })
        }

        await interaction.guild.members.ban(user, { reason: reason });
        await interaction.reply({
            embeds: [
                {
                    color: 0xff4816,
                    title: "**Banned**",
                    description: `Banned ${user.tag} from the server!`,
                    fields: [
                        {
                            name: "Reason",
                            value: reason,
                        },
                    ],
                    thumbnail: {
                        url: client.user.displayAvatarURL,
                    },
                },
            ],
        });
    }
}