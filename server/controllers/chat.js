const chat = require('../models/chat');


exports.people = async (req, res) => {
    // Getting the Id of people Who i can chat with (peopleIds) : 

    var userId = req.body.userId;
    var peopleIds = [];
    var tmp = [];
    await chat.peopleIds(userId).then((response) => {
        peopleIds = response[0].map((el) => {
          return el.user1 == userId ? el.user2 : el.user1
        })
    })
    ///////// we consider that borad is Username & Profile Picture && email
    
    var boards = []
    for(i = 0; i < peopleIds.length; i++)
    {
        await chat.peopleBoard(peopleIds[i]).then((hadik) => {
            boards.push(hadik[0][0])
        })
    }
    res.json({boards: boards});
    // console.log('boards', boards);
}

exports.getUserInfos = async (req, res) => {
    var userId = req.body.userId;
    await chat.getUserInfos(userId).then((hadik) => {
        res.json({myInfos: hadik[0][0]});
    })
}