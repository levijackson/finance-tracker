# Finance Tracker
A nice private way to track your expenses and income month over month


# Setup
1) `npm install`

2) Download and install [MongoDB](https://www.mongodb.com/)

3) Start MongoDB
```
# if you want to store them in the default /data/mongodb/
/<path_to_mongodb>/bin/mongod

# If you want to store the database files somewhere special
/<path_to_mongodb>/bin/mongod --dbpath /path/to/db/files/
```

4) Copy `.env.local.example` to `.env.local` and adjust the connection string. If you used the default port of `27017`, the following will work.
```
MONGODB_URI=mongodb://localhost:27017/finances
```