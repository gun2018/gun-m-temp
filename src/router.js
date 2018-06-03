import Index from './views/index/index';
import Post from './views/post/post';
// import Search from './views/search/search';
import UserCenter from './views/user/user_center';
import Message from './views/message/message';
import Thinking from './views/thinking/thinking';
import FollowerList from './views/user/follower_list';
import FanList from './views/user/fan_list';
import UserInfoCard from './views/user/user_info_card';
import MyPost from './views/my-post/my-post';
import NewPost from './views/new-post/new-post';

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
  // {
  //   path: '/search',
  //   component: Search,
  // },
  {
    path: '/user/post',
    component: MyPost,
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
    path: '/user-info-card',
    isShowFooter: false,
    component: UserInfoCard,
  },
  {
    path: '/new-post',
    isShowFooter: false,
    component: NewPost,
  },
];

export default router;
