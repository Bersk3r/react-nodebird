const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');

const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                // attributes: ['id', 'nickname', 'email'],
                attributes: {
                    exclude: [ 'password' ],
                },
                include: [{
                    model: Post,
                }, {
                    model: User,
                    as: 'Followings',
                }, {
                    model: User,
                    as: 'Followers',
                },]
            })
            // return res.status(200).json(user);
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
}); // POST /user/login

router.post('/', async (req, res, next) => {
   try {
       const exUser = await User.findOne({
        where: {
            email: req.body.email,
        }
       });
       if(exUser) {
          return res.status(403).send('이미 사용중인 아이디입니다.')
       }
       const hashedPassword = await bcrypt.hash(req.body.password, 10);
       await User.create({
           email: req.body.email,
           nickname: req.body.nickname,
           password: hashedPassword,
       });
       // res.json();
       // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060');
       // res.setHeader('Access-Control-Allow-Origin', '*');
       res.status(201).send('OK');
   } catch (error) {
        console.error(error);
        next(error); // status 500
   }
});

router.post('/logout', (req, res, next) => {
    // console.log(req.user);
    req.logout(() => {
        res.redirect('/');
    });
    // req.logout();
    req.session.destroy();
    res.send('ok');
})
router.delete('/', (req, res) => {
    res.json({ id: 1 });
});

module.exports = router;