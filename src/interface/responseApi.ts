// 轮播广告
export interface bannerFace {
  id: number;
  createdAt: number;
  updatedAt: number;
  title: string;
  imgUrl: string;
  positional: string;
  described: string;
  linkUrl: string;
}

// 视频标签
export interface tagListFace {
  id: number;
  name: string;
}

// 视频分组
export interface videoGroupFace {
  id: number;
  createdAt: number;
  updatedAt: number;
  groupName: string;
  accountId: number;
}

export interface tabsGroup {
  accountId: number;
  browseCount: number;
  described: any;
  expireTime: string;
  favoriteCount: number;
  id: number;
  isRecommend: number;
  isTop: number;
  loveCount: number;
  name: string;
  price: string;
  purchaseCount: number;
  startCount: number;
  type: number;
  url: string;
  videoGroupId: number;
}
export interface tabsGroup {
  children: Array<any>;
  id: number;
  name: string;
}

// 首页头部tab
export interface tabsFace {
  id: number;
  name: string;
  parentId: number;
  children: Array<tabsGroup>;
}

// 通知信息
export interface messageFace {
  id: number;
  createdAt: number;
  updatedAt: number;
  title: string;
  content: string;
  publicTime: string;
}

// 标签视频列表
export interface tagListFace {
  data: Array<any>;
  pageNumber: number;
  pageSize: number;
  total: number;
}

// 系统配置
export interface webSiteFace {
  createdAt: string;
  headType: string;
  id: number;
  isPure: number;
  logoUrl: string;
  name: string;
  updatedAt: string;
  vipTime: string;
}
