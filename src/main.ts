import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App)
  .component('Icon',FontAwesomeIcon)
  .use(router)
  .mount('#app')
