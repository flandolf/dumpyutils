const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask the magic 8ball a question.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Question to ask the magic 8ball.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const question = interaction.options.getString("question");
    const responses = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful.",
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    await interaction.reply({
      embeds: [
        {
          color: 0xff4816,
          title: "**8ball**",
          description: "Ask the magic 8ball a question.",
          fields: [
            {
              name: "Question",
              value: question,
            },
            {
              name: "Answer",
              value: response,
            },
          ],
          timestamp: moment.utc().format(),
        },
      ],
    });
  },
};
