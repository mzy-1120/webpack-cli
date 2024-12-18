// // 声明 jQuery 全局变量
// import * as $ from 'jquery';
// // 声明 lodash 全局变量
// import * as _ from 'lodash';


declare global {
  interface Window {
    $: typeof any;
    _: typeof any;
    vendor_library: string;
  }
}


export {};  // 确保这是一个模块
