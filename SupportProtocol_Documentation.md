# The `SupportProtocol.py` Script
As the main developer of the Media bot, I can tell you, adding lyrics is a pain. So, the `SupportProtocol.py` is here to make the process easier. Why is it in Python? Simply put: Python > JavaScript. Fight me.

Anyways, here's your documentation:

## class Labels_and_Names
This class' objectives is to make it easier to write into the `gb_works` dictionary in `Media.js`.

### Labels_and_Names.Label_and_Values(album_name, list_of_songs)
Parameters:
* album_name - (String) The name of the album
* list_of_songs - (Array) A String list with the song names in the album

Returns: Data to input in `gb_works`.

Sample result:
```json
'Devastator_EP':[
                    {label: 'Faker', value: "faker.txt"},
                    {label:'Synthetic', value:"synthetic.txt"},
                    {label:'Breathe', value:"breathe.txt"},
                    {label: 'Crank', value:"crank.txt"},
                    {label: 'Devastator', value:"devastator.txt"}]
```

CRITICAL NOTE: Make sure that the .txt file name is the same as the name you get from the `Files.Create_Files()` function!

## class Files
This class is to handle file management. Inside the `/src` folder, please create a `/Files` folder for this function to work!

### Files.Create_Files(album_name, list_of_songs)
Parameters:
* album_name - (String) The name of the album
* list_of_songs - (Array) A String list with the song names in the album

Returns: None, creates .txt files in the `/Files` folder.

### Files.File_Length()
This function checks to see how long the files in `/Files` are. Discord has a limit of how many characters per message, so use this for reference!

All this does is print the files you need to shorten.

### Files.Clear()
Deletes the files you have in the `/Files` folder.

# Other Things to Do
* In `Media.js`, add the dictionary to `gb_works` that you got from `Files.Labels_and_Values()`.
* Once you fill out the .txt files you got from `Files.Create_Files()`, give them to a mod to upload to Amazon Web Services.
* In `Media.js`, add the album you're working on to `color_chooser` and add a color that represents the album.
* In `Media.js`, add the album name to the `albums` array
* In `/CommandRegistrar/RegisterCommands.js`, add `.AddChoice("Album Name", "Album_Name_With_UnderScores")` to the file.

# Thank You
Thank you for your interest in contributing! <3