GUI.add_component({
  // REQUIRED
  ctype: 'button_toggle',                // primary key in component table
  name:  'Button Toggle',                // display name

  // REQUIRED
  init: function(paper, record){
    // Component Variables
    this.paper     = paper               // raphaeljs paper
    this.id        = record['id']        // primary key in component table
    this.color     = record['color']     // base color value
    this.extra     = record['extra']     // anything extra needed
    this.variable  = record['variable']  // midi note variable
    this.value     = record['value']     // saved value
    this.layout_id = record['layout_id'] // saved value
    // --

    // RaphaelJS Items
    this.body = paper.rect(0, 0, 60, 60, 3)
      .attr({fill:'black', 'stroke-width':3, stroke:this.color})

    this.btn = paper.rect(10, 10, 40, 40, 3)
      .attr({fill:this.color, 'stroke-width':0}).hide()
    // --

    // Container to hold all the pieces
    this.set = paper.set()
      .push(this.body)
      .push(this.btn)
    // --

    // Move into position and resize
    this.x(record['x'])
    this.y(record['y'])
    this.width(record['width'])
    this.height(record['height'])
    // --

    return this
  },

  // REQUIRED
  default_values: function(layout_id){
    return {
      "id":        undefined,
      "ctype":     this.ctype,
      "x":         0,
      "y":         0,
      "width":     60,
      "height":    60,
      "color":     'orange',
      "extra":     {},
      "layout_id": layout_id,
      "variable":  '',
      "value":     0
    }
  },

  // Size & Position
  // REQUIRED
  x: function(x){ 
    if(x == undefined){ return this.body.getBBox().x }
    else{ GUI.move_to(this.set, x, this.y()); return this }
  },
  y: function(y){ 
    if(y == undefined){ return this.body.getBBox().y }
    else{ GUI.move_to(this.set, this.x(), y); return this }
  },
  width: function(width){
    if(width == undefined){
      return this.body.getBBox().width 
    }
    else{ 
      this.body.attr('width', width)
      this.btn.attr('width', width-20)
      return this 
    }
  },
  height: function(height){
    if(height == undefined){
      return this.body.getBBox().height 
    }
    else{ 
      this.body.attr('height', height)
      this.btn.attr('height', height-20)
      return this
    }
  },
  drag: function(a, b, c){
    this.set.drag(a, b, c)
    return this
  },
  click: function(a){
    this.set.click(a)
    return this
  },
  // --

  // Layout saving, changing, etc.
  // REQUIRED
  activate_prop_modal: function(){
    let a = this
    $.ajax({url: '/components/ajax_modal',
      type: 'GET',
      data: {
        partial: "/components/button_toggle_modal",
        variable: this.variable,
        color:    this.color,
        id:       this.id
      },
      success: function(response){
        $("#link_item_prop")
          .prop('hidden', false)
          .click(function(){ $("#buttonToggleModal").modal('show') })
        $('#componentModalBody').html(response)

        let btn_save = function(){
          a.variable = $("#text_field_variable").val()
            .toLowerCase().replace(/ /g, '_')
          a.color = $("#text_field_color").val().toLowerCase()
          a.set_color(a.color)
        }
        let btn_destroy = function(){
          if(confirm('Are you sure you want to remove this item?'))
            a.destroy()
        }
        $("#btn_save").click(btn_save)
        $("#btn_destroy").click(btn_destroy)
      },
      error: function(response){
        alert('Load buttonToggleModal failed..')
        console.log(response)
      }
    })

  },

  set_color: function(color){
    this.color = color
    this.body.attr('stroke', color)
  },

  // REQUIRED
  get_layout_info: function(){
    if(this.remove_me)
      return {
        "id": this.id,
        "remove": true
      }
    else
      return {
        "id":        this.id,
        "ctype":     this.ctype,
        "x":         this.x(),
        "y":         this.y(),
        "width":     this.width(),
        "height":    this.height(),
        "color":     this.color,
        "extra":     this.extra,
        "layout_id": this.layout_id,
        "variable":  this.variable,
        "value":     this.value
      }
  },

  // REQUIRED
  get_value_info: function(){
    return {
      "id":    this.id,
      "value": this.value
    }
  },

  // Component Specific
  // REQUIRED
  set_value: function(value='toggle', update="yes"){
    if(value == 'toggle'){
      if(this.value == 127){ this.value = 0 }
      else { this.value = 127 }
    }
    else {
      if(value >= 127.0/2){ this.value = 127 }
      else { this.value = 0 }
    }

    this.update_state()

    // sends new data to server if applicable.
    //  this option exists to prevent feed-back loops
    if(update == "yes")
      GUI.change_value({variable: this.variable, value: this.value})

    return this
  },

  update_state: function(){
    if(this.value == 127){ this.btn.show() }
    else { this.btn.hide() }
    return this
  },

  touch_toggle: function(){
    this.set_value('toggle')
    return this
  },
  // --

  // REQUIRED
  create: function(paper, record, edit="no"){
    let a = Object.create(GUI.button_toggle)
      .init(paper, record)

    if(edit == "no"){ a.click(function(){ a.touch_toggle() }) }
    else {
      a.drag(
        function(dx, dy){
          if (!a.spos){a.spos = {x:a.x(), y:a.y()}}
          GUI.move_to(a.set, GUI.snap(dx+a.spos.x), GUI.snap(dy+a.spos.y))
        },
        function(){ GUI.clear_charms() },
        function(){ 
          a.spos = undefined

          let width_ball = GUI.add_to_charm_list(
            'width_ball',
            a.paper.circle(0, 0, 15)
              .attr({fill:'#000', 'stroke-width':3, stroke:'#fff'})
          ).drag(
            function(dx, dy){
              let ball = GUI.charms.width_ball
              let ballbb = ball.getBBox()
              if (!ball.spos){ball.spos = ballbb.x + ballbb.width/2}
              GUI.move_to(ball, GUI.snap(dx+ball.spos), a.y()+a.height()/2)
              a.width(GUI.snap(dx+ball.spos) - a.x())

              ball = GUI.charms.height_ball
              ballbb = ball.getBBox()
              GUI.move_to(
                ball,
                a.x() + a.width()/2,
                a.y() + a.height()
              )
            },
            function(){},
            function(){ GUI.charms.width_ball.spos = undefined }
          )

          let height_ball = GUI.add_to_charm_list(
            'height_ball',
            a.paper.circle(0, 0, 15)
              .attr({fill:'#000', 'stroke-width':3, stroke:'#fff'})
          ).drag(
            function(dx, dy){
              let ball = GUI.charms.height_ball
              let ballbb = ball.getBBox()
              if (!ball.spos){ball.spos = ballbb.y + ballbb.width/2}
              GUI.move_to(ball, a.x()+a.width()/2, GUI.snap(dy+ball.spos))
              a.height(GUI.snap(dy+ball.spos) - a.y())

              ball = GUI.charms.width_ball
              ballbb = ball.getBBox()
              GUI.move_to(
                ball,
                a.x() + a.width(),
                a.y() + a.height()/2
              )
            },
            function(){},
            function(){ GUI.charms.height_ball.spos = undefined }
          )

          GUI.move_to(
            width_ball, 
            a.x() + a.width(),
            a.y() + a.height()/2
          )
          GUI.move_to(
            height_ball, 
            a.x() + a.width()/2,
            a.y() + a.height()
          )

          a.activate_prop_modal()

        }
      )
    }
    return a
  },

  // REQUIRED
  destroy: function(){
    // remove all raphaeljs elements from paper
    this.body.remove()

    // remove any charms
    GUI.clear_charms()

    // re-hide the item property page
    $("#link_item_prop").prop('hidden', true)

    // flag for removal from database
    this.remove_me = true
  }

})
