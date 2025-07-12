import { createApp } from 'vue'
import Main from './Confirm.vue'

const Confirm = {}

Confirm.install = app => {

  let instance
  let container = null

  //必须通过handleClose 清理掉旧的实例后，新的才能打开
  const loadConfirm = async function(message) {
    if (container) return


    let options={
      "message":message,
      handleClose : function()  {
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

      real_instance.handleClose()

      resolve(result)
    })
  }

  app.config.globalProperties.$confirm = loadConfirm
}

export default Confirm