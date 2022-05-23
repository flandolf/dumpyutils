const db = require("quick.db")
const warns = new db.table("warns")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "getwarns",
    description: "warn command",
    usage: "<user> <reason>",
    aliases: ["none"],
    data: new SlashCommandBuilder()
        .setName("getwarns")
        .setDescription("Get warns of a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you want to get warns of")

        ),
    async execute(interaction) {
        // retrieve user
        let member = await interaction.options.getUser("user")
        if (!member) {
            interaction.reply({
                embeds: [{
                    title: "Warns",
                    description: fetchWarns().map(warn => `${warn.ID} - ${warn.data}`).join("\n"),
                }]
            })
        } else {
            interaction.reply({
                embeds: [{
                    title: "Warns",
                    description: memberwarns(member.id).toString(),
                }]
            })
        }


    },

}
function fetchWarns() {
    try {
        console.log(warns.all)
        return warns.all()
    } catch {
        return "this person had no warns"
    }
    

}

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