import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const Styled404 = styled.article`
  .columns.gel-404-columns {
    margin-top: 150px;
    margin-bottom: 150px;
  }

  .gel-404-columns .column:first-child p:first-child {
      font-size: 2rem;
      font-weight: bold;
  }

  .gel-404-columns h1 {
      font-family: ${props => props.theme.regularFont};
      font-size: 6rem;
      text-transform: uppercase;
      line-height: 1;
  }

  .gel-404-columns .column:first-child p:last-child {
      font-size: 2rem;
  }

  a {
    margin-top: 50px;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <Styled404 className="section">
    <Helmet title="404 - Page Not Found | Gel Marketing" />
      <section className="container">
        <div className="columns gel-404-columns">
          <div className="column is-three-fifths">
            <p>Oops! Something went wrong and we can't find that page.</p>
            <h1><strong>404 Error</strong></h1>
            <p>At least we found this fun animation!</p>
          </div>
          <div className="column is-two-fifths">
            <img src="/img/Gel_Whimsical_Colour_550x350_Transparent_Background.gif" alt="Gel Logo Animation" />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Link to={"/"} title="home page" className="button is-dark is-large gel-button-1">Home</Link>
          </div>
        </div>
      </section>
    </Styled404>
  </Layout>
)

export default NotFoundPage
