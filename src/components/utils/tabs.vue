<script setup lang="ts">
import { Tabs, TabPane } from "ant-design-vue";
import { RedoOutlined } from "@ant-design/icons-vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { TabsDto } from "../../utils/dto/common";
import { tabsStore } from "../../store/tabs";
import { ref } from "vue";

const tabsStores = tabsStore();
const UseRoute = useRoute();
const UseRouter = useRouter();
const activeKey = ref<string>(UseRoute.path);

onBeforeRouteUpdate((to) => {
  const name = String(to.meta.title);
  const path = to.path;
  const is = tabsStores.tabs.filter((v: TabsDto) => {
    return v.path === path;
  });
  if (is.length == 0) {
    tabsStores.setTabs({ name: name, path: path });
  }
  activeKey.value = path;
});

const TabsChange = (key: any) => {
  UseRouter.push(key);
};

//  删除tab方法
const remove = (key: string) => {
  const i = tabsStores.tabs.findIndex((x: TabsDto) => x.path == key);
  if (i != -1) {
    tabsStores.updateTabs(key);
    if (tabsStores.tabs.length && activeKey.value === key) {
      UseRouter.push(tabsStores.tabs[i - 1].path);
      if (i - 1 >= 0) {
        activeKey.value = tabsStores.tabs[i - 1].path;
      } else {
        activeKey.value = tabsStores.tabs[0].path;
      }
    }
  }
};

const TagsEdit = (targetKey: any, action: any) => {
  if (action == "remove") {
    remove(targetKey);
  } else if (action == "refresh") {
  }
};
</script>

<template>
  <div style="height: 40px">
    <Tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      hide-add
      @change="TabsChange"
      @edit="TagsEdit"
    >
      <TabPane
        v-for="tab in tabsStores.tabs"
        :key="tab.path"
        :closable="activeKey != tab.path"
      >
        <template #tab>
          <span>
            {{ tab.name }}
            <RedoOutlined
              v-show="activeKey == tab.path"
              @click="$router.go(0)"
            />
          </span>
        </template>
      </TabPane>
    </Tabs>
  </div>
</template>
