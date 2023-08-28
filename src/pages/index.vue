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
  Avatar,
  Dropdown,
  MenuDivider,
  message,
} from "ant-design-vue";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  RadarChartOutlined,
  FormOutlined,
  TableOutlined,
} from "@ant-design/icons-vue";
import { roleStore } from "../store/role";
import { useRoute, useRouter } from "vue-router";
import { routers } from "../utils/dto/common";

const collapsed = ref<boolean>(false);
const roleStores = roleStore();
const userouter = useRouter();
const useroute = useRoute();
const iconList = [
  DesktopOutlined,
  RadarChartOutlined,
  FormOutlined,
  TableOutlined,
];
const selectedKeys = ref<string[]>(["/"]);
const openKeys = ref<string[]>(["控制台"]);
const silderOpen = () => {
  roleStores.slide.forEach((v: routers) => {
    if (v.child) {
      v.child.forEach((j: routers) => {
        if (j.path == useroute.path) {
          selectedKeys.value[0] = j.path;
          openKeys.value[0] = j.pageParent as string;
        }
      });
    }
  });
};

const getIcon = (icon: string): any => {
  const iconD = iconList.filter((v) => icon + "3" == v.name);
  return iconD[0];
};

// 退出登录方法
const exit = () => {
  roleStores.exit();
  message.error("退出登录成功，非常感谢你的使用");
  userouter.push("/login");
};

silderOpen();
</script>

<template>
  <Layout style="height: 100vh">
    <LayoutSider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        theme="dark"
        mode="inline"
      >
        <template v-for="item in roleStores.slide">
          <SubMenu v-if="item.child" :key="item.name">
            <template #title>
              <span>
                <component :is="getIcon(item.icon as any)"></component>
                <!-- <user-outlined /> -->
                <span>{{ item.title }}</span>
              </span>
            </template>
            <MenuItem
              v-for="citem in item.child"
              :key="item.path"
              @click="$router.push(item.path as string)"
            >
              <component :is="getIcon(item.icon as any)"></component>
              <span>{{ citem.title }}</span>
            </MenuItem>
          </SubMenu>
          <MenuItem
            v-else
            :key="item.path"
            @click="$router.push(item.path as string)"
          >
            <span>{{ item.title }}</span>
          </MenuItem>
        </template>
      </Menu>
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0">
        <div style="display: flex; justify-content: space-between">
          <div>
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
          </div>
          <div style="padding-right: 20px">
            <Dropdown>
              <Avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" />

              <template #overlay>
                <Menu>
                  <MenuItem> 用户名称:{{ roleStores.user.nickname }} </MenuItem>
                  <MenuDivider />
                  <MenuItem @click="exit()"> 退出登录 </MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </div>
        </div>
      </LayoutHeader>
      <div style="box-sizing: border-box; padding: 20px">
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
