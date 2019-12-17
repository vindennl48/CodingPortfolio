let GUI = {

  // -- Global functions --
  // This stores all of the individual
  //  types of components that can be
  //  added to the screen.
  component_list: [],

  // This loads the individual components
  //  into the component_list.
  add_component: function(component){
    GUI.component_list.push({
      ctype: component.ctype,
      name: component.name 
    })
    GUI[component.ctype] = component
  },

  move_by: function(a, x=0, y=0){
    x += a.getBBox().x
    y += a.getBBox().y
    a.transform("t"+x+","+y)
    return a
  },

  move_to: function(a, x, y){
    a.transform("t"+x+","+y)
    return a
  },

  snap: function(x){
    if(x < 0)
      return -(Math.floor(Math.abs(x)/GUI.snap_value)*GUI.snap_value)
    else
      return Math.floor(x/GUI.snap_value)*GUI.snap_value
  },
  // --


  // -- Interaction with server --
  // This sets the variables to new values
  set_values: function(data){
    // set all values
    if(data.user_id == 0){
      for(var i=0; i<data.note.length; i++){
        for(var j=0; j<GUI.components.length; j++){
          if(GUI.components[j].variable == data.note[i].variable)
            GUI.components[j].set_value(data.note[i].value, update="no")
        }
      }
    }
    // set single value
    else if(data.user_id != JS.user_id){
      for(var i=0; i<GUI.components.length; i++){
        if(GUI.components[i].variable == data.note.variable)
          GUI.components[i].set_value(data.note.value, update="no")
      }
    }
  },

  // Change Value on server
  change_value: function(data){ App.variables.change_value(data) },

  // This gets the layout to save to the db
  save_layout: function(){
    $.ajax({url: '/layouts/ajax_save',
      type: 'POST',
      dataType: 'json',
      data: {data: JSON.stringify(GUI.get('layout'))},
      success: function(){ alert('Save Successful!') },
      error: function(response){
        alert('Save Layout Failed..')
        console.log(response)
      }
    })
  },

  // This gets the values to save to the db
  save_values: function(){
    $.ajax({url: '/layouts/ajax_save_values',
      type: 'POST',
      dataType: 'json',
      data: {data: JSON.stringify(GUI.get('values'))},
      success: function(){
        alert('Save Successful!')
        location.reload(true)
      },
      error: function(response){
        alert('Save Layout Failed..')
        console.log(response)
      }
    })
  },
  // --


  // -- Layout Functions --
  // This stores all of the individual
  //  resizing charms/balls on the screen
  charms: {},

  // This is the current raphaeljs paper
  //  and components on that paper
  //  and snap grid value
  paper: undefined,
  components: [],
  snap_value: 5,

  // Adds component to paper
  add: function(ctype, layout_id){
    GUI.components.push(
      GUI[ctype].create(
        GUI.paper,
        GUI[ctype].default_values(layout_id),
        edit="yes"
      )
    )
  },

  // This loads the current layout onto
  //  the screen.
  load: function(components, edit="no"){
    GUI.components = []
    for(var i=0; i<components.length; i++){
      let c = components[i]
      GUI.components.push( GUI[c.ctype].create(GUI.paper, c, edit) )
    }
  },

  // Helper function for getting layout and values
  get: function(info){
    let result = []
    let c = GUI.components
    for(var i=0; i<c.length; i++){
      if(info == 'layout')
        result.push( c[i].get_layout_info() )
      else if(info == 'values')
        result.push( c[i].get_value_info() )
    }
    return result
  },

  clear_charms: function(){
    for (var key in GUI.charms)
      GUI.charms[key].remove()
    GUI.charms = {}
  },

  add_to_charm_list: function(name, a){
    GUI.charms[name] = a
    return a
  },
  // --

  // Red dot to signify levels are off of the saved values
  dirty_levels: function(component){
    if(component.saved_value != component.value && !/^gain_/.test(component.variable)){
      $("#dirty_levels").removeAttr('hidden')
    }
  },

}
