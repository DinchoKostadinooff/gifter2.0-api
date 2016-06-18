var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var GiftSchema = mongoose.model('Gift', new Schema({
    owner_id:
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
    username:
    {
        type:String
    },
    ownerName:
    {
        type:String
    },
    img: {
        data: String,
        contentType: String
    }


}));
module.exports = mongoose.model('Gift', GiftSchema);




