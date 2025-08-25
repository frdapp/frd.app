// i18n.js 或 i18n/index.js
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'Hello world!',
    }
  },
  zh: {
    message: {
      hello: '你好，世界！',
    }
  }
}

const i18n = createI18n({
  locale: 'en', // 默认语言
  fallbackLocale: 'en',
  messages
})

export default i18n
