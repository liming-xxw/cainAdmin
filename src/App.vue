<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { roleStore } from "./store/role";
import { directivesUse } from './utils/directives'

const router = useRouter();
const roleStoreS = roleStore();

// 监控权限跳转，不要使用路由守卫，因为在动态请求加载路由的时候需要耗费一些时间，所以就会出现一瞬间的白屏
const RoleWatch = () => {
  if (roleStoreS.isLogin) {
    roleStoreS.setRoutes();
    router.replace(router.options.history.location);
    directivesUse()
  } else {
    router.push("/login");
  }
};

onMounted(() => {
  RoleWatch();
});
</script>

<template>
  <!-- 项目主入口 -->
  <div class="app"><RouterView></RouterView></div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
