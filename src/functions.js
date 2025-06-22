var func={

        confirmDelete:function(vue,url,title="提示"){

            vue.$confirm('此操作将永久删除该记录, 是否继续?', title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'

            }).then(() => {

                vue.$api.post(url).then(function(r){
                    vue.$message({ type: "success", message: "删除成功!" });
                    vue.search()
                })

            }).catch(() => { vue.$message({ type: "info", message: "已取消删除" }); });
        },

        today:function(){
            var day = new Date();
            day.setTime(day.getTime())
            var y=day.getFullYear()
            var m=(day.getMonth()+1) 
            if(m < 10 ) m ="0"+m

            var d=day.getDate();

            return y+"-"+m+"-"+d
        },


    nl2br:function(str) {
        str = str.replace(/\r\n/g, "<br />");
        str = str.replace(/(\n|\r)/g, "<br />");
        return str;
    }
}


export default func;
