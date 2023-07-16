const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authjwt');
const control = require('../controllers/teamwork.article.controller');

router.post('/articles', [verifyToken], control.createArticle);
router.patch('/articles/:articleId', [verifyToken], control.patchArticleById);
router.delete('/articles/:articleId', [verifyToken], control.deleteArticleById);
router.get('/articles', [verifyToken], control.getAllArticles);
router.get('/articles/:articleId', [verifyToken], control.getArticleById);

module.exports = router;
