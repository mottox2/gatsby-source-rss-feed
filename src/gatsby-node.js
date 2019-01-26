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
  feed.items.forEach(item => {
    const nodeId = createNodeId(item.link)
    const normalized = normalize(item)
    createNode({
      ...normalized,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        contentDigest: createContentDigest(item),
        type: `Feed${name}`
      }
    })
  })
}