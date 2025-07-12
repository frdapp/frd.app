import { createApp } from 'vue'
import Prompt from './Prompt.vue'

const Confirm = {}

Confirm.install = app => {

  let instance
  let container = null

  //必须通过handleClose 清理掉旧的实例后，新的才能打开
  const loadPrompt = async function(message,value="") {
    if (container) return

    let options={
      "message":message,
      "value":value,
      "handleClose":function () {
        document.body.removeChild(container)
        instance.unmount()
        container = null
      }
    }


    container = document.createElement('div')
    instance = createApp(Prompt, options)

    var real_instance=instance.mount(container)
    document.body.appendChild(container)

    return new Promise(async (resolve, reject) => {
      const result= await real_instance.show()

      real_instance.handleClose()

      resolve(result)
    })
  }

  app.config.globalProperties.$prompt = loadPrompt
}

export default Confirm