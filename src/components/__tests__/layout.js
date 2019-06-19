import React from "react"
import renderer from "react-test-renderer"

import Layout from "../layout"

describe("Layout", () => {
  it("renders correctly", () => {
    let repository = {name: "Gitlab", url: "gitlab.com"};
    const tree = renderer
      .create(<Layout location="cool-location" title="My Site" repository={repository}>
        <p>Content</p>
      </Layout>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
