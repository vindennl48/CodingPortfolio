// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

JS.Notes = {

  save: function(){
    let notes = $("div[type='note']")
    $.each($("div[type='note']"), function(i, note){
      let variable = $(note).find("#variable").val()
        .toLowerCase().replace(/ /g, '_')
      let osc = $(note).find("#osc").val()
      if(note.id == ""){
        $.ajax({url: '/notes/ajax_new',
          type: 'POST',
          dataType: 'json',
          data: {variable: variable, osc: osc},
          error: function(response){
            alert('Save Note Failed..')
            console.log(response)
          },
        })
      }
      else{
        $.ajax({url: '/notes/ajax_update',
          type: 'POST',
          dataType: 'json',
          data: {id: note.id, variable: variable, osc: osc},
          error: function(response){
            alert('Update Note Failed..')
            console.log(response)
          },
        })
      }
    })
  },

  Train: {
    send_note: function(variable){
      App.variables.change_value({variable: variable, value: 127})
    }
  }

}
