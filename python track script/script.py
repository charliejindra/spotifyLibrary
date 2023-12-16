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
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
import base64
from email.message import EmailMessage, Message

import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64
from email.mime.text import MIMEText







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

def get_credentials(scopes):
    flow = InstalledAppFlow.from_client_secrets_file('./client_secret.json', scopes)
    credentials = flow.run_local_server(port=4200)
    return credentials

def sendEmail(creds):
  
    # CODE BASED ON:
    #https://developers.google.com/gmail/api/guides/sending#python_2
  try:
    # create gmail api client
    service = build("gmail", "v1", credentials=creds)

    message = EmailMessage()
    print(type(message))
    message["To"] = "charlessjindra@gmail.com"
    message["From"] = "charlessjindra@gmail.com"
    message["Subject"] = "poopy stinky"
    message.set_content('this is a message to remind you that you are poopy and also stinky')
    
    encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()


    create_message = {"raw": encoded_message}
    # pylint: disable=E1101
    send_message = (
        service.users()
        .messages()
        .send(userId="me", body=create_message)
        .execute()
    )
    print(f'Message Id: {send_message["id"]}')
  except HttpError as error:
    print(f"An error occurred: {error}")
    send_message = None
  return send_message



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

#login with Gmail API
gmail_api_scopes = ['https://www.googleapis.com/auth/gmail.send']
credentials = get_credentials(gmail_api_scopes)

sendEmail(creds=credentials)

#token = util.prompt_for_user_token(username, scope)
#erase cache and prompt for user permission
try:
    token = util.prompt_for_user_token(username, scope, cache_path='.cache-charlessjindra', client_id='fae7ec0527c946709dc8a03d0519330a', client_secret='994c5a8883cc4e72a108ab8c3cda6b70', redirect_uri='http://localhost:4200')
except:
    os.remove(f".cache-{username}")
    token = util.prompt_for_user_token(username, scope)

#print('well we got past the stupid junk')
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
                    "img_url": album["images"][0]["url"],
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