const array = [1, 2, 3, 4, 5];
const filteredArray = $.grep(array, function (item) {
    return item > 2; // 过滤条件
});

console.log(filteredArray); // 输出: [3, 4, 5]






