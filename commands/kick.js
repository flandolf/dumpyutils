const Discord = require("discord.js");
const { prefix, colors } = require("./../utils/config.json");
const embedColor = colors.default;
const embedError = colors.error;

module.exports = {
	name: 'kick',
	description: 'kick people',
	aliases: ['none'],
	guildOnly: false, //true if only used in server
	args: true, //true if the command cant run without arguments
	usage: '[member]',
	execute: async (message, args, client) => {
        const member = message.mentions.users.first();
        var kick = new Discord.MessageEmbed();
        var kickdm = new Discord.MessageEmbed();
        if (message.member.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR") || message.member.id === '449878966027943936') {
            if (member){
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick();
                if (args[1] == undefined) {
                   kickdm = new Discord.MessageEmbed()
                      .setTitle("You have been kicked! ")
                      .setColor('#304323')
                      .setDescription("No Reason Specified")
                   kick = new Discord.MessageEmbed()
                      .setTitle('Kicked :white_check_mark:')
                      .setColor('#304323')
                      .setDescription(':white_check_mark: ' + "<@" +memberTarget + ">" + ' has been kicked')

                } else {
                   kickdm = new Discord.MessageEmbed()
                      .setTitle("You have been kicked! ")
                      .setColor('#304323')
                      .setDescription("Reason: " + args[1])
                   kick = new Discord.MessageEmbed()
                      .setTitle('Kicked :white_check_mark:')
                      .setColor('#304323')
                      .setDescription(':white_check_mark: ' + "<@" +memberTarget + ">" + ' has been kicked for ' + args[1])
                }
                message.channel.send(kick)
                try {
                    memberTarget.send(kickdm)
                } catch (err) {
                    console.log("Couldn't DM")
                    console.log(err);
                }
                
            } else
            {
              const kickunsuccessful = new Discord.MessageEmbed()
              .setTitle('Kick failed ')
              .setColor('#304323')
              .setDescription(':negative_squared_cross_mark: ' +  "<@" +memberTarget + ">"  + ' couldn\'t be kicked')
              message.channel.send(kickunsuccessful)
            }
            }   else {
          const kicknoperm = new Discord.MessageEmbed()
          .setTitle('Kick failed (No Permissions)')
          .setColor('#304323')
          .setDescription(':negative_squared_cross_mark: ' + member.username + ' couldn\'t be kicked')
          message.channel.send(kicknoperm)
        }
	},
};