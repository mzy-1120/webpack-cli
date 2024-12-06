import {add} from '@/math'
import Kai8 from '@/assets/images/kai-8.jpg'


function component() {
  const element = document.createElement('div');

  const sum = add(2, 4);
  console.log('测试webpack开启热更新，修改js文件刷新整个浏览器问题', sum)

  element.innerHTML = `
    <h1>Hello Webpack!</h1>
    <p>Environment: ${process.env.NODE_ENV}</p>
    <p>API URL: ${process.env.API_URL}</p>
    <img style="width: 500px" src=${Kai8} alt="">
  `;
  return element;
}


document.body.appendChild(component())