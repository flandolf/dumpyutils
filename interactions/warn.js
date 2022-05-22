const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("quick.db");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn the naughtys")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you want to WARN")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for the warning")
                .setRequired(true)
        ),

    async execute(interaction) {
        // retrieve user
        let member = await interaction.options.getUser("user").fetch(true);

        let reason =
            (await interaction.options.getString("reason")) ||
            "No reason given";
        if(member.bot){
            return interaction.reply({
                embeds: [
                    {
                        title: "You can't warn bots!",
                        color: '#F04A47',
                        description: "You can't warn bots.",
                    },
                ],
            });
        }
        if (
            !interaction.member.permissions.has("BAN_MEMBERS") ||
            !interaction.member.permissions.has("KICK_MEMBERS")
        )
            return interaction.followUp({
                embeds: [
                    {
                        title: "You do not have permissions! ⛔",
                        color: embedError,
                        description:
                            "You do not have permissions to warn members.",
                    },
                ],
                ephemeral: true,
            });

        if (!member) {
            return interaction.reply({
                embeds: [
                    {
                        title: "User not found! ⛔",
                        color: embedError,
                        description: "The user you specified was not found.",
                    },
                ],
            });
        }
        if (x == undefined || x == null) {
            db.set(`warns_${interaction.guildId}_${member.id}`, 0);
        }
        db.add(`warns_${interaction.guildId}_${member.id}`, 1);
        var x = db.get(`warns_${interaction.guildId}_${member.id}`);
        var threewarn = db.get(`${interaction.guildId}.3warn`);
        console.log(x);
        if (threewarn === 0 && x >= 3) {
            member.ban(`${reason}`);
            return interaction.reply({
                embeds: [
                    {
                        color: "#F04A47",
                        title: "3 Warn",
                        description: `${target} has been **banned** due to having more (or equal) than 3 warns`,
                    },
                ],
            });
        } else if (threewarn === 1 && x >= 3) {
            member.kick(`${reason}`);
            return interaction.reply({
                embeds: [
                    {
                        color: "#F04A47",
                        title: "3 Warn",
                        description: `${target} has been **kicked** due to having more (or equal) than 3 warns`,
                    },
                ],
            });
        }
        interaction.reply({
            embeds: [
                {
                    title: "Warned!",
                    color: '#F04A47',
                    description: `${member} has been warned!\nThe user now has ${x} warns.`,
                },
            ],
        });

    },
};
