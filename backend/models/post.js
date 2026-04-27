import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title:{ type:String, required:true},
        content:{ type:String, required:true},
        imgUrl:{ type:String, required:false},
    },
    {
        timestamps:true,
    }
)


export default mongoose.model('Post',postSchema);