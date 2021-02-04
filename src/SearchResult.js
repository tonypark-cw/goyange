class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;
  
    constructor({ $target, initialData, onClick }) {
      this.$searchResult = document.createElement("div");
      this.$searchResult.className = "SearchResult";
      $target.appendChild(this.$searchResult);
  
      this.data = initialData;
      this.onClick = onClick;
  
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      
      this.$searchResult.innerHTML = this.data
      .map(
        cat => `
          <div class="item">
            <img class="lazy" data-src=${cat.url} alt=${cat.name} src="./public/gray.png" loading="lazy" width="400" height="500" />
          </div>
        `
      )
      .join("");
    
      const images = document.querySelectorAll("img");
      const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            // console.log("reached!");
            if (entry.isIntersecting) {
              const img = entry.target; // 이미지 엘리멘트를 가져옵니다.
              const src = img.getAttribute("data-src");
              img.setAttribute("src", src);
              img.classList.add("fade");
              observer.disconnect();
            }
          });
        });
        io.observe(target);
      };
    
      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });
      try{ 
        if(this.data.length <= 0){
          this.$searchResult.innerHTML = `
          <div>검색결과가 없습니다.</div>
          `;
        }
      }catch{
        console.log(this.data);
      }
      images.forEach(lazyLoad);
    }
  }