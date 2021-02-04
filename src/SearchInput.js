const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    let searchData = [];
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        if(!searchData.includes(e.target.value)){
          searchData.push(e.target.value);
        }
        if(searchData.length > 5){
          searchData.shift();
        }
        saveRecent(searchData);
        onSearch(e.target.value);
      }
    });
    console.log("SearchInput created.", this);
    
    const $randomBtn = document.createElement("button");
    this.$randomBtn = $randomBtn;
    this.$randomBtn.textContent = "랜덤";
    $randomBtn.className = "randomBtn";
    $target.appendChild($randomBtn);
    $randomBtn.addEventListener("click", e =>{
      if(e){
        onSearch("random");
      }
    });

    const $recentSearch = document.createElement("div");
    this.$recentSearch = $recentSearch;
    this.$recentSearch.className = "recentSearch";
    this.$recentSearch.textContent = "최근검색기록";
    $target.appendChild(this.$recentSearch);
    
    function saveRecent(data){
      localStorage.setItem("recent", data);
      console.group(searchData);
      $recentSearch.innerHTML = searchData
      .map(
        data => `
          <button class="recent" value=${data}>
            ${data}
          </button>
        `
      )
      .join("");
      const reSearch = document.querySelectorAll("button.recent");
      reSearch.forEach((item) => {
        item.addEventListener("click", e => {
            onSearch(e.target.value);
          })
        });
    }
  }
  render() {
    
    
  }
}
