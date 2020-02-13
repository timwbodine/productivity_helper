const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
fs.readFile('./output.json', function(err, data) { 
    let jsonObj = "";
    if (err) throw err;
    jsonObj = JSON.parse(data.toString('utf8'));
    let times = jsonObj["times"];
    let state = jsonObj["state"];
    if (state["isWorking"] === false) {
        let suggested = getSuggestion(times);
        console.log("it is recommended to work on " + Object.keys(suggested)[0]);
        console.log(`commencing work on ${Object.keys(suggested)[0]}`)
        readline.close();
        state["isWorking"] = true;
        state["workingOn"] = Object.keys(suggested)[0];
        state["started"] = Date.now();
        logStart(jsonObj, state);
    } else {
        let workedOn = state["workingOn"];
        let time = Date.now() - state["started"];
        console.log(`You have worked on${state["workingOn"]} for ${time} milliseconds.  Now you have stopped.`);
        state["isWorking"] = false;
        state["workingOn"] = null;
        state["started"] = 0;
        logTime(jsonObj, time, workedOn);
        logStart(jsonObj, state);
        readline.close();
    };
});



function makeArray(obj) {
    let objArray = Object.keys(obj).map((i) => ({[i]: obj[i]}));
    return objArray;
}

function makeObj(arr) {
    let obj = {};
    for (const el of arr) {
        obj[Object.keys(el)[0]] = Object.values(el)[0];
    };
    return obj
}

function getSuggestion(obj) {
    let arr = makeArray(obj);
    let smallest = arr[0];
    for (x of arr) {
        if (Object.values(x)[0] <= Object.values(smallest)[0]) {
            smallest = x;
        }
    }
    console.log(Object.values(smallest)[0]);
    return smallest;
}

function logTime(jsonObj, time, key) {
    jsonObj["times"][key] += time
    fs.writeFile("output.json", JSON.stringify(jsonObj), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
}

function logStart(jsonObj, state) {
    fs.writeFile("output.json", JSON.stringify(jsonObj), 'utf8', function(err) {
        jsonObj["state"] = state;
        if (err) {
            console.log("ERROR occurred recording state change");
            return console.log(err);
        }
    });
}


