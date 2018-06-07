import VeeValidate from 'vee-validate';
import zh_CN from 'api/api'; //引入中文包，提示信息可以以中文形式显示
import { Validator } from 'vee-validate';

Validator.addLocale(zh_CN); // 设置提示信息中文方式显示

const config = {
    errorBagName: 'errors',
    fieldsBagName: 'fields',
    delay: 100,
    locale: 'zh_CN',
    strict: true,
    enableAutoClasses: true,
    events: 'blur',
    inject: true
};
Vue.use(VeeValidate, config); //一般插件都要use一下