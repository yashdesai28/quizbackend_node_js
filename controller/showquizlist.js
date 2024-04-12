import * as subjectmodel from '../model/subject.js';


export const show_quiz_list = async (req, res) => {

    console.log(req.body.id);

    let findquiz;
    await subjectmodel.Subject.find({_id: req.body.id })
        .populate('Quizzes')
        .then((user) => {

            findquiz = user;
        }) 
        .catch((err) => {
            console.error(err);
            // Handle the error
            res.status(500).json({ error: 'Internal Server Error' });
        });


    console.log(findquiz[0]);

    if (findquiz.length > 0) res.status(200).json(findquiz[0]);
    else res.status(404).json([{"nathi":1}]);

}



export const show_quizall_list = async (req, res) => {

    console.log(req.body.id);

    let findquiz;
    await subjectmodel.Subject.find({Teacherid: req.body.id })
        .populate('Quizzes')
        .then((user) => {

            findquiz = user;
        }) 
        .catch((err) => {
            console.error(err);
            // Handle the error
            res.status(500).json({ error: 'Internal Server Error' });
        });


    console.log(findquiz[0]);

    if (findquiz.length > 0) res.status(200).json(findquiz);
    else res.status(404).json([{"nathi":1}]);

}

