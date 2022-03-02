// log a message to the browser console if debugging is enabled
function logger($message) {
    if (DEBUG) {
        console.log($message);
    }
}

// start a new block of logging with a heavy line if debugging is enabled
function logger_new() {
    if (DEBUG) {
        console.log("==========");
    }
}

// start a new sub-block of logging with a light line if debugging is enabled
function logger_break() {
    if (DEBUG) {
        console.log("----------");
    }
}

// get a random value from an array
function getRandom ($array) {
    return $array[Math.floor(Math.random() * $array.length)];
}