const moment = require('moment');
const Promise = require('bluebird');

const {
  fetchPublicGists,
  fetchGist,
} = require('./gist')
const logger = require('./logger');
const {
  toggleGistFavorite,
  getGist,
  getFavoriteGists } = require('./sql-engine');

module.exports = {
  Query: {
    user(parent, args) {
      return { username: args.username };
    },

    async gist(parent, args) {
      return await fetchGist(args.id)
        .catch(err => {
          logger.error(err);
        });
    },

    async favoriteGists() {
      return await getFavoriteGists()
        .then(res => Promise.map(res, (gist) => fetchGist(gist.gist_id)))
        .catch(err => {
          logger.error(err);
          throw err;
        }); 
    }
  },

  User: {
    async gists(args) {
      return await fetchPublicGists(args.username)
        .catch(err => {
          logger.error(err);
        });
    }
  },

  Gist: {
    createdOn(parent) {
      return moment(parent.created_at).unix();
    },

    files(parent) {
      console.log(parent)
      return Object.keys(parent.files);
    },

    async favorite(parent) {
      const gist =  await getGist(parent.id);

      if (gist)
        return gist.favorite;
      
      return false;
    }
  },

  GistFile: {
    filename(parent) {
      return parent;
    }
  },

  Mutation: {
    async toggleGistFavorite(parent, args) {
      return await toggleGistFavorite(args.id);
    }
  }
};