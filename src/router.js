import Index from './views/index/index';
import Post from './views/post/post';
import Search from './views/search/search';
import UserCenter from './views/user/user_center';
import Message from './views/message/message';
import Thinking from './views/thinking/thinking';
import FollowerList from './views/user/follower_list';
import FanList from './views/user/fan_list';
import MyPost from './views/user/my_post';
import MyCommit from './views/user/my_commit';

const router = [
  {
    path: '/',
    component: Index,
    exact: true,
    isShowFooter: true,
  },
  {
    path: '/post',
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
    path: '/thinkings',
    isShowFooter: false,
    component: Thinking,
  },
  {
    path: '/message',
    isShowFooter: true,
    component: Message,
  },
  {
    path: '/fans',
    isShowFooter: false,
    component: FanList,
  },
  {
    path: '/followers',
    isShowFooter: false,
    component: FollowerList,
  },
  {
    path: '/my-commit',
    isShowFooter: false,
    component: MyCommit,
  },
  {
    path: '/my-post',
    isShowFooter: false,
    component: MyPost,
  },
];

export default router;
