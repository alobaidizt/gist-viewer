const sql = require('./db.js');
const logger = require('./logger');

const DUPLICATE_TABLE_CODE = '42P07';

const initDB = async () => {
  await sql`
    CREATE TABLE GIST(
        ID        SERIAL    PRIMARY KEY,
        GIST_ID   CHAR(32)  UNIQUE        NOT NULL,
        FAVORITE  BOOLEAN                 NOT NULL
    );
  `
  .catch(err => {
    // If error other than table already exists then throw error
    if (err.code === DUPLICATE_TABLE_CODE) return;

    logger.error(err)
    throw err;
  });
};

const getGist = async (gistId) => {
  return await sql`
    SELECT *
    FROM GIST
    WHERE GIST_ID = ${gistId}
  `
  .then(res => res[0])
  .catch(err => {
    logger.error(err)
    throw err;
  });
};


const toggleGistFavorite = async (gistId) => {
  return await sql`
    INSERT INTO GIST(GIST_ID, FAVORITE)
    VALUES(${gistId}, TRUE) 
    ON CONFLICT (GIST_ID) 
    DO 
      UPDATE SET FAVORITE = NOT GIST.FAVORITE
  `
  .then(res => sql`SELECT FAVORITE FROM GIST WHERE GIST_ID = ${gistId}`)
  .then(res => res[0].favorite)
  .catch(err => {
    logger.error(err)
    throw err;
    });
};

const getFavoriteGists = async () => {
  return await sql`
    SELECT *
    FROM GIST
    WHERE FAVORITE
  `
  .then(res => {
    delete res.count;
    delete res.command;
    return res;
  })
  .catch(err => {
    logger.error(err)
    throw err;
  });
};

module.exports = {
  initDB,
  toggleGistFavorite,
  getGist,
  getFavoriteGists,
}
