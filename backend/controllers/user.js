const User = require('../models/user')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        req.profile = user
        next()
    })
}

exports.hasAuthoriztion = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile.id === req.auth._id
    if (!authorized) {
        return req.status(403).json({
            error: "User is not authorizedto perform this action"
        })
    }
}

exports.allUsers = (req, res) => {
    users = User.find((err, users) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        res.json({ users })
    }).select("name email created updated")
}

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

// exports.updateUser = (req, res) => {
//     let user = req.profile
//     user = _.extend(user, req.body)
//     user.updated = Date.now()
//     user.save((err) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "You are not authorized to perform this action"
//             })
//         }
//         user.hashed_password = undefined
//         user.salt = undefined
//         res.json({ user })
//     })
// }
exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }

        let user = req.profile
        user = _.extend(user, fields)
        user.updated = Date.now()
        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }
        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
        })
    })
}

exports.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}

exports.deleteUser = (req, res) => {
    let user = req.profile
    user.remove((err, user) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        res.json({ message: "User deleted successfully" })
    })
} 