import React from "react"
import renderer from "react-test-renderer"
import {useStaticQuery} from "gatsby"

import Bio from "../bio"

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => ({
    avatar: {
      childImageSharp: {
        "gatsbyImageData": {
          "layout": "constrained",
          "backgroundColor": "#c8c8d8",
          "images": {
            "fallback": {
              "src": "/static/353dd4cfe9bc5723e98b15bf2d130c9b/4a43d/profile-pic.jpg",
              "srcSet": "/static/353dd4cfe9bc5723e98b15bf2d130c9b/b7413/profile-pic.jpg 45w,\n/static/353dd4cfe9bc5723e98b15bf2d130c9b/a9a36/profile-pic.jpg 90w,\n/static/353dd4cfe9bc5723e98b15bf2d130c9b/4a43d/profile-pic.jpg 180w,\n/static/353dd4cfe9bc5723e98b15bf2d130c9b/90089/profile-pic.jpg 360w",
              "sizes": "(min-width: 180px) 180px, 100vw"
            },
            "sources": [
              {
                "srcSet": "/static/353dd4cfe9bc5723e98b15bf2d130c9b/29677/profile-pic.webp 45w,\n/static/353dd4cfe9bc5723e98b15bf2d130c9b/5d191/profile-pic.webp 90w,\n/static/353dd4cfe9bc5723e98b15bf2d130c9b/52f83/profile-pic.webp 180w,\n/static/353dd4cfe9bc5723e98b15bf2d130c9b/27ab5/profile-pic.webp 360w",
                "type": "image/webp",
                "sizes": "(min-width: 180px) 180px, 100vw"
              }
            ]
          },
          "width": 180,
          "height": 180
        },
      },
    },
    site: {
      siteMetadata: {
        author: "Ravan Scafi",
        social: {
          twitter: "ravanscafi",
          github: "ravanscafi",
          exercism: "ravanscafi",
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
