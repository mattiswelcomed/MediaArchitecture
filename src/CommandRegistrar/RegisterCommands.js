const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { BOT_CLIENT_ID, GUILD_ID, BOT_TOKEN } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName("lyrics").setDescription("Get the lyrics from any Groundbreaking album!")
  .addStringOption(option=>
    option.setName('album').setDescription('Which album are you looking for?').setRequired(true)
    .addChoice("Devastator EP", "Devastator_EP").addChoice("We Are Monsters", "We_Are_Monsters").addChoice("Anarchy", "Anarchy").addChoice("Hurt", "Hurt").addChoice("Anarchy II", "Anarchy_II").addChoice("Insert Genre Here", "Insert_Genre_Here").addChoice("0", "0").addChoice("Blood Sweat Tears", "Blood_Sweat_Tears"))
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