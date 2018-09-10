# CCC Write Trades

A simple NodeJS script for streaming trade data from the CryptoCompare API to a JSON file.

## Getting Started

### Prerequisites
This script required NodeJS to run. If you don't have NodeJS installed, you can get it from here: [https://nodejs.org/en/](https://nodejs.org/en/)

### Install Dependencies

Once you have NodeJS installed, you will need to install the script's dependencies by running: `npm install`

## Running the Script

Run the script with: `node index.js`

The script will start streaming and writing data immediately. To stop this process and exit, use: `ctrl + c`

## Output

After running the script, the streamed data will be written to the 'streamed-trades.json' file in the root of this project.

## Please Note

A lot of data is streamed very quickly; you probbaly only want to let the script run for a few seconds!

The output file is written over with each run of the script to ensure a fresh data set is saved each time.