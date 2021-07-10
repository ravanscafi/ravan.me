import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post-list"

import "../styles/index.css"

const BlogIndex = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => (
  <Layout location={location}>
    <Seo title="Home" />
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
                gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.77777777778)
              }
            }
          }
        }
      }
    }
  }
`
