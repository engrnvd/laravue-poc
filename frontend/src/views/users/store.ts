import { defineStore } from 'pinia'
import { FetchRequest } from '@/helpers/fetch-request'
import { toFormData } from 'nvd-js-helpers/misc'
import { useNotify } from 'nvd-u//composables/Notifiy'
import { env } from 'src/env'
import type { User } from 'src/interfaces/User.interface'

const notify = useNotify()
const form = {
  name: '',
  email: '',
  password: '',
  is_admin: '',
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    form: { ...form },
    req: new FetchRequest('users', 'GET').withProps({
      pagination: true,
      delay: 500,
      params: {
        sort: 'id',
        sortType: 'desc',
        show_all: true,
      },
    }),
    createReq: new FetchRequest('users', 'POST'),
    onlineUserIdsReq: new FetchRequest('admin/online-users-ids', 'GET'),
    loginAsReq: new FetchRequest('admin/login-as-token', 'POST').withProps({ resToJson: false }),
  }),
  getters: {},
  actions: {
    loginAs(user: User) {
      this.loginAsReq.send({
        body: JSON.stringify({ id: user.id })
      }).then(async (res: any) => {
        let token = await res.text()
        window.open(`${env.appUrl}login-as?t=${token}`, '_blank')
      })
    },
    load() {
      this.req.send()
      this.onlineUserIdsReq.send()
    },
    create() {
      return this.createReq.send({
        body: toFormData(this.form)
      }).then(res => {
        this.req.data = this.req.data || { data: [] }
        // @ts-ignore
        this.req.data.data = this.req.data.data || []
        // @ts-ignore
        this.req.data.data.unshift(res)
        // @ts-ignore
        this.req.data.data.pop()
        this.resetForm()

        notify.success('Success', 'User created')
      })
    },
    resetForm() {
      this.form = { ...form }
    },
  },
})
