from datetime import datetime
import os
import sys
import json
import spotipy
import webbrowser
import spotipy.util as util
import random
import smtplib,ssl
from json.decoder import JSONDecodeError
import time
#importing the module 
import logging 







# give your playlist name, and it will get its id
# if not found returns none
def getUserPlaylistId(playlistName):
    playlists = spotifyObj.user_playlists(username, limit=50)["items"]
    playlistFound = False
    for playlist in playlists:
        if(playlist["name"] == playlistName):
            playlistFound = True
            playlistid = playlist["id"]
            break
    if playlistFound:
        return playlistid
    else:
        return "DNE"

# get playlist from pool of all playlists
# right now specifically for getting a "this is" playlist
def getFromAllPlaylists(playlistName):
    playlist = spotifyObj.search(q=playlistName, type='playlist', limit=1)
    #print("results for {}".format(playlistName))
    #print(json.dumps(playlist, indent=4))
    playlistFound = False
    
    #change playlist name to look normal
    playlistName = playlistName.replace('+', ' ')
    playlistName = playlistName.replace('"', '')

    if(len(playlist["playlists"]["items"]) > 0):
        if(playlist["playlists"]["items"][0]["name"] == playlistName):
                playlistFound = True
                playlistid = playlist["playlists"]["items"][0]["id"]
        if(playlistFound):
            return playlistid
        else:
            return "DNE"
    else:
        return "DNE"
    
def getArtistFromId():
    return True

def containsThisAlbum(albumId, aList):
    for album in aList:
        print("album")
        print(album)
        if album["id"] == albumId:
            return True
    return False

#setup logger
#Let us Create an object 
logger=logging.getLogger() 
logging.basicConfig(filename="logs/std.log", 
					format='%(asctime)s %(message)s', 
					filemode='w') 
#Now we are going to Set the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG) 


#get username and scope
username =  sys.argv[1]
# sys.argv[1]
scope = 'user-modify-playback-state user-top-read playlist-modify-public user-read-currently-playing playlist-read-collaborative'

#erase cache and prompt for user permission
try:
    token = util.prompt_for_user_token(username, scope, cache_path='.cache-charlessjindra')
except:
    os.remove(f".cache-{username}")
    token = util.prompt_for_user_token(username, scope)

#print('well we got past the stupid junk')
#set up spotify object
spotifyObj = spotipy.Spotify(auth=token)

while True:


    try:
        data = spotifyObj.current_user_playing_track()
    except Exception as inst:
        print('exception reached')
        print(type(inst))    # the exception type
        print(inst.args)     # arguments stored in .args
        print(inst)          # __str__ allows args to be printed directly,
        token = util.prompt_for_user_token(username, scope, cache_path='.cache-charlessjindra')
        spotifyObj = spotipy.Spotify(auth=token)

    #print(data["currently_playing_type"])

    if(data):
        if(data["currently_playing_type"] == 'track'):

            print(data["progress_ms"] / data["item"]["duration_ms"])

            # we have to have listened to a really good portion of the song
            if(data["progress_ms"] / data["item"]["duration_ms"] > .9):
            

                album = data["item"]["album"]

                print("new data")
                binData = {
                    "id": album["id"],
                    "name": album["name"],
                    "artist": album["artists"][0]["name"],
                    "img_url": album["images"][1]["url"],
                    "timestamp": str(datetime.now())
                }
                print(json.dumps(binData, indent=4))

                import requests
                url = 'https://api.jsonbin.io/v3/b/656288a70574da7622cc03b3'
                headers = {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2a$10$4ESULxsDJTd8cdmFp2fCouMPM7mGrNoGMf9OW2MA3FVy6YjLg9M1m'
                }

                req = requests.get(url+"/latest", json=None, headers=headers)

                responseArray = json.loads(req.text)["record"]
                #print(responseArray)

                if(not containsThisAlbum(binData["id"], responseArray)):

                    print("inserting into array")
                    responseArray.insert(0,binData)

                    req = requests.put(url, json=responseArray, headers=headers)
                    print("inserted into bin")
                    #print(req.text)
                else:
                    print("record already present, waiting")


    print("==================")


    time.sleep(10)