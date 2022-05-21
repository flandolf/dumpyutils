const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("quick.db");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removewarn")
        .setDescription("remove a warning from a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you want to remove a warn(s) from")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("warns")
                .setDescription("The number of the warn(s) you want to remove")
                .setRequired(false)
        ),

    async execute(interaction) {
        // retrieve user
        let member = await interaction.options.getUser("user").fetch(true);
        let warns =
            (await interaction.options.getInteger("warns")) ||
            db.get(`warns_${interaction.guildId}_${member.id}`);
        if (warns == 0) {
            return interaction.reply({
                embeds: [
                    {
                        title: "You can't remove 0 warns!",
                        color: "#F04A47",
                        description: "You can't remove 0 warns. ~~*dumbass*~~",
                    },
                ],
            });
        }
        if (member.bot) {
            return interaction.reply({
                embeds: [
                    {
                        title: "You can't remove warnings from bots!",
                        color: "#F04A47",
                        description: "You can't remove warnings from bots.",
                    },
                ],
            });
        }
        if (
            !interaction.member.permissions.has("BAN_MEMBERS") ||
            !interaction.member.permissions.has("KICK_MEMBERS")
        ) {
            return interaction.followUp({
                embeds: [
                    {
                        title: "You do not have permissions! ⛔",
                        color: embedError,
                        description:
                            "You do not have permissions to remove warnings.",
                    },
                ],
                ephemeral: true,
            });
        }
        var x = db.get(`warns_${interaction.guildId}_${member.id}`);
        db.set(
            `warns_${interaction.guildId}_${member.id}`,
            parseInt(x - warns)
        );
        if (db.get(`warns_${interaction.guildId}_${member.id}`) < 0) {
            db.set(`warns_${interaction.guildId}_${member.id}`, 0);
        }
        interaction.reply({
            embeds: [
                {
                    title: "Warns Removed!",
                    color: "#F04A47",
                    description: `${member.displayName} has had ${warns} warn(s) removed.`,
                },
            ],
        });
    },
};
