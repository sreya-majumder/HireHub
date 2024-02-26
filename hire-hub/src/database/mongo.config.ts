import mongoose from "mongoose";

// export function connect() {
//   mongoose
//     .connect(process.env.MONGO_URL!, {
//       tls: true,
//       ssl: true,
//     })
//     .then(() => console.log("Connected to MongoDB Database Successfully"))
//     .catch((err) => console.log("Error in database Connection!! The error is..", err));
// }


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}