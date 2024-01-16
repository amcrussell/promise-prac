const fs = require('fs');
let chirps = { nextid: 0 };

if (fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json'));
}

// This evaluates to see if 0.25 > Math.random(), which goes from 0 to 0.99999999
// That gives us about a 1 in 4 chance that an error should happen
const requestShouldBreak = () => {
    return 1 / 10 > Math.random();
};

let getChirps =  () => {

    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject("error cant get all chirps at this moment");
        } else {
            resolve(Object.assign({}, chirps));
        }
    });
}

let getChirp = id => {

    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject(`error cant get chirp with id of ${id} at this moment`);
        } else {
            resolve(Object.assign({}, chirps[id]))
        }
    });
}

let createChirp = (chirp) => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject(`error: can not create chirp at this moment`);
        } else {
            chirps[chirps.nextid++] = chirp;
            writeChirps();
            resolve("successfully added chirp");
        }
    })
};

let updateChirp = (id, chirp) => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject(`error: can not update chirp id:${id} at this moment`);
        } else {
            chirps[id] = chirp;
            writeChirps();
            resolve("successfully updated chirp");
        }
    })
}

let deleteChirp = id => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()) {
            reject(`error: can not delete chirp id:${id} at this moment`);
        } else {
            delete chirps[id];
            writeChirps();
            resolve("successfully deleted chirp");
        }
    })
}

let writeChirps = () => {
            fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

module.exports = {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}