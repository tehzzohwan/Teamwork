const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authjwt');
const control = require('../controllers/teamwork.gif.controller');

router.post('/gifs', [verifyToken], control.createGif);
router.delete('/gifs/:gifId', [verifyToken], control.deleteGifById);
router.get('/gifs', [verifyToken], control.getAllGifs);


module.exports = router;
