const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
    // console.log(req.headers);
    try {
       if(req.user) {
           const fullUserWithoutPassword = await User.findOne({
               where: { id: req.user.id },
               // attributes: ['id', 'nickname', 'email'],
               attributes: {
                   exclude: [ 'password' ],
               },
               include: [{
                   model: Post,
                   attributes: ['id'],
               }, {
                   model: User,
                   as: 'Followings',
                   attributes: ['id'],
               }, {
                   model: User,
                   as: 'Followers',
                   attributes: ['id'],
               },]
           })
           res.status(200).json(fullUserWithoutPassword);
       } else {
           res.status(200).json(null);
       }
   } catch(error) {
       console.error(error);
       next(error);
   }
});
router.get('/:userId', async (req, res, next) => { // GET /user/1
    try {
        const fullUserWithoutPassword = await User.findOne({
            where: { id: req.params.userId },
            // attributes: ['id', 'nickname', 'email'],
            attributes: {
                exclude: [ 'password' ],
            },
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            },]
        })
       if(fullUserWithoutPassword) {
           const data =  fullUserWithoutPassword.toJSON(); // 쓸 수 있는 데이터인 JSOn으로 바꿔야함 (Sequelize에서 제공하는 데이터는 JSON이 아님)
           data.Posts = data.Posts.length; // 개인정보 침해 방지 목적
           data.Followers = data.Followers.length;
           data.Followings = data.Followings.length;
           res.status(200).json(data);
       } else {
           res.status(404).json('존재하지 않는 사용자입니다.');
       }
   } catch(error) {
       console.error(error);
       next(error);
   }
});
router.post('/login', isNotLoggedIn, (req, res, next) => {
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
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                },]
            })
            // return res.status(200).json(user);
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
}); // POST /user/login

router.post('/',  isNotLoggedIn, async (req, res, next) => {
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

router.post('/logout',  isLoggedIn,(req, res, next) => {
    // console.log(req.user);
    req.logout(() => {
        res.redirect('/');
    });
    // req.logout();
    req.session.destroy();
    res.send('ok');
})
// router.delete('/', (req, res) => {
//     res.json({ id: 1 });
// });

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: parseInt(req.params.userId, 10)} });
        if(!user) {
            res.status(403).send('존재하지 않는 사용자입니다.');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10)});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/unfollow
    try {
        const user = await User.findOne({ where: { id: parseInt(req.params.userId, 10)} });
        if(!user) {
            res.status(403).send('존재하지 않는 사용자입니다.');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10)});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/1/unfollow
    try {
        const user = await User.findOne({ where: { id: parseInt(req.params.userId, 10)} });
        if(!user) {
            res.status(403).send('존재하지 않는 사용자는 차단할 수 없습니다.');
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10)});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if(!user) {
            res.status(403).send('존재하지 않는 사용자입니다.');
        }
        const followers = await user.getFollowers();
        res.status(200).json(followers);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if(!user) {
            res.status(403).send('존재하지 않는 사용자입니다.');
        }
        const followings = await user.getFollowings();
        res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;