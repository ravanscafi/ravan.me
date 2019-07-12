import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/post-list"

import "../styles/index.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        repository={data.site.siteMetadata.repository}
      >
        <SEO title="Home" />
        <PostList posts={posts} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
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
