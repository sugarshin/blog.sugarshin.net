import React from 'react'
import segmentSnippet from '@segment/snippet'

const Html = props => {
  const {
    /* eslint-disable react/prop-types */
    htmlWebpackPlugin: {
      options: {
        lang,
        googleSiteVerificationKey,
        title,
        author,
        description,
        type,
        ogImageURL,
        url,
        siteName,
        content,
        segmentWriteKey,
        children,
      },
      files,
    },
    compilation,
    /* eslint-emable react/prop-types */
  } = props

  const isProd = process.env.NODE_ENV === 'production'

  return (
    <html lang={lang}>
      <head>
        {googleSiteVerificationKey ? <meta name='google-site-verification' content={googleSiteVerificationKey} /> : null}
        <meta charSet='utf-8' />
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='title' content={title} />
        <meta name='author' content={author} />
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content={type} />
        <meta property='og:image' content={ogImageURL} />
        <meta property='og:url' content={url} />
        <meta property='og:site_name' content={siteName} />
        {isProd ? [
          <link key='atom-feed' rel='alternate' type='application/atom+xml' title='Atom Feed' href='/feed.xml' />,
          <link key='rss-feed' rel='alternate' type='application/rss+xml' title='RSS 2.0 Feed' href='/rss.xml' />,
        ] : null}
        {isProd && files && files.css ? files.css.map((css, i) => {
          return <style key={i} dangerouslySetInnerHTML={{ __html: compilation.assets[css.substr(files.publicPath.length)].source() }} />
        }) : null}
      </head>
      <body>
        {content ? (
          <div
            style={{ display: 'none' }}
            dangerouslySetInnerHTML={{ __html: `<h1>${title}</h1><div>${content}</div>`}}
          />
        ) : null}
        <div id='app-root'>{children}</div>
        {segmentWriteKey ? <script dangerouslySetInnerHTML={{ __html: segmentSnippet.min({ apiKey: segmentWriteKey, page: false }) }} /> : null}
        {isProd && files && files.js ? files.js.map((js, i) => {
          return <script key={i} dangerouslySetInnerHTML={{ __html: compilation.assets[js.substr(files.publicPath.length)].source() }} />
        }) : null}
      </body>
    </html>
  )
}

export default Html
