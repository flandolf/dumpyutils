const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("calculate the ping on the bot."),
    async execute(interaction) {
        const { client } = interaction;
        await interaction.reply({
            embeds: [
                {
                    color: "#0099ff",
                    title: "Ping test",
                    description: "Pinging...",
                },
            ],
        });
        await interaction.editReply({
            embeds: [
                {
                    color: "RANDOM",
                    title: "Ping test",
                    description: "Pinged!",
                    fields: [
                        {
                            name: "BOT PING",
                            value: `${Math.abs(Date.now() - interaction.createdTimestamp)}ms`,
                        },
                        {
                            name: "API PING",
                            value: `${Math.round(client.ws.ping)}ms`,
                        },
                    ],
                },
            ],
        });
    },
};