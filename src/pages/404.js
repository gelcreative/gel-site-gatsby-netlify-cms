import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import FooterLogo from '../components/svg/FooterLogo'

const Styled404 = styled.main`
  .columns.gel-404-columns {
    margin-top: 150px;
    margin-bottom: 150px;
  }

  .gel-404-columns .column:first-child p:first-child {
      font-size: 2rem;
      font-weight: bold;
  }

  .gel-404-columns h1 {
      font-family: 'futura-bold';
      font-size: 6rem;
      text-transform: uppercase;
  }

  .gel-404-columns .column:first-child p:last-child {
      font-size: 2rem;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <Styled404>
      <div className="container">
      <article className="columns gel-404-columns">
        <section className="column is-three-fifths">
          <p>Oops! Something went wrong and we can't find that page.</p>
          <h1><strong>404 Error</strong></h1>
          <p>At least we found this fun animation!</p>
        </section>
        <section className="column is-two-fifths">
          <FooterLogo />
        </section>
      </article>
      </div>
    </Styled404>
  </Layout>
)

export default NotFoundPage
