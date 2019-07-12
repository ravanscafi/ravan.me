import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import TagIcon from "react-feather/dist/icons/tag"

const Tag = ({ name, count }) => (
  <span>
    <TagIcon className="icon" />
    {` `}
    <Link style={{ color: "inherit" }} to={`/tags/${kebabCase(name)}/`}>
      {name}
      {count ? ` (${count})` : ""}
    </Link>
  </span>
)

export default Tag
