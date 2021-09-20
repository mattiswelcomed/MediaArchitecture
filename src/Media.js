const {BOT_TOKEN, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY} = require('./config.json');

const AWS = require('aws-sdk');
const { Client, Intents, MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js');
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
                'Devastator_EP':[
                    {label: 'Faker', value: "faker.txt"},
                    {label:'Synthetic', value:"synthetic.txt"},
                    {label:'Breathe', value:"breathe.txt"},
                    {label: 'Crank', value:"crank.txt"},
                    {label: 'Devastator', value:"devastator.txt"}],
                'We_Are_Monsters':[
                    {label: 'We Are Monsters', value: 'we_are_monsters.txt'},
                    {label: 'Adrenaline', value: 'adrenaline.txt'},
                    {label: 'Fantasy', value: 'fantasy.txt'},
                    {label: 'No I Don\'t', value: 'no_i_dont.txt'},
                    {label: 'Mirage', value: 'mirage.txt'},
                    {label: 'Continuum', value: 'continuum.txt'},
                    {label: 'My Machine', value: 'my_machine.txt'},
                    {label: 'House Divine', value: 'house_divine.txt'},
                    {label: 'Party Riot', value: 'party_riot.txt'},
                    {label: 'Broken', value: 'broken.txt'}],
                'Anarchy':[
                    {label: 'Media Star', value: 'media_star.txt'},
                    {label: 'United Alliance of Justice and Prosperity', value: 'united_alliance_of_justice_and_prosperity.txt'},
                    {label: 'New City', value: 'new_city.txt'},
                    {label: 'Code: Red', value: 'code_red.txt'},
                    {label: 'Anarchy', value: 'anarchy.txt'},
                    {label: 'Betrayal', value: 'betrayal.txt'},
                    {label: 'Fireworks', value: 'fireworks.txt'},
                    {label: 'Nightmares', value: 'nightmares.txt'},
                    {label: 'Shell', value: 'shell.txt'},
                    {label: 'As We Fall', value: 'as_we_fall.txt'}],
                'Hurt':[
                    {label: 'Hurt', value: 'hurt.txt'},
                    {label: 'Outcast', value: 'outcast.txt'},
                    {label: 'Standoff', value: 'standoff.txt'},
                    {label: 'Real Boy', value: 'real_boy.txt'},
                    {label: 'No More Me', value: 'no_more_me.txt'},
                    {label: 'Destined', value: 'destined.txt'},
                    {label: 'Save Me', value: 'save_me.txt'},
                    {label: 'Break Me', value: 'break_me.txt'},
                    {label: 'Get Low', value: 'get_low.txt'},
                    {label: 'Mechanical', value: 'mechanical.txt'},
                    {label: 'No Control', value: 'no_control.txt'},
                    {label: 'The Lie', value: 'the_lie.txt'},
                    {label: 'Down', value: 'down.txt'},
                    {label: 'Echoes', value: 'echoes.txt'}],
                'Anarchy_II':[
                    {label: 'Justice', value: 'justice.txt'},
                    {label: 'The Comeback', value: 'the_comeback.txt'},
                    {label: 'We\'re Watching', value: 'were_watching.txt'},
                    {label: 'VIP', value: 'vip.txt'},
                    {label: 'Beautiful People', value: 'beautiful_people.txt'},
                    {label: 'Rebels', value: 'rebels.txt'},
                    {label: 'Ever', value: 'ever.txt'},
                    {label: 'Ghost', value: 'ghost.txt'},
                    {label: 'Industrial Robot Revolution', value: 'industrial_robot_revolution.txt'},
                    {label: 'Important People', value: 'important_people.txt'},
                    {label: 'Big Ugly Missiles', value: 'big_ugly_missiles.txt'},
                    {label: 'War', value: 'war.txt'},
                    {label: 'Victory', value: 'victory.txt'}],
                'Insert_Genre_Here':[
                    {label: 'Anger', value: 'anger.txt'},
                    {label: 'Stress', value: 'stress.txt'},
                    {label: 'Anxiety', value: 'anxiety.txt'},
                    {label: 'Insomnia', value: 'insomnia.txt'},
                    {label: 'Depression', value: 'depression.txt'},
                    {label: 'Insert Genre Here', value: 'insert_genre_here.txt'},
                    {label: 'Chstr', value: 'chstr.txt'}],
                '0':[
                    {label: 'Sorry', value: 'sorry.txt'},
                    {label: 'Over', value: 'over.txt'},
                    {label: 'Blink', value: 'blink.txt'},
                    {label: '0', value: '0.txt'},
                    {label: 'Voices', value: 'voices.txt'},
                    {label: 'Rebel', value: 'rebel.txt'}],
                'Blood_Sweat_Tears':[
                    {label: 'Humanize', value: 'humanize.txt'},
                    {label: 'Blood', value: 'blood_bringing_back_the_heavy.txt'},
                    {label: 'Tears', value: 'tears.txt'},
                    {label: 'Guts', value: 'guts.txt'},
                    {label: 'Glory', value: 'glory.txt'}]
            };

            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('lyrics_menu')
                    .setPlaceholder('Tap here!')
                    .addOptions(Array.from(gb_works[interaction.options.data[0].value])),
            );

            interaction.reply({content:`Select a song from **${[interaction.options.data[0].value.split('_').join(' ')]}**!`, components:[row]});
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
                interaction.reply(`Sorry, there's been an error. :pensive:`);
                console.log(`-----> Something went wrong.\n-----> ${err}`)
            }
            else {

                color_chooser = 
                {
                    "We Are Monsters":"#FFFFFF",
                    "Anarchy": "#691312",
                    "Devastator EP": "#F20612",
                    "Hurt": "#34202C",
                    "Anarchy II":"#691312",
                    "Insert Genre Here":"#7C3F8C",
                    "0":"#1C4AA6",
                    "Blood Sweat Tears":"#0D0D0D"
                }

                albums = ["We Are Monsters", "Anarchy", "Devastator EP", "Hurt", "Anarchy II", "Insert Genre Here", "0", "Blood Sweat Tears"]

                song_all_caps = interaction.values[0].split('_').join(' ').replace(".txt", "").toUpperCase()

                for (const album in albums) {
                    if (interaction.message.content.includes(albums[album])) {
                        chosen_color = color_chooser[albums[album]]
                    }
                }

                const LyricEmbed = new MessageEmbed()
                    .setColor(chosen_color)
                    .setTitle(`${song_all_caps} BY GROUNDBREAKING`)
                    .setDescription(data.Body.toString())
                    .setFooter(`requested by ${interaction.user.username}`, client.user.avatarURL());


                interaction.reply({embeds:[LyricEmbed]})
            }
        });
    };
});


client.login(BOT_TOKEN);