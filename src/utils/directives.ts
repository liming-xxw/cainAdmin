import { roleStore } from "../store/role";
import { AppUse } from "../main";

const RoleFilter = (v: string) => {
  const roleStoreS = roleStore();
  const isRole = roleStoreS.role.filter((vo: string) => v == vo);
  console.log(isRole);
  return Boolean(isRole.length == 0);
};

// 绑定权限状态
export const directivesUse = () => {
  AppUse.directive("add", {
    mounted: (el: HTMLElement) => {
      if (RoleFilter("add")) {
        el.style.display = "none";
      }
    },
  });
  AppUse.directive("update", {
    mounted: (el: HTMLElement) => {
      if (RoleFilter("update")) {
        el.style.display = "none";
      }
    },
  });
  AppUse.directive("delete", {
    mounted: (el: HTMLElement) => {
      if (RoleFilter("delete")) {
        el.style.display = "none";
      }
    },
  });
};
