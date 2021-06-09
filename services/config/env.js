const port = process.env.port || '';
const dbname = process.env.dbname || '';
const NODE_ENV = process.env.NODE_ENV || '';

let uri = 'mongodb://' + dbname;

module.exports = {
  mongodb: { uri },
};
