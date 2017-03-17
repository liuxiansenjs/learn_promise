//Promise object only accept two arguments, which are symble for succeeding and failed status.
//Promise对象只支持两个参数，一个是成功后执行的回调函数，另一个是失败后执行的回调函数。Promise实例在创造时就会执行传入构造函数内的函数并取得成功活着失败的状态。then语句只是执行定义的回调函数。
var aPromise = new Promise((resolve, reject) => {
  //create a random number to simulate success and failed situalation.
  var ramber = Math.floor(Math.random() * 2);
  //Judge which callback function will be executed based conditions.
  if (ramber === 0) {
    resolve('resolved');
  } else {
    reject('rejected');
  }
});
//由于Promise实例被执行后状态无法改变，所以创造新实例，以便之后用then语句链式promise。
var bPromise = new Promise((resolve, reject) => {
  //create a random number to simulate success and failed situalation.
  var ramber = Math.floor(Math.random() * 2);
  //Judge which callback function will be executed based conditions.
  if (ramber === 0) {
    resolve('resolved');
  } else {
    reject('rejected');
  }
});


//Use dot then() after instance of Promise will run the callback.
aPromise.then((message) => {
  console.log('Success: ', message);
  return bPromise;
}, (message) => {
  console.log('Failed: ', message);
  return bPromise;
}).then((message) => {
  console.log('Success: ', message);
}, (message) => {
  console.log('Failed: ', message);
})
