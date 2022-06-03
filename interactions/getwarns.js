const db = require("quick.db")
const warns = new db.table("warns")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "getwarns",
    description: "warn command",
    usage: "<user> <reason>",
    aliases: ["none"],
    data: new SlashCommandBuilder()
        /* Creating a slash command. */
        .setName("getwarns")
        .setDescription("Get warns of a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you want to get warns of")

        ),
    /* The code that is executed when the command is run. */
    async execute(interaction) {
        /* Getting the user that the user of the slash command wants to get the warns of. */
        let member = await interaction.options.getUser("user")
        let id = member.id
        if (!member) {
            /* Sending an embed with the title "Warns" and the description of the function
            fetchWarns().map(warn => `${warn.ID} - ${warn.data}`).join("\n") */
            interaction.reply({
                embeds: [{
                    title: "Warns",
                    description: fetchWarns().map(warn => `${warn.ID} - ${warn.data}`).join("\n"),
                }]
            })
        } else {
            /* Sending an embed with the title "Warns for ${member.username}" and the description of
            the function memberwarns(id).toString() */
            interaction.reply({
                embeds: [{
                    title: `Warns for ${member.username}`,
                    description: memberwarns(id).toString(),
                }]
            })
        }


    },

}
/**
 * It returns the warns of a user.
 * @returns the result of the function warns.all()
 */
function fetchWarns() {
    try {
        console.log(warns.all)
        return warns.all()
    } catch {
        return "this person had no warns"
    }
    

}
/**
 * It takes an ID and returns a list of all the warns that have that ID in them.
 * @param id - The ID of the member you want to get the warns of
 * @returns - A list of all the warns that have that ID in them
 */

function memberwarns(id) {
    console.log(id)
    var list = []
    for (var i = 0; i < warns.all().length; i++) {
        var data = warns.all().map(warn => warn.ID)
        if (data[i].includes(id)) {
            console.log(data[i])
            list.push(data[i])
        } else { 
            console.log(data[i])
        }
    }
    console.log(list)
    return list

}