import Index from './views/index/index';
import Post from './views/post/post';
import Search from './views/search/search';

const router = [
  {
    path: '/',
    component: Index,
    exact: true,
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
];

export default router;
