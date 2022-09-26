import settings from "@/loacle/zh-CN/settings";
import index from "@/views/index/loacle/zh-CN";
import navbar from "@/loacle/zh-CN/navbar";
import login from "@/views/login/loacle/zh-CN";
import menu from "@/loacle/zh-CN/menu";
export default {
  'menu.dashboard': '首页',
  ...settings,
  ...index,
  ...navbar,
    ...login,
    ...menu,
};