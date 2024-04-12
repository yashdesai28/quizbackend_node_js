import mongoose from "mongoose";

const { Schema } = mongoose;

const student_registrastion_schema = new Schema({
    student_name: { type: String, required: [true, "student name is required"] },
    student_email: { type: String, required: [true, "student email is required"], unique: [true, "this email is already use"] },
    student_enrollment_number: { type: Number, required: [true, "student enrollment number is required"] },
    subject: [{ type: Schema.Types.ObjectId, ref: "Subject" }],

});

const user_schema = new Schema({
    roles_id: [{
        type: Schema.Types.ObjectId,
        required: [true, "role ID is required"],
        refPath: 'user_role' // Reference path based on the user_role field
    }],
    user_email: { type: String, required: [true, "email is required"], unique: [true, "this email is already in use"] },
    user_password: { type: String, required: [true, "user password is Required"] },
    user_role: {
        type: String,
        required: [true, "user role is Required"],
        enum: ['Student','Teacher'] // Enum to specify allowed roles
    },
    user_status: { type: Number, required: [true, "user status is Required"] },
});

const teacher_registrastion_schema = new Schema({
    teacher_name: { type: String, require: [true, "teacher name is required"] },
    teacher_email: { type: String, require: [true, "teacher email is required"] },
    subject: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
});

export const Student = mongoose.model("Student", student_registrastion_schema)
export const Users = mongoose.model('Users', user_schema);
export const Teacher = mongoose.model('Teacher', teacher_registrastion_schema);