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
  RadioGroup,
  Radio,
  message,
} from "ant-design-vue";
import { reactive, ref } from "vue";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "性别",
    key: "gender",
    dataIndex: "gender",
  },
  {
    title: "年龄",
    key: "age",
    dataIndex: "age",
  },
  {
    title: "种类",
    key: "type",
    dataIndex: "type",
  },
  {
    title: "操作",
    key: "action",
  },
];

const data = ref<FormState[]>([
  {
    id: 1,
    name: "笑笑",
    gender: "公",
    type: "串串",
    age: "1岁",
  },
]);

interface FormState {
  id?: number;
  name: string;
  gender: string;
  type: string;
  age: string;
}

const formState = reactive<FormState>({
  name: "",
  gender: "",
  type: "",
  age: "",
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
        <Col span="6">
          <Input />
        </Col>
        <Col span="6">
          <Input />
        </Col>
        <Col span="6">
          <Input />
        </Col>
        <Col span="6" style="display: flex; gap: 10px">
          <Button type="primary">确认查询</Button>
          <Button type="primary" danger>清空</Button>
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
                label="名称"
                name="name"
                :rules="[
                  { required: true, message: 'Please input your username!' },
                ]"
              >
                <Input v-model:value="formState.name" />
              </FormItem>

              <FormItem
                label="性别"
                name="gender"
                :rules="[
                  { required: true, message: 'Please input your password!' },
                ]"
              >
                <RadioGroup v-model:value="formState.gender">
                  <Radio value="1">公</Radio>
                  <Radio value="2">母</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem
                label="年龄"
                name="age"
                :rules="[
                  { required: true, message: 'Please input your username!' },
                ]"
              >
                <Input v-model:value="formState.age" />
              </FormItem>
              <FormItem
                label="品种"
                name="type"
                :rules="[
                  { required: true, message: 'Please input your username!' },
                ]"
              >
                <Input v-model:value="formState.type" />
              </FormItem>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
    <div style="margin-top: 20px">
      <Table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, index }">
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
