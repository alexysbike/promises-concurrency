const extend = require('extended-object');
const worker = pool => async () => {
    let item;
    const results = {};
    while(item = pool.shift()) {
        results[item.index] = await item.promise();
    }
    return results;
};

const all = async (promises, concurrency = 3) => {
    const workers = [];
    promises = promises.map((promise, index) => ({index, promise}));
    for (let i = 0; i < concurrency; i++){
        workers.push(worker(promises)());
    }
    return Promise.all(workers).then(responses => {
        const results = [];
        responses.forEach(result => {
            extend(result, false, false).forEach((value, key) => {
                results[key] = value;
            });
        });
        return results;
    });
};

module.exports = {all};