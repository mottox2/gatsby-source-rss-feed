# gatsby-source-rss-feed

[![npm version](https://badge.fury.io/js/gatsby-source-rss-feed.svg)](https://badge.fury.io/js/gatsby-source-rss-feed)

Source plugin for pulling data into Gatsby from RSS feed.

## Install

```bash
npm install --save gatsby-source-rss-feed
```

or

```bash
yarn add gatsby-source-rss-feed
```

## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://www.gatsbyjs.org/blog/rss.xml`,
        name: `GatsbyBlog`
      }
    }
  ]
}
```

## How to query

Query is `Feed${name}`.

When name of options is `GatsbyBlog`, query named as `FeedGatsbyBlog`.

```graphql
{
  allFeedGatsbyBlog {
    edges {
      node {
        title
        link
        content
      }
    }
  }

  feedGatsbyBlog {
    title
    link
    content
  }
}
```
