const {BOT_TOKEN, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY} = require('./config.json');

const AWS = require('aws-sdk');
const { Client, Intents, MessageActionRow, MessageSelectMenu, Permissions} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const version = "1.0.0 BETA"


client.on('ready', () => {
    if (version.includes("BETA"))
    {
        client.user.setPresence({activities: [{name: "with beta features!"}], status: 'dnd'});
        console.log(`-----> WARNING: This is a beta version. Status set to Do Not Disturb.`);
    } else {
        client.user.setPresence({status: 'online'});
    }

    console.log(`-----> ${client.user.username} is online.`);
});


client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName == 'lyrics')
        {
            gb_works = 
            {
                'dev':[
                    {label: 'Faker', value: "faker.txt"}, {label:'Synthetic', value:"synthetic.txt"}, {label:'Breathe', value:"breathe.txt"}, {label: 'Crank', value:"crank.txt"}, {label: 'Devastator', value:"devastator.txt"}
                ],
                'wam':[
                    {label: 'We Are Monsters', value: 'we_are_monsters.txt'}, {label: 'Adrenaline', value: 'adrenaline.txt'}, {label: 'Fantasy', value: 'fantasy.txt'},
                    {label: 'No I Don\'t', value: 'no_i_dont.txt'}, {label: 'Mirage', value: 'mirage.txt'}, {label: 'Continuum', value: 'continuum.txt'},
                    {label: 'My Machine', value: 'my_machine.txt'}, {label: 'House Divine', value: 'house_divine.txt'}, {label: 'Party Riot', value: 'party_riot.txt'},
                    {label: 'Broken', value: 'broken.txt'}],
                'an_one':[
                    {label: 'Media Star', value: 'media_star.txt'}, {label: 'United Alliance of Justice and Prosperity', value: 'united_alliance_of_justice_and_prosperity.txt'}, {label: 'New City', value: 'new_city.txt'},
                    {label: 'Code: Red', value: 'code_red.txt'}, {label: 'Anarchy', value: 'anarchy.txt'}, {label: 'Betrayal', value: 'betrayal.txt'},
                    {label: 'Fireworks', value: 'fireworks.txt'}, {label: 'Nightmares', value: 'nightmares.txt'}, {label: 'Shell', value: 'shell.txt'},
                    {label: 'As We Fall', value: 'as_we_fall.txt'}],
                'hurt':[{label: 'Hurt', value: 'hurt.txt'}, {label: 'Outcast', value: 'outcast.txt'}, {label: 'Standoff', value: 'standoff.txt'}, {label: 'Real Boy', value: 'real_boy.txt'},
                {label: 'No More Me', value: 'no_more_me.txt'}, {label: 'Destined', value: 'destined.txt'}, {label: 'Save Me', value: 'save_me.txt'}, {label: 'Break Me', value: 'break_me.txt'},
                {label: 'Get Low', value: 'get_low.txt'}, {label: 'Mechanical', value: 'mechanical.txt'}, {label: 'No Control', value: 'no_control.txt'}, {label: 'The Lie', value: 'the_lie.txt'},
                {label: 'Down', value: 'down.txt'}, {label: 'Echoes', value: 'echoes.txt'}]
            };

            album_names = 
            {
                "dev":"Devastator EP",
                "wam":"We Are Monsters",
                "an_one":"Anarchy",
                "hurt":"Hurt"
            }

            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('lyrics_menu')
                    .setPlaceholder('Tap here!')
                    .addOptions(Array.from(gb_works[interaction.options.data[0].value])),
            );

            interaction.reply({content:`Select a song from **${album_names[interaction.options.data[0].value]}**!`, components:[row]});
        }
    } else if (interaction.isSelectMenu())
    {
        s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey:AWS_SECRET_ACCESS_KEY
        
        });

        object = s3.getObject({
            Bucket:"ground-zero-discord",
            Key: interaction.values[0]
        }, function(err, data) {
            if (err) {
                interaction.reply(`This part is still in the works! Thanks for your interest, ${interaction.member.toString()}!`);
                console.log(`-----> Something went wrong.\n${err}`)
            }
            else {
                interaction.reply(`\`\`\`${interaction.values[0].split('_').join(' ').replace(".txt", "").toUpperCase()} BY GROUNDBREAKING\n\n${data.Body.toString()}\`\`\``)
            }
        });
    };
});


client.login(BOT_TOKEN);