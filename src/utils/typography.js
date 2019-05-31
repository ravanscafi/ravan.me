import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    ".gatsby-resp-image-figcaption": {
      display: `block`,
      textAlign: `center`,
      fontStyle: `italic`,
    },
    "a.anchor, a.image-link": {
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
