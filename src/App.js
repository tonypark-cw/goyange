class App {
  $target = null;
  data = [];
  
  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword => {
        if(keyword == "random"){
          api.fetchRandom().then(({ data }) => {
            this.setState(data);
          });
        }else{
          api.fetchCats(keyword).then(({ data }) => {
            this.setState(data);
          });
        }
      }
    )});

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
      
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
