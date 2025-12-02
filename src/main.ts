import { createApp } from 'vue'
// import './style.css' 不需要默认样式
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg 需要的配置代码
import 'virtual:svg-icons-register'
import gloablComponent from './components/SvgIcon/index.vue';

//获取应用实例对象
const app = createApp(App)

//安装element plus 插件
app.use(ElementPlus, {
    locale: zhCn
})
//安装自定义插件
app.use(gloablComponent);
app.mount('#app')