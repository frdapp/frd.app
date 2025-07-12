import { createApp } from 'vue'
import Main from './Alert.vue'

const Alert = {}

Alert.install = app => {

  let instance
  let container = null

  //必须通过handleClose 清理掉旧的实例后，新的才能打开
  const loadAlert = function(title,message,style) {
    if (container) return

    let options={
      "title":title,
      "message":message,
      "style":style,
      "handleClose": function () {
        document.body.removeChild(container)
        instance.unmount()
        container = null
      }
    }

    container = document.createElement('div')
    instance = createApp(Main, options)
    var real_instance=instance.mount(container)
    document.body.appendChild(container)

    return new Promise(async (resolve, reject) => {
      const result= await real_instance.show()

      resolve(result)
    })
  }

  app.config.globalProperties.$alert = loadAlert
}

export default Alert