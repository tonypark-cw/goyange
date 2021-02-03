class ImageInfo {
    $imageInfo = null;
    data = null;
    
    constructor({ $target, data}) {
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
      let catId = 0;
      
      if (this.data.visible) {
        
        const { url , id, name,temperament, origin } = this.data.image;
        catId = id;
        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div id="closeBtn">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: <span id="temperament"></span></div>
              <div>태생: <span id="origin"></span></div>
            </div>
          </div>
          <script>
        `;
        this.$imageInfo.style.display = "block";
      } else {
        this.$imageInfo.style.display = "none";
      }
      // let cat = [];
      // api.fetchCat(catId).then((data) => {
      //   cat = data;
      //   console.log(cat.data.origin);
      //   console.log(cat.data.temperament);
      //   document.getElementById("origin").value=cat.data.origin;
      //   document.getElementById("temperament").value = cat.data.temperament;
      // });   


      let close = document.getElementById("closeBtn");
      if(close){
        close.addEventListener("click", function (){
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