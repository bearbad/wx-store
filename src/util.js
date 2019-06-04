function mixin(o, ...params) {
  params.forEach(item => {
    for (const key in item) {
      if (isObject(o[key]) && isObject(item[key])) {
        mixin(o[key], item[key])
      } else {
        o[key] = o[key] || item[key]
      }
    }
  })
  return o
}

function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]"
}

function makeActionContext (mutations, state, dispatch, setData) {
  let commit = makeCommitFn(state, mutations, setData)
  return {
    state,
    dispatch,
    commit
  }
}

// 对 state 数据状态的改变，由mutation执行
function makeCommitFn (state, mutations, setData) {
  return function (mutationName) {
    if (mutations.hasOwnProperty(mutationName)) {
      let args = Array.from(arguments)
      args.shift() // mutation name
      args.unshift(setData)
      args.unshift(state)

      try {
        // writerState.isMutationWriting = true
        mutations[mutationName].apply(null, args)
      } finally {
        // writerState.isMutationWriting = false
      }
    }
  }
}

function getObjByPath (obj, path) {
  let names = path.split('.')
  let firstName = names.shift()
  let member = obj[firstName]
  if (member && names.length) {
    return getObjByPath(member, names.join('.'))
  }
  return member
}

function createPathIfNone (obj, path) {
  let names = path.split('.')
  let firstName = names.shift()
  let member = obj[firstName]
  if (!member) member = obj[firstName] = {}
  if (names.length) {
    return createPathIfNone(member, names.join('.'))
  }
  return member
}

function setObjByPath (obj, path, val, createPath) {
  let names = path.split('.')
  let lastName = names.pop()
  let parent = obj

  if (names.length) {
    let parentPath = names.join('.')
    parent = createPath === true
      ? createPathIfNone(obj, parentPath)
      : getObjByPath(obj, parentPath)
  }

  if (parent) {
    parent[lastName] = val
  }
}

export default {
  mixin: mixin,
  makeActionContext: makeActionContext,
  getObjByPath: getObjByPath,
  setObjByPath: setObjByPath
}
