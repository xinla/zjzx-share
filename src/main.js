import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/reset.css'
import './assets/styles/base.less'

// 视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

// mint-ui
import { Indicator,Toast } from 'mint-ui'
window.Toast = Toast;
window.Indicator = Indicator;
//工具函数
import Tool from './assets/js/methods'
Vue.use(Tool);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
  	window.GoTruth = this;
  },
  render: h => h(App)
}).$mount('#app')
