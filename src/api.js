const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: keyword => {
    // console.log(keyword);
      return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(res =>
        res.json()
      );
    },
  fetchRandom: () => {
    return fetch(`${API_ENDPOINT}/api/cats/random50`).then(res =>
      res.json()
    );
  },
    
}
  // fetchCat: id => {
  //   return fetch(`${API_ENDPOINT}/api/cats/${id}`).then(res => 
  //     res.json()
  //   );
  // },


