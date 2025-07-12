<script setup>
import Input from "@/components/Input.vue";
import Breadcrumbs from "@/layout/manage/breadcrumbs.vue";
import Sidebar from "@/layout/manage/sidebar.vue";
import VBox from "@/components/VBox.vue"
import HBox from "@/components/HBox.vue"
</script>

<template>
  <HBox style="min-height:100%">



    <Sidebar />

    <VBox>

             <router-view />
    </VBox>


    <!--
    <footer class="footer">
        <VBox style="width:100%;height:100px;align-items: center;background-color:#eaeae4">

                <div class="">Copyright &copy; frd.app 2025</div>
        </VBox>
    </footer>
    -->


  </HBox>
</template>

<script>
export default {
  props: {
    minNav: {
      type: Function,
      default: () => {},
    },
    color: {
      type: String,
      default: "text-body",
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
  },

  methods: {
    toggleSidebar() {
      this.navbarMinimize();
    },
  },
};
</script>
