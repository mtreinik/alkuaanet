#!/usr/bin/python3

def test_app(environ, start_response):
        import cgi, sys
        method = environ["REQUEST_METHOD"]

        start_response('200 OK', [('Content-Type', 'application/json'), ('Access-Control-Allow-Origin', '*')])

        post_env = environ.copy()
        post_env['QUERY_STRING'] = ''
        post = cgi.FieldStorage(
          fp=environ['wsgi.input'],
          environ=post_env,
          keep_blank_values=True
        )

        title = post['title'].value
        lyrics = post['lyrics'].value
        notes = post['notes'].value
        composer = post['composer'].value
        arranger = post['arranger'].value
        poet = post['poet'].value

        filename = title.replace(' ', '_') + '.opus'
        timestamp = str(datetime.datetime.utcnow())

        sheet.append_row(['', title, lyrics, '', '', notes, '', filename, '', composer, arranger, poet, '', timestamp])

        yield '{"title": "%s", "notes": "%s", "filename": "%s" }' % ( title, notes, filename )

if __name__ == '__main__':
    from flipflop import WSGIServer
    import gspread, json, datetime

    from oauth2client.service_account import ServiceAccountCredentials

    json_keyfile_name = 'TODO name of keyfile'

    scope = ['https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name(json_keyfile_name, scope)
    client = gspread.authorize(creds)
    sheets = client.open("alkuaanipankki")
    sheet = sheets.get_worksheet(1)

    WSGIServer(test_app).run()
