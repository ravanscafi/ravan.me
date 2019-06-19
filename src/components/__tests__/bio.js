import React from "react"
import renderer from "react-test-renderer"
import { useStaticQuery } from "gatsby"

import Bio from "../bio"

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => ({
    avatar: {
      childImageSharp: {
        fixed: {
          base64: "data:image/jpeg;base64,/9j/SHAcv//Z",
          width: 150,
          height: 150,
          src: "/static/src/profile-pic.jpg",
          srcSet: "/static/srcset/profile-pic.jpg",
        },
      },
    },
    site: {
      siteMetadata: {
        author: "Ravan Scafi",
        social: {
          twitter: "ravanscafi",
          github: "ravanscafi",
          linkedin: "ravanscafi",
          stackoverflow: "804741/ravan-scafi",
        },
      },
    },
  }))
})

describe("Bio", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Bio>
          <h1>John Doe</h1>
        </Bio>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
