import { Ref, ref } from "vue";
import { TabsDto } from "../utils/dto/common";
import { defineStore } from "pinia";

export interface TabsStore {
  tabs: Ref<TabsDto[]>;
}

export const tabsStore = defineStore("tabsStore", {
  state: (): TabsStore => ({
    tabs: ref<TabsDto[]>([]),
  }),
  actions: {
    setTabs(tabs: TabsDto) {
      this.tabs.push(tabs);
    },
    updateTabs(key: string) {
      this.tabs = this.tabs.filter((v: TabsDto) => v.path !== key);
    },
  },
  persist: true,
});
