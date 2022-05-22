const verificationLevels = {
    NONE: "None :yawning_face:",
    LOW: "Low :flushed:",
    MEDIUM: "Medium :angry:",
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
};
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Server's Information!"),
    async execute(interaction) {
        await interaction.reply({
            embeds: [
                {
                    color: "RANDOM",
                    title: "**Server Information**",
                    description: "Here's the server information!",
                    thumbnail: {
                        url: interaction.guild.iconURL({
                            size: 4096,
                            dynamic: true,
                        }),
                    },
                    fields: [
                        {
                            name: "Server Name",
                            value: interaction.guild.name,
                        },
                        {
                            name: "Server ID",
                            value: interaction.guild.id,
                        },
                        {
                            name: "Server Creation Date",
                            value: `<t:${parseInt(
                                interaction.guild.createdTimestamp / 1000
                            )}:R>`,
                        },
                        {
                            name: "Server Verification Level",
                            value: verificationLevels[
                                interaction.guild.verificationLevel
                            ],
                        },
                    ],
                },
            ],
        });
    },
};
