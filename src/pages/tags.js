import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import kebabCase from "lodash/kebabCase"

const TagsPage = ({
  location,
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title, repository },
    },
  },
}) => (
  <Layout location={location} title={title} repository={repository}>
    <SEO title="Tags" />
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <li
            key={tag.fieldValue}
            style={{ display: "inline-block", margin: "0 10px" }}
          >
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        repository {
          name
          url
        }
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
