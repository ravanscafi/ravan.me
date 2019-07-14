import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"

const TagsPage = ({
  location,
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <Layout location={location}>
    <SEO title="Tags" />
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <li
            key={tag.fieldValue}
            style={{ display: "inline-block", margin: "0 10px" }}
          >
            <Tag name={tag.fieldValue} count={tag.totalCount} />
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { draft: { eq: false } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
