/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

function Seo({ description, lang, meta, title, cover }) {
  const { site, image } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        image: file(absolutePath: { regex: "/icon.png/" }) {
          childImageSharp {
            fluid(maxWidth: 1380) {
              src
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  let host = site.siteMetadata.siteUrl
  if (typeof window !== "undefined") {
    host = `${window.location.protocol}//${window.location.host}`
  }
  const imageUrl = `${host}${cover || image.childImageSharp.fluid.src}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: imageUrl,
        },
        {
          name: `twitter:card`,
          content: "summary_large_image",
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: imageUrl,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
