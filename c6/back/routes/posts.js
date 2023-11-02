const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const where = {};
        if (parseInt(req.query.lastId,10)) { // 초기 로딩이 아닐 때
            where.id = { [Op.lt] : parseInt(req.query.lastId, 10) }
        }
        const posts = await Post.findAll({
            where,
            // where: { id: lastId },
            limit: 10,
            // offset: 0, // 추가 및 삭제 시 오류가 많아, lastId를 많이 사용함
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: [ 'id' ],
            },{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }],
        });
        // console.log(posts);
        res.status(200).json(posts);
    } catch(error) {
        console.error(error);
        next(error);
    }
})

// pagenation : 무한 스크롤링 & 게시판

module.exports = router;