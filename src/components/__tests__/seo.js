import React from "react"
import renderer from "react-test-renderer"
import { useStaticQuery } from "gatsby"

import Seo from "../seo"

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => ({
    site: {
      siteMetadata: {
        title: "Ravan Scafi",
        description: "Ravan Scafi's personal website.",
        author: "Ravan Scafi",
        siteUrl: "https://ravan.me",
      },
    },
    image: {
      childImageSharp: {
        gatsbyImageData: {
          layout: "constrained",
          backgroundColor: "#383838",
          images: {
            fallback: {
              src: "/static/a379ede7190febde66f2453a8c9ac9c1/257af/icon.png",
              srcSet:
                "/static/a379ede7190febde66f2453a8c9ac9c1/25ed1/icon.png 90w,\n/static/a379ede7190febde66f2453a8c9ac9c1/a2c25/icon.png 180w,\n/static/a379ede7190febde66f2453a8c9ac9c1/257af/icon.png 360w,\n/static/a379ede7190febde66f2453a8c9ac9c1/6c9d4/icon.png 720w",
              sizes: "(min-width: 360px) 360px, 100vw",
            },
            sources: [
              {
                srcSet:
                  "/static/a379ede7190febde66f2453a8c9ac9c1/5d191/icon.webp 90w,\n/static/a379ede7190febde66f2453a8c9ac9c1/52f83/icon.webp 180w,\n/static/a379ede7190febde66f2453a8c9ac9c1/27ab5/icon.webp 360w,\n/static/a379ede7190febde66f2453a8c9ac9c1/88c6b/icon.webp 720w",
                type: "image/webp",
                sizes: "(min-width: 360px) 360px, 100vw",
              },
            ],
          },
          width: 360,
          height: 360,
        },
      },
    },
  }))
})

describe("Seo", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Seo title="My Title" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
