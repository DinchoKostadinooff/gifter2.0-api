var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var PersonSchema = mongoose.model('Person', new Schema({
    ownerId:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true,
        unique:true
    }

}));
module.exports = mongoose.model('Person', PersonSchema);








