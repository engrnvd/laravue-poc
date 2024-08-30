/*
* The config object basically accepts all parameters that fetch does:
* https://developer.mozilla.org/en-US/docs/Web/API/fetch
* Other than that, following parameters can be sent
* delay: To delay the execution.Type: Number. Unit: milliseconds. Default: 0
* delayFirstRequest: Whether you want to delay the first request. Type: Boolean. default: false
* pagination: Whether to request paginated data. Type: Bool. Default: false
* paginationMode: replace | append. Type: Bool. Default: 'replace'. Set to 'append' to implement "load more" feature)
* */
import { FileHelper } from 'nvd-js-helpers/FileHelper'
import { _deepClone } from 'nvd-js-helpers/misc'
import { useNotify } from 'nvd-u/composables/Notifiy'
import { env } from '../env'
import { useAuthStore } from '../stores/auth.store'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'DELETE' | 'HEAD' | 'CONNECT' | 'TRACE'

export class FetchRequest {
  url
  firstRequest = true
  lastRequestId: any = null
  data: any = []
  error = ''
  loading = false
  loaded = false
  perPageOriginal: number = null
  allLoaded = false
  config: RequestInit = {}
  delay = 0
  delayFirstRequest = false
  pagination = false
  resToJson = true
  paginationMode: 'append' | 'replace' = 'replace'
  params: Object = {
    page: 1,
    perPage: 10
  }

  withProps(props: Partial<FetchRequest>) {
    for (const prop in props) {
      // @ts-ignore
      if (typeof props[prop] === 'object') {
        // @ts-ignore
        this[prop] = { ...this[prop], ...props[prop] }
      } else {
        // @ts-ignore
        this[prop] = props[prop]
      }
    }
    return this
  }

  get hasLoadedData() {
    // @ts-ignore
    const data = this.pagination ? this.data?.data : this.data
    return this.loaded && data?.length
  }

  constructor(url: string, method: HttpMethod = 'GET', config: RequestInit = {}) {
    this.url = url

    this.mergeConfig(config)
    this.config.method = method
  }

  mergeConfig(config: RequestInit) {
    this.config = { ...this.config, ...config }
  }

  handleError(res: any) {
    if (typeof res === 'string' && res.match(/Failed to execute 'setRequestHeader' on 'XMLHttpRequest'/)) {
      this.logoutAndRefresh()
    }

    if (typeof res === 'string') this.error = res
    else this.error = res?.message || res?.error || res

    const logoutErrors = ['Wrong number of segments', 'logged out', 'You are not logged in!', 'Unauthenticated.']
    if (logoutErrors.includes(this.error)) {
      this.logoutAndRefresh()
    }

    const notify = useNotify()
    notify.error('Something went wrong!', this.error)
  }

  logoutAndRefresh() {
    const auth = useAuthStore()
    auth.user = null
    auth.authToken = null
    window.location.href = '/login'
  }

  appendParams(url: string) {
    let params = _deepClone(this.params)
    if (!this.pagination || this.paginationMode != 'replace') {
      delete params.page
      delete params.perPage
    }
    let query = new URLSearchParams(params).toString()
    return query ? url + '?' + query : url
  }

  send(config: RequestInit = {}) {
    return new Promise((resolve, reject) => {
      if (!this.url) {
        reject('No url to send request to')
        return
      }

      // check for pagination
      if (this.pagination && !this.data.data) {
        // @ts-ignore
        this.data = { data: [] }
      }

      this.mergeConfig(config)
      config = this.config

      // make request
      this.loading = true
      this.loaded = false
      this.error = ''
      let delay = this.delay || 0
      if (this.firstRequest && !this.delayFirstRequest) delay = 0

      if (this.lastRequestId) clearTimeout(this.lastRequestId)
      this.lastRequestId = setTimeout(() => {
        const auth = useAuthStore()
        // append the base url
        let url = env.apiUrl + this.url.replace(/^\//, '')
        // attach token if available
        config.headers = config.headers || {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
        let token = auth.authToken
        if (token) { // @ts-ignore
          config.headers.Authorization = `Bearer ${token}`
        }

        if (this.params) url = this.appendParams(url)

        // @ts-ignore
        fetch(url, config).then(async (res: Response) => {
          let output = res
          if (this.resToJson) {
            try {
              output = await res.json()
            } catch (e) {
            }

            if (!res.ok) {
              this.handleError(output)
              return
            }
          }

          return output
        }).then((res: any) => {
          // @ts-ignore
          if (res?.status === 'fail') {
            this.handleError(res)
            return
          }

          // handle non 'load more' request
          if (!this.pagination || this.paginationMode !== 'append') {
            this.data = res
            return
          }

          // handle 'load more' request
          // @ts-ignore
          this.params.cursor = res.next_cursor
          this.data.next_cursor = res.next_cursor
          if (!this.data?.data?.length) { // first request
            this.data = res
            return
          }
          this.data.data = this.data.data.concat(res.data)
          if (res.hasOwnProperty('has_more')) this.data.has_more = res.has_more
        }).catch(res => {
          this.handleError(res)
          // @ts-ignore
        }).finally(() => {
          this.firstRequest = false
          this.loading = false
          this.loaded = true
          if (this.error) reject(this.error)
          else resolve(this.data)
        })
      }, delay)
    })
  }

  download(filename, config: RequestInit = {}) {
    this.resToJson = false
    return this.send(config).then(res => {
      // @ts-ignore
      return res.blob().then(blob => {
        FileHelper.downloadBlob(blob, filename)
      })
    })
  }

  upload(config: RequestInit, files: any[] = [], key = 'attachments', single = false) {
    if (files instanceof File) {
      // @ts-ignore
      files = [files]
    }

    if (files.length) {
      let formData = new FormData()
      if (config.hasOwnProperty('data')) {
        // @ts-ignore
        for (let key in config.body) {
          // @ts-ignore
          formData.set(key, typeof config.body[key] === 'object' ? JSON.stringify(config.body[key]) : config.body[key])
        }
      }
      if (single) {
        formData.append(key, files[0])
      } else {
        files.forEach(function (f) {
          formData.append(key + '[]', f)
        })
      }

      config.body = formData
    }

    return this.send(config)
  }
}



