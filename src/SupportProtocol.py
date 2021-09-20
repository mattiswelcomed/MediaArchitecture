import os

class Labels_and_Names:
    def Label_and_Values(album_name, list_of_songs):
        songs = list_of_songs
        album = album_name

        content = f"'{str(album).replace(' ', '_')}'':[\n"

        for song in songs:
            content+="{label: "
            content+=f"'{song}', value: '{song.replace(' ', '_').lower()}.txt'"
            content+="},\n"

        content+=""

        content = content[:-2] + "]"

        print(content)

    def txt_file_names(list_of_songs):
        songs = list_of_songs

        content = ""

        for song in songs:
            song = ''.join(ch for ch in song if ch.isalnum())
            content+=f"{song.replace(' ', '_').lower()}.txt,"

        content = content[:-1]

        return  content.split(',')

    
class Files:
    def Create_Files(album_name, list_of_songs):
        files = Labels_and_Names.txt_file_names(list_of_songs)

        for file in files:
            f=open(f"src/Files/{file}", "w+")
            f.write("Replace this with actual content!")
            f.close()

    def File_Length():
        counter=0
        for file in os.listdir("src/Files/"):
            f=open(f"src/Files/{file}", "rb")
            content = f.read()
            
            if (len(content) + 65) > 2000:
                counter+=1
                over = (len(content) + 65) - 2000
                print(f"-----> {file} is too long. {over} over.")

        if counter>0:
            print("-----> Please resolve the files above.")
        else:
            print("-----> No files are over the limit.")

    def Clear():
        path = "src/Files/"
        for file in os.listdir(path):
            os.remove(f"{path}/{file}")

        print("Files removed.")