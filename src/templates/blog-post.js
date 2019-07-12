import React from "react"
import { Link, graphql } from "gatsby"
import Disqus from "gatsby-plugin-disqus"
import Calendar from "react-feather/dist/icons/calendar"
import Clock from "react-feather/dist/icons/clock"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tag-list"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const site = this.props.data.site
    const siteTitle = site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const { title, description, cover, date, tags } = post.frontmatter

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        repository={site.siteMetadata.repository}
      >
        <SEO
          title={title}
          description={description || post.excerpt}
          cover={cover.childImageSharp.fixed.src}
        />
        <h1>{title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          <Calendar className="icon" /> {date}
          <span style={{ padding: `0 .5rem` }}>&bull;</span>
          <span>
            <Clock className="icon" /> {post.fields.readingTime.text}
          </span>
          <span style={{ padding: `0 .5rem` }}>&bull;</span>
          <span>
            <TagList tags={tags} />
          </span>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio>
          <div>
            <strong>{site.siteMetadata.author}</strong>
          </div>
        </Bio>

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        <Disqus
          identifier={post.id}
          title={title}
          url={`${site.siteMetadata.siteUrl}${post.fields.slug}`}
        />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        repository {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
        readingTime {
          text
        }
      }
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        cover {
          childImageSharp {
            fixed(width: 600) {
              src
            }
          }
        }
      }
    }
  }
`
