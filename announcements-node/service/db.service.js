//Connection to mongodb server
const MongoClient = require('mongodb').MongoClient
    , assert = require('assert')
    , Promise = require('bluebird');

const {MONGOURL} = require('../shared/app-constants');

// Function to connect to the server
exports.connect = async function () {
    return MongoClient.connect(MONGOURL)
        .then(function (client) {
            return client;
        })
        .catch(function (err) {
            console.log(err);
            throw Error('Unable to connect to mongoDB');
        })
};

// Function to add new user to the database
exports.insertOne = async function (data, dbName) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        db.collection('users').insertOne(data, function (err, r) {
            assert.equal(null, err);
            console.log("Status", r);
            assert.equal(1, r.insertedCount);
            return;
        })
    } catch (e) {
        console.log(e);
        throw Error('Error adding new user to the database');
    }
};

exports.findOne = async function (query, dbName, collectionName) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        return new Promise((resolve, reject)=> {
            db.collection(collectionName).findOne(query, function (err, r) {
                assert.equal(null, err);
                console.log(`Result for query`, r);
                resolve(r);
            });
        })

    } catch (e) {
        console.log(e);
        throw Error('No results in the database');
    }
};

exports.deleteOne = async function (query, dbName, collectionName) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        return new Promise((resolve, reject)=> {
            db.collection(collectionName).deleteOne(query, function (err, r) {
                assert.equal(null, err);
                console.log(`Result for query`, r);
                resolve(r);
            });
        })

    } catch (e) {
        console.log(e);
        throw Error('No results in the database');
    }
};

