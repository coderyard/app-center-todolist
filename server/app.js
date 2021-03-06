const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const todoRouter = require('./routes/todo.js');
const memberRouter = require('./routes/members.js');
const {sequelize} = require('./models');

// express를 사용하기 위한 할당!
const app = express();

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

// morgan -> 테스트할 때 상태코드와 응답 처리 속도를 보기 위해 사용
app.use(morgan('dev'));
app.use(cors());
// req.body를 JSON 형식으로 파싱하기 위해 필요!
app.use(express.json());
// 라우터 두 가지를 놓고 각 접근 uri마다의 라우팅 분기!
app.use('/members', memberRouter);
app.use('/todos', todoRouter);

// 에러 처리를 위한 미들웨어
app.use((req, res, next)=>{
  res.sendStatus(404);
});

// 3000번 포트에서 서버를 열고, 서버가 열리면 콘솔에 로그를 띄워 알려줌
app.listen(3000, ()=>{
  console.log('server on *:3000');
});