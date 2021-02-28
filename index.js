const express = require('express')
const app = express()

const {
  getPublicGists,
  getGist,
} = require('./gist')
const logger = require('./logger');
 
app
  .get('/gist/list', async (req, res) => {
    await getPublicGists('alobaidizt')
      .then(data => res.send(data))
      .catch(err => {
        logger.error(err);
        res.status(500).send(err)
      });
  })
  .get('/gist/id/:id', async (req, res) => {
    const id = req.params.id;

    await getGist(id)
      .then(data => res.send(data))
      .catch(err => {
        logger.error(err);
        res.status(500).send(err)
      });
  })
 
app.listen(3000)