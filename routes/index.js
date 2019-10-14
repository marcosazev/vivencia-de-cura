const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/aids', (req, res) => {
  res.render('aids');
});

router.get('/ansiedade', (req, res) => {
  res.render('ansiedade');
});

router.get('/avc', (req, res) => {
  res.render('avc');
});

router.get('/depressao', (req, res) => {
  res.render('depressao');
});

router.get('/diabetes', (req, res) => {
  res.render('diabetes');
});

router.get('/mama', (req, res) => {
  res.render('mama');
});

router.get('/obesidade', (req, res) => {
  res.render('obesidade');
});

router.get('/toc', (req, res) => {
  res.render('toc');
});

router.get('/chats', (req, res) => {
  res.render('chats')
})

module.exports = router;
