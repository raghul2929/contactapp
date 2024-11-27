const {model,Schema} =require("mongoose")
const cnt_schema= new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phoneno:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true,
        enum:['mobile','sim','email']
    }


},{
    Timestamps:true
}
)
module.exports=model('cnt_schema',cnt_schema,'cnt_schema')
// if we give one time it will add collection with plural name
//
// momggose:{
//     model:,
//     Schema
// }
// {}