import axios from 'axios'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://';
axios.interceptors.request.use(config =>{
    NProgress.start()
    return config
})

axios.interceptors.response.use(config =>{
    NProgress.done()
    return config
})