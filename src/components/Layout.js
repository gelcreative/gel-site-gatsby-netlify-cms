import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './all.sass'

// Gel site theme settings
const theme = {
  typeGrey: '#434244',
  darkGrey: '#434345',
  orange: '#f26339',
  blue: '#00abc6',
  lightGrey: '#dadfe1',
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'futura';
  }
`;

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          
          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
  
          <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <GlobalStyle />
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
    )}
  />
)

// TODO Figure out if this is the correct way to get this to work
const WrappedWithThemeProvider = ({ children }) => (
  <ThemeProvider theme={ theme }>
    <TemplateWrapper children={children} />
  </ThemeProvider>
)

export default WrappedWithThemeProvider
