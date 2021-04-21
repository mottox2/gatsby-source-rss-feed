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

### basic pattern

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `http://static.userland.com/gems/backend/rssTwoExample2.xml`,
        name: `ExampleRSS`,
      }
    }
  ]
}
```

### use multiple feed


```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `http://static.userland.com/gems/backend/rssTwoExample2.xml`,
        name: `ExampleRSS`,
      }
    }
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `http://static.userland.com/gems/backend/rssTwoExample2.xml`,
        name: `MyBlog`,
      }
    }
  ]
}
```

### with parserOption

This library use [rss-parser](https://github.com/bobby-brennan/rss-parser#readme).

You can pass options via parserOptions.

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `http://static.userland.com/gems/backend/rssTwoExample2.xml`,
        name: `ExampleRSS`,
        // Optional
        // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
        parserOption: {
          customFields: {
            item: ['itunes:duration']
          }
        }
      }
    }
  ]
}
```

## How to query

Query is `Feed${name}`.

When name of options is `ExampleRSS`, query named as `FeedExampleRSS`.

```graphql
{
  allFeedExampleRSS {
    edges {
      node {
        title
        link
        content
      }
    }
  }

  feedExampleRSS {
    title
    link
    content
  }
}
```

Data not part of the `items` can be accessed with `Feed${name}Meta`

When name of options is `ExampleRSS`, query named as `FeedExampleRSSMeta`.

```graphql
{
  feedExampleRSSMeta {
    title
    author
    description
    lastBuiltDate
  }
}
```
