const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("quick.db");
const warns = new db.table("warns");

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
                .setName("amount")
                .setDescription("The number of the warn(s) you want to remove")
                .setRequired(false)
        ),

    async execute(interaction) {
        // retrieve user
        let member = await interaction.options.getUser("user").fetch(true);
        let amount = (await interaction.options.getInteger("warns")) ||
        warns.get(`warns_${interaction.guildId}_${member.id}`);
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
        try {
            var x = warns.get(`warns_${interaction.guildId}_${member.id}`);
            warns.set(
                `warns_${interaction.guildId}_${member.id}`,
                parseInt(x - amount)
            );
            if (warns.get(`warns_${interaction.guildId}_${member.id}`) < 0) {
                warns.set(`warns_${interaction.guildId}_${member.id}`, 0);
            }
            console.log(member);
            interaction.reply({
                embeds: [
                    {
                        title: "Warns Removed!",
                        color: "#F04A47",
                        description: `${member.username}#${member.discriminator} has had ${amount} warn(s) removed.`,
                    },
                ],
            });
        } catch (err) {
            console.log(err);
            interaction.reply({
                embeds: [
                    {
                        title: "An error occured! ⛔",
                        color: "#F04A47",
                        description:
                            "An error occured while trying to remove warns.",
                    },
                ],
            });
        }
    },
};
