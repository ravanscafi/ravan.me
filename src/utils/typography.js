import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = ({ rhythm }) => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    ".gatsby-resp-image-figcaption": {
      display: `block`,
      textAlign: `center`,
      fontStyle: `italic`,
    },
    "a.anchor, a.image-link, a.social-icon": {
      boxShadow: `none`,
    },
    "a.image-link": {
      textAlign: `center`,
      display: `block`,
    },
    "[align=center]": {
      textAlign: `center`,
    },
    h2: {
      textAlign: `center`,
    },
    ".icon": {
      width: rhythm(0.5),
      height: rhythm(0.5),
      verticalAlign: "middle",
    },
    ".social-icon": {
      padding: "0 " + rhythm(0.2),
    },
    ".social-icon:hover": {
      color: Wordpress2016.bodyColor,
    },
    ".social-icon .icon": {
      width: rhythm(0.8),
      height: rhythm(0.8),
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
