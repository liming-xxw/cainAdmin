<script setup lang="ts">
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Divider,
  Modal,
  Form,
  FormItem,
  message,
  Tag,
  Select,
  SelectOption,
  Tree,
} from "ant-design-vue";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import type { TreeProps } from "ant-design-vue";
import { reactive, ref, watch } from "vue";
import { routers } from "../../utils/dto/common";



const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "权限名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "权限分配",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "权限路由",
    key: "routes",
    dataIndex: "routes",
  },
  {
    title: "操作",
    key: "action",
  },
];

const treeData: TreeProps["treeData"] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          { title: "leaf", key: "0-0-0-0", disableCheckbox: true },
          { title: "leaf", key: "0-0-0-1" },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [{ key: "0-0-1-0", title: "sss" }],
      },
    ],
  },
];

const RouterList:routers[] = []

const expandedKeys = ref<string[]>(["0-0-0", "0-0-1"]);
const selectedKeys = ref<string[]>(["0-0-0", "0-0-1"]);
const checkedKeys = ref<string[]>(["0-0-0", "0-0-1"]);
watch(expandedKeys, () => {
  console.log("expandedKeys", expandedKeys);
});
watch(selectedKeys, () => {
  console.log("selectedKeys", selectedKeys);
});
watch(checkedKeys, () => {
  console.log("checkedKeys", checkedKeys);
});

const data = ref<RoleDto[]>([
  {
    id: 1,
    code: "1001",
    name: "超级管理员",
    role: ["add", "update", "delete"],
    routes: [],
  },
  {
    id: 2,
    code: "1001",
    name: "管理员",
    role: ["add", "update"],
    routes: [],
  },
  {
    id: 3,
    code: "1001",
    name: "浏览者",
    role: [],
    routes: [],
  },
]);

interface RoleDto {
  id?: number;
  code: string;
  name: string;
  role: string[];
  routes: string[];
}

const formState = reactive<RoleDto>({
  name: "",
  code: "",
  role: [],
  routes: [],
});

// 绑定表单的Ref作为验证
const formRef = ref();

const createModel = ref<boolean>(false);

// 新增方法
const createFuc = () => {
  formRef.value
    .validate()
    .then(() => {
      data.value.push({ ...formState, id: data.value.length + 1 });
      message.success("新增成功");
      createModel.value = false;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

// 删除方法
const deleteFuc = (index: number) => {
  data.value.splice(index, 1);
};
</script>
<template>
  <div>
    <div>
      <Row :gutter="16">
        <Col span="6" style="display: flex; gap: 10px">
          <Button type="primary" @click="createModel = true" v-add>新增</Button>
          <Modal
            v-model:open="createModel"
            title="新增狗狗"
            ok-text="确认"
            cancel-text="取消"
            @ok="createFuc"
          >
            <Form
              ref="formRef"
              :model="formState"
              name="basic"
              autocomplete="off"
            >
              <FormItem
                label="管理员名称"
                name="name"
                :rules="[
                  { required: true, message: 'Please input your username!' },
                ]"
              >
                <Input v-model:value="formState.name" />
              </FormItem>

              <FormItem
                label="管理员代码"
                name="code"
                :rules="[
                  { required: true, message: 'Please input your code!' },
                ]"
              >
                <Input v-model:value="formState.code" />
              </FormItem>

              <FormItem
                label="选择权限"
                name="role"
                :rules="[
                  { required: true, message: 'Please input your Role!' },
                ]"
              >
                <Select
                  v-model:value="formState.role"
                  mode="multiple"
                  style="width: 100%"
                  placeholder="选择权限"
                >
                  <SelectOption value="add" label="Add">
                    <PlusOutlined />
                    &nbsp;&nbsp;Add
                  </SelectOption>
                  <SelectOption value="update" label="Update">
                    <EditOutlined />
                    &nbsp;&nbsp;Update
                  </SelectOption>
                  <SelectOption value="Delete" label="Delete">
                    <DeleteOutlined />
                    &nbsp;&nbsp;Delete
                  </SelectOption>
                </Select>
              </FormItem>
              <FormItem
                label="选择路由"
                name="routes"
                :rules="[
                  { required: true, message: 'Please input your Routes!' },
                ]"
              >
                <Tree
                  v-model:value="formState.routes"
                  mode="multiple"
                  style="width: 100%; padding-top: 5px"
                  placeholder="选择权限"
                  v-model:expandedKeys="expandedKeys"
                  v-model:selectedKeys="selectedKeys"
                  v-model:checkedKeys="checkedKeys"
                  checkable
                  :tree-data="treeData"
                >
                  <template #title="{ title, key }">
                    <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{
                      title
                    }}</span>
                    <template v-else>{{ title }}</template>
                  </template>
                </Tree>
              </FormItem>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
    <div style="margin-top: 20px">
      <Table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key === 'role'">
            <div>
              <Tag
                color="blue"
                v-for="(tag, index) in record.role"
                :key="`role_tag_${index}`"
              >
                {{ tag }}
              </Tag>
            </div>
          </template>
          <template v-if="column.key === 'routes'">
            <div>
              <Button>分配</Button>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <span>
              <a v-update>编辑</a>
              <Divider type="vertical" />
              <a @click="deleteFuc(index)" v-delete>删除</a>
            </span>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
