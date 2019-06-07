/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import Twitter from "react-feather/dist/icons/twitter"
import Github from "react-feather/dist/icons/github"
import Linkedin from "react-feather/dist/icons/linkedin"
import Stackoverflow from "./icons/stackoverflow"

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 60,
                width: 60,
                height: 60,
                borderRadius: `100%`,
                display: "block",
                flex: "0 0 auto",
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <div style={{ flex: "1 1 auto" }}>
              <div>
                Written by <strong>{author}</strong>.
              </div>
              <div>
                <a
                  title="Twitter"
                  className="social-icon"
                  href={`https://twitter.com/${social.twitter}`}
                  rel="nofollow"
                >
                  <Twitter className="icon" />
                </a>
                <a
                  title="GitHub"
                  className="social-icon"
                  href={`https://github.com/${social.github}`}
                  rel="nofollow"
                >
                  <Github className="icon" />
                </a>
                <a
                  title="Stackoverflow"
                  className="social-icon"
                  href={`https://stackoverflow.com/users/${
                    social.stackoverflow
                  }`}
                  rel="nofollow"
                >
                  <Stackoverflow className="icon" />
                </a>
                <a
                  title="Linkedin"
                  className="social-icon"
                  href={`https://www.linkedin.com/in/${social.linkedin}`}
                  rel="nofollow"
                >
                  <Linkedin className="icon" />
                </a>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          github
          linkedin
          stackoverflow
        }
      }
    }
  }
`

export default Bio
