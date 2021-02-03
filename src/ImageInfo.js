class ImageInfo {
    $imageInfo = null;
    data = null;
  
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("div");
      $imageInfo.className = "ImageInfo";
      this.$imageInfo = $imageInfo;
      $target.appendChild($imageInfo);
      this.data = data;
  
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      
  
      if (this.data.visible) {
        
        const { name, url, temperament, origin } = this.data.image;
        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div id="closeBtn">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>
          <script>
        `;
        this.$imageInfo.style.display = "block";
      } else {
        this.$imageInfo.style.display = "none";
      }

      let close = document.getElementById("closeBtn");
      if(close){
        close.addEventListener("click", function (e){
          document.querySelector(".ImageInfo").style.display="none";
        });
      }
      
      window.onkeydown = function(e){
        if(e.keyCode == 27){
          document.querySelector(".ImageInfo").style.display="none";
        }
      }

      window.addEventListener("click", function(e){
        if(e.target.className == "ImageInfo"){
          document.querySelector(".ImageInfo").style.display="none";
        }
      });

    }
    
  }
  