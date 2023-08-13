import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    inputValue: '',
    currentPage: 1,
    photos: [],
  }

  onSubmit = (value) => {
    this.setState({
      inputValue: value
    })
  }
  searchImages = async () => {
    const response = await ImageService.getImages('cars', 1)
    console.log(response)
    this.setState({ photos: response.photos })
  }

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
