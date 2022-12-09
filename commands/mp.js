const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("multipoll")
    .setDescription("Custom Polls!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question to ask.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("options")
        .setDescription("The options to choose from. Separate with commas.")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("hidden")
        .setDescription("Hide the results of the poll until the end.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The time in seconds to run the poll for.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const question = interaction.options.getString("question");
    const options = interaction.options.getString("options");
    const time = interaction.options.getInteger("time");
    const hidden = interaction.options.getBoolean("hidden");

    const optionsArray = options.split(",");
    // assign a random emoji to each option
    const emojis = ["😊", "😂", "😍", "😘", "😎", "😡", "😱", "🤔", "🤣"];

    if (optionsArray.length > emojis.length) {
      return await interaction.reply({
        embeds: [
          {
            color: 0xff4816,
            title: "**Error**",
            description: "Too many options! Please try again.",
            footer: {
              text: `Requested by ${interaction.user.tag}`,
            },
          },
        ],
      });
    }
    let optionemoji = [];
    for (let i = 0; i < optionsArray.length; i++) {
      optionemoji.push({
        emoji: emojis[i],
        option: optionsArray[i],
        votes: 0,
      });
    }

    const message = await interaction.reply({
      embeds: [
        {
          color: 0x426cf5,
          title: "**Poll**",
          description: question,
          fields: optionemoji.map((option) => {
            return {
              name: `${option.emoji} ${option.option}`,
              value: hidden ? "Hidden" : option.votes,
              inline: true,
            };
          }),
        },
      ],
      fetchReply: true,
    });
    // assign reactions
    for (let i = 0; i < optionemoji.length; i++) {
      await message.react(optionemoji[i].emoji);
    }
    // wait for reactions
    const filter = (reaction, user) => {
      return (
        optionemoji.some((option) => option.emoji === reaction.emoji.name) &&
        !user.bot
      );
    };
    const collector = message.createReactionCollector(filter, {
      time: time * 1000,
    });
    collector.on("collect", (reaction, user) => {
      console.log(reaction.emoji.name);
      const option = optionemoji.find(
        (option) => option.emoji === reaction.emoji.name
      );
      option.votes++;
      interaction.editReply({
        embeds: [
          {
            color: 0x426cf5,
            title: "**Poll**",
            description: question,
            fields: optionemoji.map((option) => {
              return {
                name: `${option.emoji} ${option.option}`,
                value: hidden ? "Hidden" : option.votes,
                inline: true,
              };
            }),
          },
        ],
      });
    });
    collector.on("end", (collected) => {
      interaction.editReply({
        embeds: [
          {
            color: 0x426cf5,
            title: "**Poll**",
            description: question,
            fields: optionemoji.map((option) => {
              return {
                name: `${option.emoji} ${option.option}`,
                value: option.votes,
                inline: true,
              };
            }),
          },
        ],
      });
      // remove the reactions
      interaction.message.reactions.removeAll();
    });
  },
};
