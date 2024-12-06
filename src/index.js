// src/index.js
function component() {
  const element = document.createElement('div');
  element.innerHTML = `
    <h1>Hello Webpack!</h1>
    <p>Environment: ${process.env.NODE_ENV}</p>
    <p>API URL: ${process.env.API_URL}</p>
  `;
  return element;
}

document.body.appendChild(component());
