import {add, abc} from '@/math'
import Kai8 from '@/assets/images/kai-8.jpg'
import './index.scss'

const getValue = async function () {
  const res = await abc(2, 4);
  console.log('res：', res);
}

function component() {
  const element = document.createElement('div');

  const sum = add(2, 4);
  console.log('相加', sum);


  getValue();

  element.innerHTML = `
    <h1>Hello Webpack!</h1>
    <p>Environment: ${process.env.NODE_ENV}</p>
    <p>API URL: ${process.env.API_URL}</p>
    <img style="width: 200px" src=${Kai8} alt="">
    <div class="contain">123</div>
  `;
  return element;
}


document.body.appendChild(component())