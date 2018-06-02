const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox-m9gut.mongodb.net/test?retryWrites=true';

MongoClient.connect(url, (connectError, db) => {
  assert.equal(null, connectError);

  const dbo = db.db('video');
  dbo.collection('movieDetails').find({}).toArray((findError, result) => {
    assert.equal(null, findError);
    result.forEach((res) => {
      console.log(res.title);
    });
    db.close();
  });
});
