<script setup lang="ts">
import { Tabs, TabPane } from "ant-design-vue";
import { RedoOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <div style="height: 40px">
    <Tabs type="editable-card" hide-add>
      <TabPane key="1" tab="Tab 1">
        <template #closeIcon><RedoOutlined /> </template>
      </TabPane>
      <TabPane key="2" tab="Tab 2"></TabPane>
      <TabPane key="3" tab="Tab 3"></TabPane>
    </Tabs>
  </div>
</template>
