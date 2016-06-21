var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var giftSchema = new mongoose.Schema({
    ownerId:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true

    },
    price:
    {
        type: String
    },
    x:
    {
      type:String
    },
    y:
    {
        type:String
    },
    userName:
    {
        type:String
    },
    ownerName:
    {
        type:String
    },
    img: {
        type:String
    }


})
mongoose.model('Gift', giftSchema);




