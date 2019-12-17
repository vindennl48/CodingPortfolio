JS.Users = {

  Login: {
    onLoad: function(){
      let buttons = document.querySelectorAll("[type='button']")
      for(var i=0; i<buttons.length; i++){
        buttons[i].onclick = function(){
          document.getElementById("btn_submit").hidden = false
          document.getElementById("email").value = this.id
        }
      }
    }
  }

}
