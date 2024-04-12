import  mongoose  from "mongoose";

const {Schema} = mongoose;

const add_quiz_schema =new Schema({
    quiz_name:{type:String, required:[true,"quize name is required"]},
    Quiz_data:{type:Schema.Types.Array},
    Quiz_ans:{type:Schema.Types.Array},
    subjectid:{ type: Schema.Types.ObjectId, ref: "Subject" },
    Teacherid:{type:Schema.Types.ObjectId,ref:"Teacher"},
    total_marks:{type: Schema.Types.Number},
    passing_marks:{type: Schema.Types.Number},
    start_time:{type:String, required:[true,"quize start time is required"]},
    end_time:{type:String, required:[true,"quize end time is required"]},
    secure_url_cvs:{type:String, required:[true,"secure_url_cvs is required"]},

});

export const Quizzes = mongoose.model("Quizzes",add_quiz_schema)