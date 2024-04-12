import * as quizmodel from '../model/quiz.js';
import * as subjectmodel from '../model/subject.js';

export const delete_quiz = async (req, res) => {

    console.log('delete_quiz')

    try {
        // Step 1: Remove the quiz record from the Quiz collection
        await quizmodel.Quizzes.findByIdAndDelete(req.body.quizId);

        // Step 2: Remove the reference to the deleted quiz from the Quizzes array in the Subject collection
        await subjectmodel.Subject.updateMany({}, { $pull: { Quizzes: req.body.quizId } });

        res.status(200).json({ message: 'Quiz record deleted successfully' });

        console.log('Quiz record deleted successfully.');
    } catch (error) {
        console.error('Error deleting quiz record:', error);
    }



}