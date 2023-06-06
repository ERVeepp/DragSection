const createArr = (len) => {
  return Array.from(Array(len)).map((ret, id) => id + 0);
};
const data = [""].map((ret, index) => {
  const children = (ret2, row, max) => {
    return createArr(max).map((t, col) => {
      return {
        week: ret2,
        // value: formatWeektime(col),
        // begin: formatWeektime(col).split('~')[0],
        // end: formatWeektime(col).split('~')[1],
        value: t,
        begin: t,
        end: t,
        row,
        col,
        check: false
      };
    });
  };
  return {
    value: ret,
    row: index,
    child: children(ret, index, 24)
  };
});
export {
  data as default
};
