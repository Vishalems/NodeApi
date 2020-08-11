const express = require('express');
const {getPosts,loginAuth,ensureToken} = require('../Controllers/mainController');
const router = express.Router();
require('dotenv').config();

router.get('/',getPosts);
router.post('/getPost',ensureToken,getPosts);

router.post('/login' ,loginAuth)

module.exports = router;