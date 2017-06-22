# promises-concurrency
This is a small library to limit concurrency of promises.

## Installation
```
$ npm install promises-concurrency
```

## How to use
```javascript
const Concurrency = require('promises-concurrency');
const promiseWithValue = value => new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(value);
    }, 1000);
});
const promises = [];
for (let i=0; i<10; i++){
    promises.push(() => promiseWithValue(i));
}
Concurrency.all(promises, 3)
    .then(results => {
        //results = [0,1,2,3,4,5,6,7,8,9]
    });
```
