import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    inputValue: '',
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.inputValue !== this.state.value) {
  //   }
  // }
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={this.state.inputValue}
          onChange={e => this.setState({ inputValue: e.target.value })}
        />
      </SearchFormStyled>
    );
  }
}
