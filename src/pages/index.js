import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/post-list"

import "../styles/index.css"

const BlogIndex = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => (
  <Layout location={location}>
    <SEO title="Home" />
    <PostList posts={edges} />
  </Layout>
)

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { draft: { eq: false } } }
    ) {
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
                fluid(maxWidth: 625) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
