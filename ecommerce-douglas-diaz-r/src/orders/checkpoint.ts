function externa(x) {
  function interna(y) {
    return x + y;
  }
  return interna;
}
const foo = externa(3);
const resultado = foo(4);
