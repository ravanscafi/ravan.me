import React from "react"
import renderer from "react-test-renderer"

import Exercism from "../exercism"

describe("Exercism", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Exercism />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
