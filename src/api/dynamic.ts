import request from '../utils/request'

// 获取社区tag
export const getDynamicTagApi = () => {
  return request.get('/front/dynamicTag')
}
// 获取社区数据
export const getAllDynamicApi = (pageSize: number, pageNumber: number) => {
  return request.get(`/front/dynamicMessage?pageSize=${pageSize}&pageNumber=${pageNumber}`)
}

// 发布动态消息
export const setDynamicMessageApi = (content: string, tagId: Array<number>, title: string, imgUrl: string) => {
  return request.post('/front/dynamicMessage', {
    content,
    tagId,
    title,
    imgUrl
  })
}
