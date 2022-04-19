require('dotenv').config();

import koa from 'koa';
const Router = require('koa-router');
const bodyParser = require('koa-bodyParser');
const mongoose = require('mongoose');

const { PORT, MONGO_URI } = process.env;

const app = new koa();
const router = new Router();

mongoose
.connect(MONGO_URI, { useNewUrlParser: true})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.error(e);
})

router.get('/', ctx => {
  ctx.body = '홈';
})

router.get('/about/:name?', ctx => {
  const { name } = ctx.params;
  ctx.body = name?`${name}의 소개`:'소개';
})

router.get('/posts', ctx => {
  const { id } = ctx.query;
  ctx.body = id?`포스트${id}`:'포스트 아이디가 없습니다.';
})

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`port ${port}`)
})

