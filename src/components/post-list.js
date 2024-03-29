import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { rhythm } from "../utils/typography"
import Calendar from "react-feather/dist/icons/calendar"
import Clock from "react-feather/dist/icons/clock"

const PostList = ({ posts }) => (
  <section className="post-feed">
    {posts.map(({ node }) => {
      const { cover, date, description } = node.frontmatter
      const title = node.frontmatter.title || node.fields.slug

      return (
        <div key={node.fields.slug} className="post">
          <Link
            style={{ boxShadow: `none`, color: "inherit" }}
            to={node.fields.slug}
          >
            <GatsbyImage
              image={cover.childImageSharp.gatsbyImageData}
              alt={title}
            />
            <h3 style={{ margin: rhythm(1 / 4) + " 0", textAlign: "left" }}>
              {title}
            </h3>
            <small className="post-info">
              <Calendar className="icon" /> {date}
              <span style={{ padding: `0 .5rem` }}>&bull;</span>
              <span>
                <Clock className="icon" /> {node.fields.readingTime.text}
              </span>
            </small>
            <p
              style={{ marginTop: rhythm(1 / 4) }}
              dangerouslySetInnerHTML={{
                __html: description || node.excerpt,
              }}
            />
          </Link>
        </div>
      )
    })}
  </section>
)

export default PostList
