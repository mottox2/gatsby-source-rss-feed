import crypto from 'crypto'
import Parser from 'rss-parser'

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
}) => {
  const { createNode } = actions
  const parser = new Parser()

  const feed = await parser.parseURL(url)
  feed.items.forEach(item => {
    const nodeId = createNodeId(item.link)
    createNode({
      ...item,
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