const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Look up someone's Discord profile information!")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you want to look up")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { client } = interaction;
        const botOwner = client.users.cache.get("449878966027943936").tag;
        let member = await interaction.options.getUser("user").fetch(true);
        interaction.reply({
            embeds: [
                {
                    color: "RANDOM",
                    title: "**User Information**",
                    description: "Here's the user information!",
                    thumbnail: {
                        url: member.displayAvatarURL({
                            size: 4096,
                            dynamic: true,
                        }),
                    },
                    fields: [
                        {
                            name: "Username + Tag",
                            value: member.tag,
                        },
                        {
                            name: "User ID",
                            value: member.id,
                        },
                        {
                            name: "Account Creation Date",
                            value: `<t:${parseInt(
                                member.createdTimestamp / 1000
                            )}:R>`,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: "Dumpy's Utilities",
                    },
                },
            ],
        });
    },
};
