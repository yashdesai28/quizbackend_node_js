import  mongoose  from "mongoose";

const {Schema} = mongoose;

const subject_registrastion_schema =new Schema({
    subject_name:{type:String, required:[true,"student name is required"]},
    subject_code:{type:String, required:[true,"student email is required"]},
    Quizzes:[{type:Schema.Types.ObjectId,ref:"Quizzes"}],
    Teacherid:{type:Schema.Types.ObjectId,ref:"Teacher"},

});

export const Subject = mongoose.model("Subject",subject_registrastion_schema)