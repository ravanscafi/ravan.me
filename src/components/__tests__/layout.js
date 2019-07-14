import React from "react"
import renderer from "react-test-renderer"
import { useStaticQuery } from "gatsby"

import Layout from "../layout"

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => ({
    site: {
      siteMetadata: {
        repository: { name: "Gitlab", url: "gitlab.com" },
      },
    },
  }))
})

describe("Layout", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Layout location="cool-location" title="My Site">
          <p>Content</p>
        </Layout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
