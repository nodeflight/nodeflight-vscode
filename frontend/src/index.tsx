function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Hellorld!!!';
  return element;
}

document.body.appendChild(component());
