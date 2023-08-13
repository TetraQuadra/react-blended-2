import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    inputValue: '',
    currentPage: 1,
    photos: [],
    buttonIsHidden: false,
  };

  onSubmit = value => {
    this.setState({
      inputValue: value,
      currentPage: 1,
      photos: [],
    });
  };
  searchImages = async () => {
    const { inputValue, currentPage } = this.state;
    try {
      const { photos, per_page, total_results, page } =
        await ImageService.getImages(inputValue, currentPage);
      this.setState(prev => ({
        photos: [...prev.photos, ...photos],
        buttonIsHidden: page < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      console.log(error.message);
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.inputValue !== prevState.inputValue ||
      this.state.currentPage !== prevState.currentPage
    ) {
      this.searchImages();
    }
  }

  onLoadMore = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };
  render() {
    const { photos, buttonIsHidden } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {photos.length > 0 ? (
          <Grid>
            {photos.map(({ id, avg_color, alt, src }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {buttonIsHidden && <Button onClick={this.onLoadMore}>Load more</Button>}
      </>
    );
  }
}
