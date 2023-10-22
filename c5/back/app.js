// const http= require('http');
const express = require('express');

const app = express();

app.get('/',(req, res) => {
    res.send('hello express');
});
app.get('/api',(req, res) => {
    res.send('hello api');
});

app.get('/api/post', (req, res) => {
    res.json([
        { id: 1, content: 'hello' },
        { id: 2, content: 'hello2' },
        { id: 3, content: 'hello3' },
    ]);
});
app.post('/api/post', (req, res) => {
    res.json({ id: 1, content: 'hello' });
});
app.delete('/api/post', (req, res) => {
    res.json({ id: 1 });
});

app.listen(3065, () => {
    console.log('서버 실행 중');
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
