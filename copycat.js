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
