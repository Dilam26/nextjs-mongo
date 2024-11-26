//https://www.youtube.com/watch?v=CkiuF2wsPRg

import {connect, connection} from "mongoose";

const conn = {
    isConnected: false
}

export async function  connectDB() {
    if(conn.isConnected) return;

    const db = await connect('mongodb://localhost:27017/mongocrud');
    console.log(db.connections[0].db.databaseName);
    conn.isConnected = db.connections[0].readyState
}

connection.on('connected', async () => {
    await connectDB();
    console.log('MongoDB Connected');
});

connection.on('error', async (err) => {
    console.log('MongoDB Connection Error', err);
});