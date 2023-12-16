from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def get_credentials():
    flow = InstalledAppFlow.from_client_secrets_file('./client_secret.json', SCOPES)
    credentials = flow.run_local_server(port=4200)
    return credentials

credentials = get_credentials()