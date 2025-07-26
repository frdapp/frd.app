import { createApp } from 'vue'
import Main from './Dialog.vue'

const Dialog = {}

Dialog.install = app => {

  let instance
  let container = null

  //必须通过handleClose 清理掉旧的实例后，新的才能打开
  const loadDialog = function(component,params) {
    if (container) return

    let options={
      "component":component,
      "params":params ? params : {},
      "handleClose":function () {
        document.body.removeChild(container)
        instance.unmount()
        container = null
      }
    }



    container = document.createElement('div')
    instance = createApp(Main, options)
    let real_instance=instance.mount(container)
    document.body.appendChild(container)


    return new Promise(async (resolve, reject) => {
      const result= await real_instance.show()
      real_instance.handleClose()

      resolve(result)
    })
  }

  app.config.globalProperties.$dialog = loadDialog
}

export default Dialog