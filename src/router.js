import Index from './views/index/index';
import Post from './views/post/post';

const router = [{
    path: '/',
    component: Index,
    exact: true
  },{
    path: '/post/:id"',
    component: Post,
    exact: false
}]

export default router;