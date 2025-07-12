// i18n.js 或 i18n/index.js
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'Hello world!',
      my_posts: 'My Posts'
    }
  },
  zh: {
    message: {
      hello: '你好，世界！',
      my_posts: '我的日志'
    }
  }
}

const i18n = createI18n({
  locale: 'zh', // 默认语言
  fallbackLocale: 'en',
  messages
})

export default i18n
