import React from "react"
import Tag from "./tag"

const TagList = ({ tags }) => (
  <ul style={{ display: "inline-block" }}>
    {tags.map((tag, key) => (
      <li
        key={key}
        style={{
          display: "inline",
          margin: "0 0.3rem",
        }}
      >
        <Tag name={tag} />
      </li>
    ))}
  </ul>
)

export default TagList
