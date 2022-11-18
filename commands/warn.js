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
        const db = new QuickDB({ filePath: "./db.sqlite", table: `warns_${interaction.guild.id}_${user.id}` });
        const settings = new QuickDB({ filePath: "./db.sqlite", table: `settings_${interaction.guild.id}` });
        // see how many warns they have
        const warns = await db.all() || [];
        // add a new warn
        await db.set(`${warns.length + 1}_${moment.now()}`, reason);
        console.log(moment.now())

        const threewarn = await settings.get("action")
        if (warns.length >= 2) {
            switch (threewarn) {
                case "kick":
                    await interaction.guild.members.kick(user, { reason: reason });
                    await db.deleteAll()
                    await interaction.reply({
                        embeds: [
                            {
                                color: 0xff4816,
                                title: "**Kicked**" + ":skull: ".repeat(5),
                                description: `Kicked <@${user.id}> from the server! lmao rip :skull:`,
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
                    await client.users.send(user.id, {
                        embeds: [
                            {
                                color: 0xff4816,
                                title: "**3 Warn - Kicked**" + ":skull: ".repeat(5),
                                description: `You have been kicked for breaking the rules.`
                            }
                        ]
                    })
                    break;
                case "ban":
                    await interaction.guild.members.ban(user, { reason: reason });
                    // reset warns
                    await db.deleteAll();
                    await interaction.reply({
                        embeds: [
                            {
                                color: 0xff4816,
                                title: "**3 Warn - Banned**" + ":skull: ".repeat(5),
                                description: `Banned <@${user.id}> from the server! lmao rip :skull:`,
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
                    await client.users.send(user.id, {
                        embeds: [
                            {
                                color: 0xff4816,
                                title: "**3 Warn - Muted**" + ":skull: ".repeat(5),
                                description: `You have been muted for 3 days for breaking the rules.`
                            }
                        ]
                    })
                    break;
                case "mute":
                    function daystoms(days) {
                        return days * 86400000;
                    }
                    // timeout user
                    let member = await interaction.guild.members.fetch(user.id)
                    member.timeout(daystoms(3), "Breaking the rules")
                    await interaction.reply({
                        embeds: [
                            {
                                color: 0xff4816,
                                title: "**3 Warn - Muted**" + ":skull: ".repeat(5),
                                description: `Muted <@${user.id}> from the server! lmao rip :skull:`,
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
                    await client.users.send(user.id, {
                        embeds: [
                            {
                                color: 0xff4816,
                                title: "**3 Warn - Muted**" + ":skull: ".repeat(5),
                                description: `You have been muted for 7 days for breaking the rules.`
                            }
                        ]
                    })
                    break;
                case "nothing":
                    interaction.reply({
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
                    break;
            }
            
        } else {
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
        }
    },
}