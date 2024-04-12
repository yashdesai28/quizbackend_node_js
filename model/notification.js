import  mongoose  from "mongoose";

const {Schema} = mongoose;

const notification_schema =new Schema({
    student_id:{type:Schema.Types.ObjectId,ref:"Student"},
    student_email:{type:String},
    role:{type:String,required:[true,"type required"]},
    status:{type:String,required:[true,"status is required"]},
    date_time:{type:String,required:[true,"datetime is required"]},
    Last_activity:{type:String},
    token_id:{type:String,required:[true,"token is required"]},
    subject:{type:Schema.Types.ObjectId,ref:"Subject"},
    teacher_id:{type:Schema.Types.ObjectId,ref:'Teacher'}
});

export const Notification = mongoose.model("Notification",notification_schema)
 