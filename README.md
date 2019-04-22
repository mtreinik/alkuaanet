# Alkuaanet

Alkuaanet gives initial notes of acapella songs.


## Building and deploying

Build the application with `npm run build`.

Copy contents of `build` folder to the root of web server.

## Integration to back-end

### Fetching song data

The server should have a data file `/songdata.json` with the following format:

```
[
  {
    "ID": 67,                                                // id
    "nimi": "Kuutamolla (Sibelius)",                         // title of song
    "alkusanat": "Rannalla yksin istun, mieli on kaihoinen", // start of lyrics
    "opus-aanet": "A3-F3",                                   // initial notes
    "sav": "Sibelius",                                       // composer
    "san": ""                                                // poet
  }, ...
```

See `scripts` for an example python3 script that fetches song data from a Google Sheet.

### Sending suggestions for new songs

Song suggestions are sent to a server as a form post. The server appends song data to a Google Sheet.

There is an example WSGI server implemented in python3 in `scripts`. 

## Dependencies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The app uses UI components from the [Material-UI](https://material-ui.com/).

Routing is done with [React Router](https://reacttraining.com/react-router/).

Copying to clipboard is done with [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard).

Type information for the implementation is provided with [TypeScript](https://www.typescriptlang.org/).
