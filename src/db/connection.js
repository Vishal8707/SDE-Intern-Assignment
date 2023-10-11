import mongoose from "mongoose";

export const startserver= async(app,PORT,URL)=> {
    try {
       await mongoose.connect(URL)
        console.log("MongoDb is connected")
        app.listen(PORT, () => {
            console.log(`Server is running on ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}