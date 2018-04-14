import Index from './views/index/index';
import Post from './views/post/post';
import Search from './views/search/search';
import UserCenter from './views/user/user_center';
import Message from './views/message/message';

const router = [
  {
    path: '/',
    component: Index,
    exact: true,
    isShowFooter: true,
  },
  {
    path: '/post/:id',
    component: Post,
    exact: false,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/user',
    isShowFooter: true,
    component: UserCenter,
  },
  {
    path: '/message',
    isShowFooter: true,
    component: Message,
  },
];

export default router;
