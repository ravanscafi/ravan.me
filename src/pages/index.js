import React from "react"
import { graphql, Link } from "gatsby"
import Calendar from "react-feather/dist/icons/calendar"
import Clock from "react-feather/dist/icons/clock"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

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
        <section className="post-feed">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug} className="post">
                <Link
                  style={{ boxShadow: `none`, color: "inherit" }}
                  to={node.fields.slug}
                >
                  <Image
                    fluid={{
                      ...node.frontmatter.cover.childImageSharp.fluid,
                      aspectRatio: 16 / 9,
                    }}
                  />
                  <h3
                    style={{ margin: rhythm(1 / 4) + " 0", textAlign: "left" }}
                  >
                    {title}
                  </h3>
                  <small style={{ color: `hsla(0, 0%, 0%, 0.75)` }}>
                    <Calendar className="icon" /> {node.frontmatter.date}
                    <span style={{ padding: `0 .5rem` }}>&bull;</span>
                    <span>
                      <Clock className="icon" /> {node.fields.readingTime.text}
                    </span>
                  </small>
                  <p
                    style={{ marginTop: rhythm(1 / 4) }}
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </Link>
              </div>
            )
          })}
        </section>
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
