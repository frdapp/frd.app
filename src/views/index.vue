<template>


<Header />




<div class="container" style="min-height:800px">

    <div class="col-sm">
     


        <div class="blog">
            <h3 class="blog-title">spring boot Filter 实现用户身份验证</h3>
            <div class="blog-content">
                <pre>
                在spring boot中实现用户身份验证，需要在框架的请求过程中拦截响应。 有两个方式可以拦截， 第一是过滤器，第二是拦截器。  
这里仅说明如何使用过滤器拦截请求，实现用户身份验证。

首先增加过滤器  fiter/LoginFilter.java  

其次需要创建一个项目的Configuration用来增加过滤器。 MyConfigurationn.java  

然后增加一个 Auth.java ，用来存储用户信息。当用户登陆后， 通过检查http 请求头中的 token ，
寻找是否存在对应的用户，如果存在，则存入 Auth 。 后续其它地方都可以通过 Auth 获取当前用户。

spring boot 是一个多线程模型。 每个请求是一个线程。 我们需要让Auth 在同一个线程中保持固定，且不能被其他线程访问。
这里使用 ThreadLocal 来实现线程共享数据。

过滤逻辑说明 LoginFilter.java  :: doFilter

实现检查url,是否需要登陆
如果需要登陆，获取请求头中的token,并获取用户
如果能获取用户，则存入Auth ,否则重定向到错误接口
</pre>

            </div>
        </div>

             
        <div class="blog">
            <h3 class="blog-title">spring boot Filter 实现用户身份验证</h3>
            <div class="blog-content">
                <pre>
                在spring boot中实现用户身份验证，需要在框架的请求过程中拦截响应。 有两个方式可以拦截， 第一是过滤器，第二是拦截器。  
这里仅说明如何使用过滤器拦截请求，实现用户身份验证。

首先增加过滤器  fiter/LoginFilter.java  

其次需要创建一个项目的Configuration用来增加过滤器。 MyConfigurationn.java  

然后增加一个 Auth.java ，用来存储用户信息。当用户登陆后， 通过检查http 请求头中的 token ，
寻找是否存在对应的用户，如果存在，则存入 Auth 。 后续其它地方都可以通过 Auth 获取当前用户。

spring boot 是一个多线程模型。 每个请求是一个线程。 我们需要让Auth 在同一个线程中保持固定，且不能被其他线程访问。
这里使用 ThreadLocal 来实现线程共享数据。

过滤逻辑说明 LoginFilter.java  :: doFilter

实现检查url,是否需要登陆
如果需要登陆，获取请求头中的token,并获取用户
如果能获取用户，则存入Auth ,否则重定向到错误接口
</pre>

            </div>
        </div>

             
        <div class="blog">
            <h3 class="blog-title">spring boot Filter 实现用户身份验证</h3>
            <div class="blog-content">
                <pre>
                在spring boot中实现用户身份验证，需要在框架的请求过程中拦截响应。 有两个方式可以拦截， 第一是过滤器，第二是拦截器。  
这里仅说明如何使用过滤器拦截请求，实现用户身份验证。

首先增加过滤器  fiter/LoginFilter.java  

其次需要创建一个项目的Configuration用来增加过滤器。 MyConfigurationn.java  

然后增加一个 Auth.java ，用来存储用户信息。当用户登陆后， 通过检查http 请求头中的 token ，
寻找是否存在对应的用户，如果存在，则存入 Auth 。 后续其它地方都可以通过 Auth 获取当前用户。

spring boot 是一个多线程模型。 每个请求是一个线程。 我们需要让Auth 在同一个线程中保持固定，且不能被其他线程访问。
这里使用 ThreadLocal 来实现线程共享数据。

过滤逻辑说明 LoginFilter.java  :: doFilter

实现检查url,是否需要登陆
如果需要登陆，获取请求头中的token,并获取用户
如果能获取用户，则存入Auth ,否则重定向到错误接口
</pre>

            </div>
        </div>


             
        <div class="blog">
            <h3 class="blog-title">spring boot Filter 实现用户身份验证</h3>
            <div class="blog-content">
                <pre>
                在spring boot中实现用户身份验证，需要在框架的请求过程中拦截响应。 有两个方式可以拦截， 第一是过滤器，第二是拦截器。  
这里仅说明如何使用过滤器拦截请求，实现用户身份验证。

首先增加过滤器  fiter/LoginFilter.java  

其次需要创建一个项目的Configuration用来增加过滤器。 MyConfigurationn.java  

然后增加一个 Auth.java ，用来存储用户信息。当用户登陆后， 通过检查http 请求头中的 token ，
寻找是否存在对应的用户，如果存在，则存入 Auth 。 后续其它地方都可以通过 Auth 获取当前用户。

