<script lang="ts" setup>
import { ref } from "vue";
import tabVue from "../components/utils/tabs.vue";
import {
  Layout,
  LayoutSider,
  Menu,
  MenuItem,
  LayoutContent,
  LayoutHeader,
  SubMenu,
} from "ant-design-vue";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
} from "@ant-design/icons-vue";
import { roleStore } from "../store/role";
const selectedKeys = ref<string[]>(["控制台"]);
const collapsed = ref<boolean>(false);
const roleStores = roleStore();
console.log(roleStores.slide);

const iconList = [DesktopOutlined];

const getIcon = (icon: string): any => {
  const iconD = iconList.filter((v) => icon + "3" == v.name);
  return iconD[0];
};
</script>

<template>
  <Layout style="height: 100vh">
    <LayoutSider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <template v-for="item in roleStores.slide">
          <SubMenu v-if="item.child" :key="item.title">
            <template #title>
              <span>
                <component :is="getIcon(item.icon as any)"></component>
                <!-- <user-outlined /> -->
                <span>{{ item.title }}</span>
              </span>
            </template>
            <MenuItem v-for="citem in item.child" key="3">
              <component :is="getIcon(item.icon as any)"></component>
              <span>{{ citem.title }}</span>
            </MenuItem>
          </SubMenu>
          <MenuItem v-else>
            <span>{{ item.title }}</span>
          </MenuItem>
        </template>
      </Menu>
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </LayoutHeader>
      <div style="box-sizing: border-box;padding: 20px;">
        <tabVue></tabVue>
        <LayoutContent
          :style="{
            padding: '20px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <RouterView></RouterView>
        </LayoutContent>
      </div>
    </Layout>
  </Layout>
</template>

<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
