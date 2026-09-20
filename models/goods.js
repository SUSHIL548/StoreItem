const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goodsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
       type: String,
       required:true
    },
    brand: { 
    type: String,
    },
    description:String,
    price: {
       type: Number,    
        required: true     
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
      url: String,
      filename: String,  
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const Goods = mongoose.model("Goods", goodsSchema);
module.exports = Goods;

