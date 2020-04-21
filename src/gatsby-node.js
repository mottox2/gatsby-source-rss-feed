import crypto from 'crypto'
import Parser from 'rss-parser'
import omitBy from 'lodash/omitBy'

const normalize = (item) => {
  const namespaceMatched = Object.keys(item).filter(e => e.match(/:/))
  if (namespaceMatched.length === 0) {
    return item
  }

  let namespaced = {}
  namespaceMatched.forEach(key => {
    const [namespace, childKey] = key.split(":")
    if (!namespaced[namespace]) {
      namespaced[namespace] = {}
    }
    namespaced[namespace][childKey] = item[key]
  })

  return {
    ...omitBy(item, (_, key) => key.match(/:/)),
    ...namespaced,
  }
}

const renameSymbolMap = {
  _: 'text',
  $: 'attrs',
}

const renameSymbolKeys = (obj) => {
  Object.keys(obj).forEach(key => {
    if (typeof　obj[key] === 'object') {
      renameSymbolKeys(obj[key])
    }
    if (renameSymbolMap[key]) {
      obj[renameSymbolMap[key]] = obj[key]
      delete obj[key]
    }
  })
}


const createContentDigest = obj =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(obj))
    .digest(`hex`)

exports.sourceNodes = async ({
  actions,
  createNodeId
}, {
  url,
  name,
  parserOption = {}
}) => {
  if (!url) {
    throw new Error('url is required.')
  }

  if (!name) {
    throw new Error('name is required.')
  }

  const { createNode } = actions
  const parser = new Parser(parserOption)

  const feed = await parser.parseURL(url)
  const { items, ...other } = feed

  items.forEach(item => {
    const nodeId = createNodeId(item.link)
    const normalizedItem = normalize(item)
    renameSymbolKeys(normalizedItem)
    createNode({
      ...normalizedItem,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        contentDigest: createContentDigest(item),
        type: `Feed${name}`
      }
    })
  })

  const meta = {};
  Object.keys(other).forEach(key => meta[key] = feed[key]);
  createNode({
    id: createNodeId(name),
    ...meta,
    parent: null,
    children: [],
    internal: {
      contentDigest: createContentDigest(feed.title),
      type: `Feed${name}Meta`
    }
  });
}