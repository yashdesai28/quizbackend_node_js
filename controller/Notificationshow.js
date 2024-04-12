import * as notificationmodel from '../model/notification.js';


export const show_notification_list = async (req, res) => {

    console.log(req.body.id);

    let findnotification;
    await notificationmodel.Notification.find({ teacher_id: req.body.id })
        .populate('subject')
        .then((user) => {

            findnotification = user;
        })
        .catch((err) => {
            console.error(err);
            // Handle the error
            res.status(500).json({ error: 'Internal Server Error' });
        });


    console.log(findnotification);

    if (findnotification.length > 0) res.status(200).json(findnotification);
    else res.status(404).json([{ "nathi": 1 }]);

}

