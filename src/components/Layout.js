import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './styles/all.sass';
import './styles/gel-styles.sass';

// Gel site theme settings
const theme = {
  typeGrey: '#434244',
  darkGrey: '#434345',
  //orange: '#e9724c',
  orange: '#e77252',
  darkOrange: '#9D4223',
  //blue: '#143358',
  lightBlue: '#9DB6D1',
  blue: '#394f60',
  //yellow: '#ffc857',
  yellow: '#ffc557',
  darkYellow: '#987D44',
  lightGrey: '#dde2e3',
  white: '#ffffff',
  chineseRed: '#9D4223',
  metallicSunburst: '#987d44',
  wildBlueYonder: '#9db6d1',

  regularFont: 'HKGrotesk-Regular',
  boldFont: 'HKGrotesk-Regular',
  secondaryFont: 'QuincyCF-Regular',
  secondaryBoldFont: 'QuincyCF-Bold',
};

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <html lang="en" />

          <title>{data.site.siteMetadata.title}</title>
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-16x16.png"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />

          {/* <link rel="stylesheet" href="https://use.typekit.net/hfk4yqa.css" /> */}
        </Helmet>
        <Navbar />
        <main role="main">{children}</main>
        <Footer />
      </>
    )}
  />
);

const WrappedWithThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <TemplateWrapper children={children} />
  </ThemeProvider>
);

export default WrappedWithThemeProvider;
