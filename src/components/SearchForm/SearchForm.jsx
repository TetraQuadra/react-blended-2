import { Component } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    inputValue: '',
  }



  onFormSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props
    onSubmit(this.state.inputValue)
  }

  render() {
    return (
      <SearchFormStyled onSubmit={this.onFormSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch

          value={this.state.inputValue}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={(e) => this.setState({ inputValue: e.target.value })}
        />
      </SearchFormStyled>
    );
  }
}



SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}