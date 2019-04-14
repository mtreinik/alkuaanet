#!/usr/bin/python3
#
# fetch songdata from a google sheet
#

import gspread
import json
from oauth2client.service_account import ServiceAccountCredentials

json_keyfile_name = 'TODO name of keyfile'
json_outfile_name = 'TODO path to songdata.json'

# use creds to create a client to interact with the Google Drive API
scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name(json_keyfile_name, scope)
client = gspread.authorize(creds)
# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = client.open("alkuaanipankki").sheet1

# Extract and print all of the values
list_of_hashes = sheet.get_all_records()
#print(list_of_hashes)

with open(json_outfile_name, 'w') as outfile:
    json.dump(list_of_hashes, outfile)
