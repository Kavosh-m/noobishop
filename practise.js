const initialObj = {};

const f = ["kaveh", "kavoos", "kavosh"];

f.forEach((name) => {
  initialObj[name] = [1, 2, 5];
});

console.log(initialObj);
