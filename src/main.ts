import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import formkit from './plugins/formkit/formkit'

createApp(App)
  .component('Icon',FontAwesomeIcon)
  .use(router)
  .use(formkit.formkitPlugin,formkit.formkitConfig)
  .mount('#app')
