const expect = require('expect');
const Concurrency = require('../');
describe('Promise Concurrency', () => {
    const simplePromise = () => new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve("¡Success!");
        }, 1000);
    });
    const promiseWithValue = value => new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(value);
        }, 1000);
    });
    const rejectedPromise = () => new Promise((resolve, reject) => {
        setTimeout(function(){
            reject("¡Reject!");
        }, 1000);
    });
    it('should resolve max 3 promises at time', done => {
        const promises = [];
        for (let i=0; i<10; i++){
            promises.push(() => simplePromise());
        }
        Concurrency.all(promises, 3)
            .then(() => done())
            .catch(err => done(err));
    });
    it('should return the values with the same order', done => {
        const promises = [];
        for (let i=0; i<10; i++){
            promises.push(() => promiseWithValue(i));
        }
        Concurrency.all(promises, 3)
            .then(results => {
                results.forEach((value, index) => {
                    expect(value).toBe(index);
                });
                done();
            })
            .catch(err => done(err));
    });
    it('should throw rejection if some of the promise reject', done => {
        const promises = [];
        for (let i=0; i<10; i++){
            promises.push(() => simplePromise());
        }
        promises.push(() => rejectedPromise());
        Concurrency.all(promises, 3)
            .then(results => done(results))
            .catch(err => done());
    });

});