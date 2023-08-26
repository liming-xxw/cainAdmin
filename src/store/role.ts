import { Ref, ref } from "vue";
import { userDto } from "../utils/dto/user";
import { defineStore } from "pinia";
import { routers } from "../utils/dto/common";
import routerjs from "../router/index";
const Fpages = import.meta.glob("../pages/*.vue");
const Cpages = import.meta.glob("../pages/*/*.vue");
// 创建权限用户类型
export interface RoleStoreDto {
  user: Ref<userDto>;
  isLogin: Ref<boolean>;
  role: Ref<string[]>;
  routes: Ref<routers[]>;
  token: Ref<string>;
}

const pages = {
  ...Fpages,
  ...Cpages,
};

// 导出权限数据
export const roleStore = defineStore("roleStore", {
  state: (): RoleStoreDto => ({
    user: ref<userDto>({
      username: "",
      password: "",
      nickname: "",
      emali: "",
    }),
    isLogin: ref<boolean>(false),
    role: ref<string[]>([]),
    routes: ref<routers[]>([]),
    token: ref<string>(""),
  }),

  actions: {
    setUser(user: userDto) {
      this.user = user;
    },
    setIsLogin(islogin: boolean) {
      this.isLogin = islogin;
    },
    setRole(role: string[]) {
      this.role = role;
    },
    setRoutes(routes?: string) {
      // 如果没有传数据进来就自动赋值保存的数据这样做到刷新，要使用深拷贝不然引用指向会把路由组件删除
      let thisRoutes: routers[] = JSON.parse(JSON.stringify(this.routes));
      if (routes) {
        thisRoutes = JSON.parse(routes);
        this.routes = JSON.parse(routes as string);
      }
      const useRoutes: routers[] = [];
      // 获取父级路由 和 加入
      thisRoutes.forEach((v: routers) => {
        if (!v.hasOwnProperty("parent") && !v.isRouter) {
          useRoutes.push(v);
        }
        if (v.component && !v.hasOwnProperty("pageParent")) {
          v.component = pages[v.component] as any;
          routerjs.addRoute(v as any);
          console.log(routerjs.getRoutes());
        }
      });
      //
      useRoutes.forEach((i: routers) => {
        i.child = [];
        thisRoutes.forEach((v: routers) => {
          if (i.name == v.pageParent) {
            i.child?.push(v);
          }
        });
      });
      // 直接赋值thisRoutes会报错
      if (routes) {
        this.routes = JSON.parse(routes as string);
      }
    },
  },
  persist: true,
});
