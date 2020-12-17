import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import AvatarButton from '../../components/AvatarButton'

const StyledAvatarDownload = styled.article`
  .gel-avatar-download-masthead {
    margin-top: 150px;
    margin-bottom: 20px;
    
    h1 {
      font-family: ${props => props.theme.secondaryFont};
      font-size: 5.4rem;
      font-weight: lighter;
    }

    p {
      max-width: 60rem;
      margin: 20px auto;
      font-size: 2rem;
      text-align: center;
    }
  }

  .gel-avatar-download-content {
    text-align: center;
  }
`;

const AvatarDownloadPage = () => (
  <Layout>
    <StyledAvatarDownload className="section">
    <Helmet title="Download Free Customer Avatar Template | Gel Marketing" />
      <section className="container">
        <section className="gel-avatar-download-masthead">
          <div className="">
            <h1>Download Your Free Customer Avatar Template Now</h1>
            <p>Make a bigger impact with your marketing by speaking to
               your ideal client. We've made it easy. Everything you
               need to create your Customer Avatar. In one simple template.</p>
          </div>
        </section>
        <section className="gel-avatar-download-content">
          <div className="">
            <AvatarButton />
          </div>
        </section>
      </section>
    </StyledAvatarDownload>
  </Layout>
)

export default AvatarDownloadPage
