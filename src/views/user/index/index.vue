<script setup>
</script>

<template>
    <!-- Navigation-->
        <!-- Masthead-->
            <header class="masthead">
                <div class="container">
                    <div class="masthead-subheading">Welcome To Our Studio!</div>
                    <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
                </div>
            </header>
            <!-- Services-->
                <section class="page-section" id="products">
                    <div class="container">
                        <div class="text-center">
                            <h2 class="section-heading text-uppercase">Products</h2>
                            <h3 class="section-subheading text-muted">make life better.</h3>
                        </div>
                        <div class="row text-center">
                            <div class="col-md-4">
                                <span class="fa-stack fa-4x">
                                    <i class="fas fa-circle fa-stack-2x text-primary"></i>
                                    <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                                </span>
                                <h4 class="my-3">Email</h4>
                                <p class="text-muted">Create Your Own Email With Your Own Domain.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- About-->
                    <section class="page-section" id="about">
                        <div class="container">
                            <div class="text-center">
                                <h2 class="section-heading text-uppercase">About</h2>
                                <h3 class="section-subheading text-muted">木石科技.</h3>
                            </div>
                            <ul class="timeline">
                                <li>
                                    <div class="timeline-image"><img class="rounded-circle img-fluid" src="@/assets/img/about/1.jpg" alt="..." /></div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4>2025</h4>
                                            <h4 class="subheading">Created</h4>
                                        </div>
                                        <!--
                                        <div class="timeline-body">
                                            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p>
                                        </div>
                                        -->
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
</template>
<script>


            export default {
                data:function(){
                    return {
                    }
                },

                methods:{
                    logout:function(r){
				   var self=this;
			this.$api.logout().then(function(r){
			userStore.clear()
                            self.$router.push({"path":"/"});
                        });
                    }
                }
            
            }
        </script>
