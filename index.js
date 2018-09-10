// Load dependencies
const io = require('socket.io-client');
const request = require('request');
const fs = require('fs');
const cccTrade = require('ccc-trade');

// Set vars
const streamUrl = 'https://streamer.cryptocompare.com/';
const fsym = 'BTC';
const tsym = 'USD';
const dataUrl = `https://min-api.cryptocompare.com/data/subs?fsym=${fsym}&tsyms=${tsym}`;
const socket = io(streamUrl);

// Before we begin check if previous output file exists
// If it does, unlink it and recreate them so it is fresh each time 
if (fs.existsSync('./streamed-trades.json')) {
    fs.unlinkSync('./streamed-trades.json');
}

// Make request to dataUrl to get the availble subs
request({
    url: dataUrl
}, function (error, response, body) {
    if (error) {
        // If there was an error, log it and quit
        console.log(error);
        process.exit(1);
    } else {
        // If there were no errors, add subscriptions
        const currentSubs = JSON.parse(body).USD.TRADES;

        socket.emit('SubAdd', { subs: currentSubs });
    }
});

// Stream data
socket.on('m', (data) => {
    // Parse the data
    const parsedData = cccTrade.unpack(data);

    // Log to console while streaming
    console.log(parsedData);

    // Save to file
    fs.appendFileSync('./streamed-trades.json', JSON.stringify(parsedData, null, 2));
});

