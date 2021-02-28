const fetch = require('node-fetch');
const Bluebird = require('bluebird');

const logger = require('./logger');

fetch.Promise = Bluebird;

const getPublicGists = (username) => {
  return fetch(`https://api.github.com/users/${username}/gists`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
  })
    .then(res => res.json())
    .catch(err => logger.error(err));
}

const getGist = (id) => {
  return fetch(`https://api.github.com/gists/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
  })
    .then(res => res.json())
    .catch(err => logger.error(err));
}

module.exports = {
  getPublicGists,
  getGist,
}