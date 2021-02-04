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
      // inner HTML에 넣는걸 한번 거쳐서 하도록 수정해야함.
      // 그래야 페이지로 나눠서 넣고, scroll paging 이 가능해짐.
      let temp = this.data.map(
        cat => `
          <div class="item">
            <img class="lazy" src=${cat.url} alt=${cat.name} loading="lazy" width="400" height="500" />
          </div>
        `
      );

      console.log(temp);
      let idx = 12;
      let partial = temp.slice(0, idx).join("");
      this.$searchResult.innerHTML = partial;
      let count = 0;
      //스크롤 바닥 감지
      window.onscroll = function(e) {
        
          //추가되는 임시 콘텐츠
          //window height + window scrollY 값이 document height보다 클 경우,
          if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            //실행할 로직 (콘텐츠 추가)
              count++;
              console.log(e.target);
              let dest = document.querySelector(".SearchResult");
              dest.innerHTML += temp.slice(idx, idx+3).join("");
              idx += 4;
              
          }
      
      };

      const images = document.querySelectorAll("img");
      const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target; // 이미지 엘리멘트를 가져옵니다.
              const src = img.getAttribute("src");
              img.setAttribute("src", src);
              // img.classList.add("fade");
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
      images.forEach(lazyLoad);
      if(this.data.length <= 0){
        this.$searchResult.innerHTML = `
        <div>검색결과가 없습니다.</div>
        `;
      }
    }
}