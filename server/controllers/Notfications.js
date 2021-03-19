const Notif = require('../models/Notifications');
const { response } = require('express');


exports.saveNotifications = async (req, res) => {
    if(req.body.who && req.body.target && req.body.type)
    {
        await Notif.saveNotification(req.body.type, req.body.who, req.body.target)
        .then((response) => {
            if(response[0].affectedRows)
            {
                res.json({st : true});
            }
            else {
                res.json({status : false})
            }
        }).catch((err) => {
        })
    } else {
        res.json({status : false})
    }
}

exports.getUserNotifs = async (req, res) => {
    if(req.body.userId)
    {
        await Notif.getUserNotifs(req.body.userId)
        .then(response => {
            if(response)
            {
                if(response[0])
                    res.json({whoInfos : response[0]})
                else {
                }
            }
        }).catch((err) => {});

    }
}

exports.doILikeHim = async (req, res) => {
    if(req.body.myId && req.body.hisId)
    {
        await Notif.doILikeHim(req.body.myId, req.body.hisId)
        .then((response) => {
            if(response[0].length != 0)
                res.json({answer: "yes", resp: response});
            else if(response[0].length === 0)
                res.json({answer: "no"});
        })
    }
    else {
        res.json({status:false, answer:"erro"});
    }
}

exports.isMatched = async (req, res) => {
    if(req.body.myId && req.body.hisId)
    {
        await Notif.isMatched(req.body.myId, req.body.hisId)
        .then((response) => {
            if(response[0].length != 0)
                res.json({answer: "yes"});
            else if(response[0].length === 0)
                res.json({answer: "no"});
        })
    }
    else {
        res.json({status:false, answer:"erro"});
    }
}