import { useStorage } from 'nvd-use-storage'
import { defineStore } from 'pinia'
import type { User } from 'src/interfaces/User.interface'
import { TOKEN_KEY, USER_KEY } from '../constants'
import { FetchRequest } from '../helpers/fetch-request'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    form: {
      name: '',
      email: '08es34@gmail.com',
      password: '123456',
      otp: '',
      newPassword: '',
    },
    modals: {
      login: false,
    },
    loginReq: new FetchRequest('login', 'POST'),
    signupReq: new FetchRequest('register', 'POST'),
    logoutReq: new FetchRequest('logout', 'POST'),
    forgotReq: new FetchRequest('forgot-password', 'POST'),
    resetReq: new FetchRequest('reset-password', 'POST'),
    emailVerificationReq: new FetchRequest('send-verification-email', 'POST'),
    refreshUserReq: new FetchRequest('user', 'GET'),
    user: useStorage(USER_KEY) as User,
    authToken: useStorage(TOKEN_KEY),
  }),
  getters: {
    isLoggedIn: state => state.user && state.authToken,
  },
  actions: {
    showLoginModal() {
      this.modals.login = true
    },
    logUserIn(userData: any) {
      this.authToken = userData.token
      this.user = userData.user
    },
    register() {
      return this.signupReq.send({
        body: JSON.stringify(this.form)
      }).then((data: any) => {
        this.logUserIn(data)
      })
    },
    login() {
      return this.loginReq.send({
        body: JSON.stringify(this.form)
      }).then((data: any) => {
        this.logUserIn(data)
      })
    },
    sendForgotReq() {
      return this.forgotReq.send({
        body: JSON.stringify({ email: this.form.email })
      }).then((data: any) => {
        this.logUserIn(data)
      })
    },
    resetPassword() {
      return this.resetReq.send({
        body: JSON.stringify({ email: this.form.email, otp: this.form.otp, password: this.form.newPassword })
      }).then((data: any) => {
        this.logUserIn(data)
      })
    },
    logout() {
      return this.logoutReq.send().then((data: any) => {
        this.authToken = null
        this.user = null
      })
    },
    refreshUser() {
      return this.refreshUserReq.send().then((data: any) => {
        if (data.id && data.email) this.user = data
      })
    },
  },
})
