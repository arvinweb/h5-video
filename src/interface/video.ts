// 轮播广告
export interface bannerFace {
  id: number
  createdAt: number
  updatedAt: number
  title: string
  imgUrl: string
  positional: string
  described: string
  linkUrl: string
}

export interface tabsFace {
  id: number
  name: string
  parentId: number
  children: Array<tabsGroup>
}
export interface tabsGroup {
  accountId: number
  browseCount: number
  described: any
  expireTime: string
  favoriteCount: number
  id: number
  isRecommend: number
  isTop: number
  loveCount: number
  name: string
  price: string
  purchaseCount: number
  startCount: number
  type: number
  url: string
  videoGroupId: number
}
