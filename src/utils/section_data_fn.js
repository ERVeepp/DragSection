const joinling = (list) => {
  let same
  let i = -1
  let len = list.length
  let arr = []

  if (!len) return
  while (++i < len) {
    const item = list[i]
    if (item.check) {
      if (item.check !== Boolean(same)) {
        arr.push(...[',', item.begin, '_', item.end])
      } else if (arr.length) {
        arr.pop()
        arr.push(item.end)
      }
    }
    same = Boolean(item.check)
  }
  arr.shift()
  return arr.join('')
}

const splicing = (data, select) => {
  let finalBigArr = []
  select.map(ele => {
    let arr = ele.split('_')
    let a = Number(arr[0])
    let b = Number(arr[1])
    for (let index = a; index <= b; index++) {
      const element = index
      if (element === 0) {
        finalBigArr.push(element)
      }
    }
  })
  data.map(ele => {
    ele.child.map(o => {
      if (finalBigArr.includes(o.value)) {
        o.check = true
      } else {
        o.check = false
      }
    })
  })
  return {
    select: finalBigArr,
    data
  }
}

export {
  joinling,
  splicing
}
