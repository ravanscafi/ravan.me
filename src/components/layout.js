import React from "react"
import {Link} from "gatsby"
import Heart from "react-feather/dist/icons/heart"

import {rhythm, scale} from "../utils/typography"
import Bio from "./bio"

class Layout extends React.Component {
  render() {
    const {location, title, children} = this.props
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
              to={`/`}
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
            to={`/`}
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
        <footer style={{textAlign: "center", marginTop: `1.2rem`}}>
          © {new Date().getFullYear()} - built with{" "}
          <Heart className="icon" color="#f00"/> using
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
