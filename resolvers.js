const moment = require('moment');

const {
  getPublicGists,
  getGist,
} = require('./gist')
const logger = require('./logger');

module.exports = {
  Query: {
    user(parent, args) {
      return { username: args.username };
    },

    async gist(parent, args) {
      return await getGist(args.id)
        .catch(err => {
          logger.error(err);
        });
    },
  },

  User: {
    async gists(args) {
      return await getPublicGists(args.username)
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
      return Object.keys(parent.files);
    }
  },

  GistFile: {
    filename(parent) {
      return parent;
    }
  }
};