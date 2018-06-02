const { MongoClient } = require('mongodb');
const crypto = require('crypto');

MongoClient.connect('mongodb://localhost:27017/m101', (connectionError, db) => {
  if (connectionError) throw connectionError;

  const algorithm = 'aes256';
  const encryptedMessage = '7013254dca77e2c913d18cf5b70e7bba';

  db.collection('hw1_2').find({}).toArray((findError, docs) => {
    if (findError) throw findError;

    if (docs.length < 1) {
      console.dir('No documents found');
      return db.close();
    }

    const doc = docs[0];
    const decipher = crypto.createDecipher(algorithm, doc._id);
    const decrypted = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');
    console.log(`Answer: ${decrypted}`);
    return db.close();
  });
});
