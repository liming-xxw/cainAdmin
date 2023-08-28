import { Axios } from "../utils/axios/axios";
import { routers } from "../utils/dto/common";

import MockAdapter from "axios-mock-adapter";

// 注册mock实例
var mock = new MockAdapter(Axios, { delayResponse: 2000 });

// 注册user登录接口
mock.onPost("/user/login").reply((config: any): any => {
  const { username, password } = JSON.parse(config.data);
  if (username == "cain" && password == "cain") {
    const role = ["find", "add", "update", "delete"];
    const routes: routers[] = [
      {
        name: "appIndex",
        component: "../pages/index.vue",
        path: "/",
        isRouter: true,
      },
      {
        icon: "RadarChartOutlined",
        name: "consoleIndex",
        component: "../pages/console/console.vue",
        parent: "appIndex",
        path: "/",
        pageParent: "consoleHome",
        title: "仪表台",
        meta: {
          title: "仪表台",
        },
      },
      {
        icon: "DesktopOutlined",
        name: "consoleHome",
        path: "/",
        title: "控制台",
      },
      {
        icon: "FormOutlined",
        name: "formHome",
        path: "/form",
        title: "表单系统",
      },
      {
        icon: "TableOutlined",
        name: "formIndex",
        component: "../pages/form/index.vue",
        parent: "appIndex",
        path: "/form",
        pageParent: "formHome",
        title: "表格演示",
        meta: {
          title: "表格演示",
        },
      },
    ];
    return [
      200,
      {
        message: "登录成功",
        data: {
          username: "cain",
          nickname: "cain",
          password: "cain",
          emali: "cain@cian.com",
          role: JSON.stringify(role),
          routes: JSON.stringify(routes),
        },
      },
    ];
  } else {
    return [
      500,
      {
        message: "登录失败，请检查账号或者密码",
      },
    ];
  }

  // return { user: "" };
});
