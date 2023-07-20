import { showSuccessToast } from 'vant'
import { logout, getUserInfo } from '@/api/user'
import { UserFace } from '@/interface/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>()
    const userInfo = ref<UserFace>()
    const setUserInfo = (res: UserFace): void => {
      userInfo.value = res
      token.value = res.token
      if (token.value != '-1' && !!token.value) {
        getUser()
      }
    }

    const getUser = () => {
      getUserInfo().then((res: any) => {
        if (res) {
          res.token = token.value
          userInfo.value = res
        }
      })
    }

    // 必须加回调不然获取不到router变量
    const accountLogout = (fn: Function) => {
      logout().finally(() => {
        token.value = ''
        // userInfo.value = ''
        fn()
        showSuccessToast('退出成功')
      })
    }

    return {
      token,
      userInfo,
      setUserInfo,
      getUser,
      accountLogout
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: sessionStorage, paths: ['token', 'userInfo'] }]
    }
  }
)
