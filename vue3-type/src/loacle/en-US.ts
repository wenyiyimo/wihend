import settings from "@/loacle/en-US/settings";
import index from "@/views/index/loacle/en-US";
import navbar from "@/loacle/en-US/navbar";
import login from "@/views/login/loacle/en-US";
import menu from "@/loacle/en-US/menu";

export default {
    'menu.dashboard': 'index',
    ...settings,
    ...index,
    ...navbar,
    ...login,
    ...menu,
}