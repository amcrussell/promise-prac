const express = require('express');
const chirpStore = require('../chirpstore');
const router = express.Router();

router.get('/:id?', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            const chirp = await chirpStore.GetChirp(id);
            res.json(chirp);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    } else {
        try {
            const chirps = await chirpStore.GetChirps();
            res.json(chirps);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };
});

router.post('/', async (req, res) => {
    const { user, text } = req.body;

    if (!user || !text) {
        res.json({ message: "Error - invalid data - User and Title must not be empty" });
        return;
    }

    const newChirp = { user, text };
    try {
        await chirpStore.CreateChirp(newChirp);
        res.status(200).json({ message: "Chirp Created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    const { user, text } = req.body;

    if (!user || !text) {
        res.status(400).json({ message: "Error - invalid data - User and Title must not be empty" });
        return;
    }

    const updatedChirp = { user, text };
    try {
        await chirpStore.UpdateChirp(id, updatedChirp);
        res.json({ message: "Chirp Edited" });
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    const chirp = req.body;
    try {
        await chirpStore.DeleteChirp(id, chirp);
        res.json({ message: "Chirp Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;
