import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Heart from "react-feather/dist/icons/heart"

import { rhythm, scale } from "../utils/typography"
import Bio from "./bio"

const Layout = ({ location, children }) => {
  const {
    site: {
      siteMetadata: { repository, title },
    },
  } = useStaticQuery(repositoryQuery)

  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <Bio>
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(0.125),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={rootPath}
          >
            {title}
          </Link>
        </h1>
      </Bio>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={rootPath}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)} ${rhythm(0.5)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer style={{ textAlign: "center", marginTop: `1.2rem` }}>
        © {new Date().getFullYear()}
        <span style={{ padding: `0 .5rem` }}>&bull;</span>
        built with
        {` `}
        <Heart className="icon" color="#f00" /> using
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        <span style={{ padding: `0 .5rem` }}>&bull;</span>
        See the project on <a href={repository.url}>{repository.name}</a>
      </footer>
    </div>
  )
}

const repositoryQuery = graphql`
  query repositoryQuery {
    site {
      siteMetadata {
        title
        repository {
          name
          url
        }
      }
    }
  }
`

export default Layout
