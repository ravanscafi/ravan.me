import React from "react"
import Tag from "./tag"

const TagList = ({ tags }) => (
  <ul style={{ display: "inline-block" }}>
    {tags.map((tag, key) => (
      <li
        style={{
          display: "inline",
          margin: "0 0.3rem",
        }}
      >
        <Tag key={key} name={tag} />
      </li>
    ))}
  </ul>
)

export default TagList
