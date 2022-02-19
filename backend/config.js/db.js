const mongoose = require('mongoose')

const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECTION)

        console.log(`Mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb