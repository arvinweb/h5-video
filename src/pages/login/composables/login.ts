import { useUserStore } from '~@/store/user'
import { register, login } from '@/api/user'
export const useLogin = () => {
  const userStore = useUserStore()

  const router = useRouter()

  const form = reactive({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const loading = ref<boolean>(false)

  const onSubmit = () => {
    loading.value = true
    const { username, password } = form
    login(username, password)
      .then((res: any) => {
        if (res?.token) {
          // 模拟 type
          res.type = 1
          res.money = 125
          showSuccessToast('登录成功')
          userStore.setUserInfo(res)
          router.push('/')
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
  const onRegister = () => {
    loading.value = true
    const { username, password, confirmPassword } = form
    register(username, password, confirmPassword).then((res: any) => {
      if (res) {
        login(username, password).then((res: any) => {
          if (res?.token) {
            // 模拟 type
            res.type = 1
            showSuccessToast('注册成功')
            userStore.setUserInfo(res)
            router.push('/')
          }
        })
      } else {
        loading.value = false
      }
    })
  }

  return {
    form,
    loading,
    onSubmit,
    onRegister
  }
}
