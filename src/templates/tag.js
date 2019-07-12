import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Tag = ({ location, pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  const { title, repository } = data.site.siteMetadata

  return (
    <Layout location={location} title={title} repository={repository}>
      <SEO title={tagHeader} />
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/tags">← See all tags</Link>
    </Layout>
  )
}

export default Tag

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        repository {
          name
          url
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
