import React from "react"
import { graphql, Link } from "gatsby"
import Disqus from "gatsby-plugin-disqus"
import Calendar from "react-feather/dist/icons/calendar"
import Clock from "react-feather/dist/icons/clock"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tag-list"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({
  data: {
    markdownRemark: {
      id,
      excerpt,
      fields: { readingTime, slug },
      frontmatter: { cover, date, description, tags, title },
      html,
    },
    site: {
      siteMetadata: { author, siteUrl },
    },
  },
  pageContext: { previous, next },
  location,
}) => (
  <Layout location={location}>
    <SEO
      title={title}
      description={description || excerpt}
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
        <Clock className="icon" /> {readingTime.text}
      </span>
      <span style={{ padding: `0 .5rem` }}>&bull;</span>
      <span>
        <TagList tags={tags} />
      </span>
    </p>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <hr
      style={{
        marginBottom: rhythm(1),
      }}
    />
    <Bio>
      <div>
        <strong>{author}</strong>
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
    <Disqus identifier={id} title={title} url={`${siteUrl}${slug}`} />
  </Layout>
)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author
        siteUrl
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
