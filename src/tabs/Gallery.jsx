import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    inputValue: 'car',
    currentPage: 1,
    photos: [],
    buttonIsHidden: false,
  };

  componentDidMount() {
    this.searchImages();
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.page !== this.state.page
    ) {
      this.searchImages();
    }
  }

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
      // console.log(response);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
        buttonIsHidden: page < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { photos, buttonIsHidden } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit}></SearchForm>
        {photos.length > 0 ? (
          <Grid>
            {photos.map(({ id, avg_color, alt, src }, index) => (
              <GridItem key={index}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}

        {buttonIsHidden && (
          <Button onClick={this.onLoadMore} type="button">
            Load More
          </Button>
        )}
      </>
    );
  }
}
