// schemas/user.js
var db = require("../connect");
var crypto = require("crypto");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
      name : {
        type : String,
        require : true,
        unique : true
    } , 
    photo : {
        url : String
    } ,
    hash : {
        type :String,
        require : true,
    } ,
    salt : {
        type :String,
        require : true,
    } , 
    iteration : {
        type : Number , 
        require : true
    } , 
    created : {
        type : Date, 
        default : Date.now() 
    }

});
userSchema.virtual("password")
    .set(function (data) { 
        this.salt = String(Math.random());
        this.iteration = parseInt(Math.random() * 10 +1);
        this.hash =this.getHash(data);
     }) 
    .get(function () { 
        return this.hash;
     })
userSchema.methods.getHash = function (password) { 
      var c =  crypto.createHmac("sha1" , this.salt);
  for (var i = 0; i < this.iteration; i++) {
  c = c.update(password);
  return c.digest("hex");
}}  
userSchema.methods.checkPassword  = function (data){
    return this.getHash.data === this.hash;
}
exports.User = mongoose.model("User" , userSchema);