# copycat

Tiny js library to make changes in objects reflect in DOM elements

### Usage

`const objectBeingWatched = copycat(element, object_to_bind, template_function)`

- objectBeingWatched: you will be able to modify the properties of this object to get changes in the DOM.
- element: #id or .class of the element where you want to mount the template
- object_to_bind: object you want to bind
- template_function: function with one argument used to fill in the template string

### Example

HTML

```html
<div id="app"></div>
```

JS

```js
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
```

### Credits

Copycatted from Sindre Sorhus's [on-change](https://github.com/sindresorhus/on-change)
