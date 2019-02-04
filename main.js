function copyCat(elem, obj, templateF) {
  function render(data) {
    document.querySelector(elem).innerHTML = templateF(data);
  }
  render(obj);
  return new Proxy(obj, {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    defineProperty(target, property, descriptor) {
      const r = Reflect.defineProperty(target, property, descriptor);
      render(obj);
      return r;
    },
    deleteProperty(target, property) {
      const r = Reflect.defineProperty(target, property);
      render(obj);
      return r;
    }
  });
}

const cat = copyCat(
  '#app',
  {
    name: 'cat',
    value: 1
  },
  data => `<p>
          Hi, I'm ${data.name}. I have a value of ${data.value}
        </p>`
);

cat.name = 'Tom';

const cat2 = copyCat(
  '#app2',
  { nest: { value: 1 } },
  data => `Nested value: ${data.nest.value}`
);
