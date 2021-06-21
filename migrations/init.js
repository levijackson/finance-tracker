const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');

console.log({ envPath });

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql');

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
    },
});

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
};

async function migrate() {
  try {
      
    await query(`
        CREATE TABLE IF NOT EXISTS items (
            id
                INT
                AUTO_INCREMENT
                PRIMARY KEY,
            type
                ENUM ("expense", "income")
                NOT NULL,
            category
                TINYTEXT
                NOT NULL,
            amount 
                FLOAT
                NOT NULL,
            date
                TIMESTAMP NOT NULL,
            note 
                TEXT,
            created 
                TIMESTAMP
                NOT NULL
                DEFAULT
                CURRENT_TIMESTAMP,
            updated 
                TIMESTAMP
                NOT NULL
                DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,
            KEY index_type (type),
            KEY index_category (category(50)),
            KEY index_date (date)
        )
    `)
      
    await query(`
        CREATE TABLE IF NOT EXISTS user_items (
            id
                INT
                AUTO_INCREMENT
                PRIMARY KEY,
            userId
                INT
                NOT NULL,
            itemId
                INT
                NOT NULL,
            KEY index_user_id (userId),
            KEY index_item_id (itemId),
            KEY index_user_item_id (userId,itemId)
        )
    `)
    console.log('migration ran successfully')
  } catch (e) {
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
};

migrate().then(() => process.exit());
