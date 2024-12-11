// 声明 jQuery 全局变量
import * as $ from 'jquery';
// 声明 lodash 全局变量
import * as _ from 'lodash';


declare global {
  interface Window {
    $: typeof $;
  }
}


declare global {
  interface Window {
    _: typeof _;
  }
}


export {};  // 确保这是一个模块
