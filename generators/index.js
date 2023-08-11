async function * generator() {
  yield await Promise.resolve("First");
  yield await Promise.resolve("Second");
  yield await Promise.resolve("Third");
}

(async () => {
  // // Padrão
  // for await (const value of generator()) {
  //   console.log(value);
  // }

  // // Não funciona. AsyncInterator e Interator protocols são diferentes
  // const gen = generator();
  // for (const value of gen) {
  //   console.log(value);
  // }
})();