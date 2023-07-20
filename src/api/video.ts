import request from '../utils/request'

// 获取视频区 banner 轮播
export const getBannerApi = () => {
  return request.get('/front/banner')
}

// 获取视频区分类tab
export const getCategoryTabsApi = () => {
  return request.get('/front/category')
}

// 获取推荐
export const getHomeCategoryApi = () => {
  return request.get('/front/home')
}

// 获取最热
export const getHomeHotApi = (pageSize: number, pageNumber: number) => {
  return request.get(`/front/home/hot?pageSize=${pageSize}&pageNumber=${pageNumber}`)
}

// 获取最新
export const getHomeNewApi = (pageSize: number, pageNumber: number) => {
  return request.get(`/front/home/new?pageSize=${pageSize}&pageNumber=${pageNumber}`)
}
// 通过分类id获取二级分类
export const getHomeCagoryListApi = (categoryId: number) => {
  return request.get(`/front/home/category?categoryId=${categoryId}`)
}

// 根据二级分类id查询全部的视频
export const getVideoSecondCategoryApi = (pageSize: number, pageNumber: number, categoryId: number) => {
  return request.get(`/front/video/secondCategory/${categoryId}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
}

// 根据视频id获取详情
export const getVideoDetailsApi = (videoId: number) => {
  return request.get(`/front/video/${videoId}`)
}

// 创建浏览记录
export const setBrowseApi = (userId: string, videoId: string) => {
  return request.post(`/front/browse`, {
    userId,
    videoId
  })
}

// 根据视频id获取当前点赞数、收藏数、关注数
export const geVideoCountApi = (videoId: number, userId: any) => {
  if (userId) {
    return request.get(`/front/video/videoInfo/${videoId}?userId=${userId}`)
  }
  return request.get(`/front/video/videoInfo/${videoId}`)
}

// 根据视频详情id获取推荐视频
export const getVideoRecommendApi = (videoId: number) => {
  return request.get(`/front/video/recommend/${videoId}`)
}
