import mongoose from "mongoose";

const { Schema } = mongoose;

const Assessment_schema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: [true, "student id is required"] },
    assessment_data: [{
        teacher_id: { type: Schema.Types.ObjectId, ref: "Teacher" },
        subject_id: { type: Schema.Types.ObjectId, ref: "Subject" },
        quiz_id: { type: Schema.Types.ObjectId, ref: "Quizzes" },
        date: { type: Schema.Types.String },
        total: { type: Schema.Types.String }
    }]
}, { strictPopulate: false });


export const Assessment = mongoose.model("Assessment", Assessment_schema)