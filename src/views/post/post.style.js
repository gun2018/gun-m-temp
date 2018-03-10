import styled from 'styled-components';
import px2rem from '../../styles/px2rem';



export const PostHeader = styled.div`
  width: 100%;
  height: ${px2rem(540)};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  > .title {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: ${px2rem(60)} ${px2rem(30)} 0;
    position: relative;
    background: linear-gradient(180deg, rgba(0,0,0,0.05) 5%,rgba(0,0,0,0.85) 100%);
    > h1 {
      position: absolute;
      bottom: ${px2rem(160)};
      font-size: ${px2rem(52)};
      margin: 0;
      color: #FFFFFF;
    }
  }
`;

export const  PostMeta = styled.div`
  position: absolute;
  color: rgba(255,255,255,0.5);
  bottom: ${px2rem(40)};
`;


export const PostDetail = styled.div`
  padding: ${px2rem(30)} ${px2rem(30)} 0;
  > p {
    font-size: ${px2rem(30)};
    line-height: ${px2rem(50)};
    color: rgba(0,0,0,0.7);
    margin-bottom: ${px2rem(40)};
    img {
      width: 100%;
    }
  }
`;