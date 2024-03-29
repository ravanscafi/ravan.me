import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post-list"

const Tag = ({ location, pageContext, data }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges

  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} marcado${
    totalCount === 1 ? "" : "s"
  } com "${tag}"`

  return (
    <Layout location={location}>
      <Seo title={`Tag ${tag}`} />
      <h1>{tagHeader}</h1>
      <PostList posts={posts} />
      <Link to="/tags">← Veja todas as tags</Link>
    </Layout>
  )
}

export default Tag

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fields: { draft: { eq: false } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            cover {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
