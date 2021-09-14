const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { BOT_CLIENT_ID, GUILD_ID, BOT_TOKEN } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName("lyrics").setDescription("Get the lyrics from any Groundbreaking album!")
  .addStringOption(option=>
    option.setName('album').setDescription('Which album are you looking for?').setRequired(true)
    .addChoice("Devastator EP", "dev").addChoice("We Are Monsters", "wam").addChoice("Anarchy", "an_one").addChoice("Hurt", "hurt").addChoice("Anarchy II", "an_two"))
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log('-----> Refreshing Slash Commands...');
    

    await rest.put(
      Routes.applicationGuildCommands(BOT_CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('-----> Slash Commands updated!');
  } catch (error) {
    console.error(error);
  }
})();