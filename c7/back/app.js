// const http= require('http');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');

const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();


db.sequelize.sync()
    .then( () => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

passportConfig();

if(process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
} else {
    app.use(morgan('dev'));
}


// app.use(
//     cors({
//         origin: true,
//         // origin: 'http://localhost:3060',
//         credentials: true,
//     })
// );
app.use(cors({
    origin: ['http://localhost', 'https://nodebird.com', 'http://192.168.208.131/'],
    credentials: true,
}));
app.use('/', express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req, res) => {
    res.send('hello express');
});
// app.get('/post', (req, res) => {
//     res.json([
//         { id: 1, content: 'hello' },
//         { id: 2, content: 'hello2' },
//         { id: 3, content: 'hello3' },
//     ]);
// });

app.use('/post',postRouter);
app.use('/posts',postsRouter);
app.use('/user',userRouter);
app.use('/hashtag',hashtagRouter);

// 에러 처리 미들웨어는 여기에 내부적 존재

// 직접 에러 처리 미들웨어를 특별히 바꾸고 싶을 때
// app.use((err, req, res, next) => {
//
// })

app.listen(80, () => {
    console.log('서버 실행 중!');
});

/*
* 주로 많이 쓰는 restAPI
* app.get : 가져오다
* app.post : 생성하다
* app.put : 전체 수정
* app.delete : 제거
* app.patch : 부분 수정
* app.options : 찔러보기
* app.head : 헤더만 가져오기 (헤더/바디)
* */


/*
const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        if(req.url === '/api/post') {

        }
    } else if (req.method === 'POST') {
        if(req.url === '/api/post') {

        }
    } else if (req.method === 'DELETE') {
        if(req.url === '/api/post') {

        }
    }
    console.log(req.url, req.method)
    res.write('<h1>Hello node1</h1>');
    res.write('<h2>Hello node2</h2>');
    res.write('<h3>Hello node3</h3>');
    res.write('<h4>Hello node4</h4>');
    res.end('<h5>Hello node5</h5>');
})
server.listen(3065, () => {
    console.log('서버 실행 중');
});*/