spring boot 是一个多线程模型。 每个请求是一个线程。 我们需要让Auth 在同一个线程中保持固定，且不能被其他线程访问。
这里使用 ThreadLocal 来实现线程共享数据。

过滤逻辑说明 LoginFilter.java  :: doFilter

实现检查url,是否需要登陆
如果需要登陆，获取请求头中的token,并获取用户
如果能获取用户，则存入Auth ,否则重定向到错误接口
</pre>

            </div>
        </div>


             
        <div class="blog">
            <h3 class="blog-title">spring boot Filter 实现用户身份验证</h3>
            <div class="blog-content">
                <pre>
                在spring boot中实现用户身份验证，需要在框架的请求过程中拦截响应。 有两个方式可以拦截， 第一是过滤器，第二是拦截器。  
这里仅说明如何使用过滤器拦截请求，实现用户身份验证。

首先增加过滤器  fiter/LoginFilter.java  

其次需要创建一个项目的Configuration用来增加过滤器。 MyConfigurationn.java  

然后增加一个 Auth.java ，用来存储用户信息。当用户登陆后， 通过检查http 请求头中的 token ，
寻找是否存在对应的用户，如果存在，则存入 Auth 。 后续其它地方都可以通过 Auth 获取当前用户。

spring boot 是一个多线程模型。 每个请求是一个线程。 我们需要让Auth 在同一个线程中保持固定，且不能被其他线程访问。
这里使用 ThreadLocal 来实现线程共享数据。

过滤逻辑说明 LoginFilter.java  :: doFilter

实现检查url,是否需要登陆
如果需要登陆，获取请求头中的token,并获取用户
如果能获取用户，则存入Auth ,否则重定向到错误接口
</pre>

            </div>
        </div>


             
        <div class="blog">
            <h3 class="blog-title">spring boot Filter 实现用户身份验证</h3>
            <div class="blog-content">
                <pre>
                在spring boot中实现用户身份验证，需要在框架的请求过程中拦截响应。 有两个方式可以拦截， 第一是过滤器，第二是拦截器。  
这里仅说明如何使用过滤器拦截请求，实现用户身份验证。

首先增加过滤器  fiter/LoginFilter.java  

其次需要创建一个项目的Configuration用来增加过滤器。 MyConfigurationn.java  

然后增加一个 Auth.java ，用来存储用户信息。当用户登陆后， 通过检查http 请求头中的 token ，
寻找是否存在对应的用户，如果存在，则存入 Auth 。 后续其它地方都可以通过 Auth 获取当前用户。

spring boot 是一个多线程模型。 每个请求是一个线程。 我们需要让Auth 在同一个线程中保持固定，且不能被其他线程访问。
这里使用 ThreadLocal 来实现线程共享数据。

过滤逻辑说明 LoginFilter.java  :: doFilter

实现检查url,是否需要登陆
如果需要登陆，获取请求头中的token,并获取用户
如果能获取用户，则存入Auth ,否则重定向到错误接口
</pre>

            </div>
        </div>

             
        <div class="blog ">
            <h3 class="blog-title">spring boot Filter 实现用户身份验证</h3>
            <div class="blog-content">
                <pre>
                在spring boot中实现用户身份验证，需要在框架的请求过程中拦截响应。 有两个方式可以拦截， 第一是过滤器，第二是拦截器。  
这里仅说明如何使用过滤器拦截请求，实现用户身份验证。

首先增加过滤器  fiter/LoginFilter.java  

其次需要创建一个项目的Configuration用来增加过滤器。 MyConfigurationn.java  

然后增加一个 Auth.java ，用来存储用户信息。当用户登陆后， 通过检查http 请求头中的 token ，
寻找是否存在对应的用户，如果存在，则存入 Auth 。 后续其它地方都可以通过 Auth 获取当前用户。

spring boot 是一个多线程模型。 每个请求是一个线程。 我们需要让Auth 在同一个线程中保持固定，且不能被其他线程访问。
这里使用 ThreadLocal 来实现线程共享数据。

过滤逻辑说明 LoginFilter.java  :: doFilter

实现检查url,是否需要登陆
如果需要登陆，获取请求头中的token,并获取用户
如果能获取用户，则存入Auth ,否则重定向到错误接口
</pre>

            </div>
        </div>
      






    </div>
    <Pagination  style="padding-top:30px" />
</div>



<Footer />



</template>


<style>
    .blog {
        border-bottom:thin rgb(212, 209, 209) solid; 
        padding:10px;
        margin-top:20px;

    }
  
</style>


<script>
import Footer from "@/components/footer.vue"
import Pagination from "@/components/pagination.vue"
import Header from "@/components/header.vue"


export default {
    components:{
            Footer:Footer,
            Pagination:Pagination,
            Header:Header,

    }

}
</script>

