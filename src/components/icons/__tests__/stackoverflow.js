import React from "react"
import renderer from "react-test-renderer"

import Stackoverflow from "../stackoverflow"

describe("Stackoverflow", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Stackoverflow />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
