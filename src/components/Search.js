import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"

import styled from 'styled-components'

const StyledSearchForm = styled.form`
  text-align: center;

  input {
    flex-grow: 1;
    max-width: 350px;
    height: auto;
    padding: 0px 10px;
    margin: 20px auto 130px;

    border: 1px solid ${props => props.theme.black};
    box-shadow: none;

    font-family: ${props => props.theme.secondaryFont};
    font-size: 2.6rem;

    ::placeholder { color: ${props => props.theme.black}; }
  }

  button {
    width: 25px;
    font-size: 0;
    border: none;
    background: url(/img/noun_Search_3122418b.png) center / contain no-repeat;
  }
`

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: this.props.prefill,
      results: [],
      active: "",
    }

    this.searchBox = React.createRef();
  }

  // Function to automatically fill in the search box
  autoSearch = (terms) => {
    this.setState({query: terms})
    this.search()
  }

  render() {
    return (
      <StyledSearchForm id="blog-search" className={this.state.active}>
        <input type="text" value={this.state.query} onChange={this.search} onFocus={this.search} ref={this.searchBox} placeholder="Search" />
        <section id="blog-posts-search" className={"blog-section columns gel-blog-container-outer "}>
            {this.state.results.map(page => {
              let formattedImageUrl = "" + page.image.image
              formattedImageUrl = formattedImageUrl.replace('../../../static', '')

              return (
                <article className="column is-one-third" key={page.id}>
                  <div 
                    className="gel-blog-item-inner" 
                    style={{
                      backgroundImage: `url(${formattedImageUrl})`,
                    }}>
                    <Link to={page.path}>
                      {page.title}
                    </Link>
                  </div>
                </article>
              )})}
          </section>
      </StyledSearchForm>
    )
  }

  componentDidMount = () =>
    this.searchBox.current.focus();

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()

    // Update whether to hide 
    let active = ""
    if (query.length > 0) {
    active = "active"
    }

    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
      active: active
    })
  }
}