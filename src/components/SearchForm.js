import React from 'react';
import { navigate } from "gatsby-link";
import styled from 'styled-components'

const StyledSearchForm = styled.form`
  max-width: 350px;
  margin: 20px auto;

  .control {
    display: flex;
    padding: 0px 10px;
    border: 1px solid ${props => props.theme.black};

    input {
      flex-grow: 1;
      height: auto;
      padding: 0;
  
      border: none;
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
  }
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <StyledSearchForm
        name="search"
        method="post"
        action="/search/"
        onSubmit={this.handleSubmit}
        className="gel-search-form"
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="search" />
        <div className="field search-input">
          <label className="label visually-hidden" htmlFor={"search"}>Search</label>
            <div className="control">
              <label htmlFor={"search"} className="visually-hidden">Search</label>
              <input className="input" type={"search"} name={"search"} onChange={this.handleChange} id={"search"} placeholder={"Search"} required={true} />
              <button className="search-submit" type="submit">Submit</button>
            </div>
        </div>
      </StyledSearchForm>
    )
  }

}

export default SearchForm