<script setup>
  import VBox from "@/components/VBox.vue"
    import HBox from "@/components/HBox.vue"
    import Input from "@/components/Input.vue"
    import Select from "@/components/Select.vue"
    import Button from "@/components/Button.vue"
    import Textarea from "@/components/Textarea.vue"
</script>

<template>
  <table class="layout-table" style="">
    <tr>
      <td>
        <label class="form-control-label">标题</label>
      </td>
      <td>
        <Input class="right_column" ref="title" v-model="form.title" autocomplete="on" />
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label">描述</label>
      </td>
      <td>
        <Textarea class="right_column" v-model="form.content" :rows=25 cols=60 style="" />
      </td>
    </tr>

    <tr>
      <td>
        <label class="form-control-label"></label>
      </td>
      <td>
        <Button type="primary" @click="submit(true)">保存</Button>
        <Button v-if="mode='update'" type="primary" @click="submit(false)">仅保存</Button>
        <Button @click="cancel">取消</Button>
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    mounted:function(){

      var url="/api/admin/post/get"


      var item_id=this.$route.query.id;
      var self=this;

      if(item_id)
      {
        this.mode="update"
        this.$api.get(url,{params:{"id":item_id}}).then(function(r){
          self.form=r.data
          self.form.tag_string=self.form.tags.join(",")
        });
      }
    },
    data: function(){
      return {
        permissions:[
          {
            value: 'PRIVATE',
            label: '私有',
          },
          {
            value: 'PUBLIC',
            label: '公开',
          },
          {
            value: 'SHARE',
            label: '分享',
          }
        ],
        mode:"create",
        editor_options: {
          // lineNumbers: true,
          // styleActiveLine: true,
          // styleSelectedText: true,
          // lineWrapping: true,
          // indentWithTabs: true,
          // tabSize: 2,
          // indentUnit: 2
        },
        form:{
          id:0,
          permission:"PRIVATE",
          tags:[],
          tag_string:"",
          //title:this.$func.today(),
          title:"",
          content:'',
        },
      }
    },

    methods:{
      submit:async function(back){
        if(!this.form.tag_string)
        {
          this.form.tags=[];
        }
        else
        {
          this.form.tags=[]

          var arr=this.form.tag_string.split(",")
          console.log(arr)
          for(var k in arr)
          {
            let tag=arr[k].trim()
            if(tag)
            {
              this.form.tags.push(tag)
            }
          }
        }

        if(this.form.id)
        {
          var response=await this.$api.admin_post_update(this.form);
        }
        else
        {
          var response=await this.$api.admin_post_create(this.form);
        }

        if(response != false)
        {
          if(back)
          {
            this.$router.back(-1);
          }
          else
          {
            this.$alert("SUCCESS","保存成功!" );
          }
        }


      },
      reset:function(path){
        this.form.title=""
        this.form.permission="PRIVATER"
        //this.form.tags=""
        this.form.content=""
      },
      cancel:function(path){
        this.$emit("dialog_cancel")
        this.$router.back();
      }
    },
    components: {
    },
  }
</script>

<style scoped>
.form-control-label{
  width:100px;
}

                .right_column{
                  flex:1;
                  max-width:700px;
                }
</style>
