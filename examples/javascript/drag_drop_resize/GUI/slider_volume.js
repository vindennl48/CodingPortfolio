GUI.add_component({
  // REQUIRED
  ctype: 'slider_volume',                  // name of component
  name:  'Volume',                         // display name

  // REQUIRED
  init: function(paper, record){
    // Component Variables
    this.paper       = paper               // raphaeljs paper
    this.id          = record['id']        // primary key in component table
    this.color       = record['color']     // base color value
    this.extra       = record['extra']     // anything extra needed
    this.variable    = record['variable']  // midi note variable
    this.value       = record['value']     // saved value
    this.saved_value = record['value']     // saved value
    this.layout_id   = record['layout_id'] // id of layout
    // --

    // RaphaelJS Items
    this.body = paper.rect(0, 0, 60, 300, 3)
      .attr({fill:'black', 'stroke-width':3, stroke:this.color})

    this.filler = paper.rect(0, 5, 60, 295, 3)
      .attr({fill:'#424242', 'stroke-width':3, stroke:this.color})

    this.handle = paper.rect(0, 0, 60, 10, 3)
      .attr({fill:this.color, 'stroke-width':0, stroke:this.color})

    this.db0 = paper.text(60/2, (1-(107/127))*300, '-0-')
      .attr({fill:'#fcfcfc', 'font-size':28})

    this.db6 = paper.text(60/2, (1-(88/127))*300, '-6-')
      .attr({fill:'#fcfcfc', 'font-size':28})

    this.db12 = paper.text(60/2, (1-(70/127))*300, '-12-')
      .attr({fill:'#fcfcfc', 'font-size':28})

    this.db18 = paper.text(60/2, (1-(52/127))*300, '-18-')
      .attr({fill:'#fcfcfc', 'font-size':28})
    // --

    // Container to hold all the pieces
    this.set = paper.set()
      .push(this.body)
      .push(this.filler)
      .push(this.handle)
      .push(this.db0)
      .push(this.db6)
      .push(this.db12)
      .push(this.db18)
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
      "x":         15,
      "y":         15,
      "width":     60,
      "height":    300,
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
      this.filler.attr('width', width)
      this.handle.attr('width', width)
      this.db0.attr('x', width/2)
      this.db6.attr('x', width/2)
      this.db12.attr('x', width/2)
      this.db18.attr('x', width/2)
      return this 
    }
  },
  height: function(height){
    if(height == undefined){
      return this.body.getBBox().height 
    }
    else{ 
      this.body.attr('height', height)
      this.db0.attr('y', (1-(107/127))*height)
      this.db6.attr('y', (1-(88/127))*height)
      this.db12.attr('y', (1-(70/127))*height)
      this.db18.attr('y', (1-(52/127))*height)
      this.set_value(this.value, update="no")
      return this
    }
  },
  drag: function(a, b, c){
    this.set.drag(a, b, c)
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
        partial: "/components/slider_volume_modal",
        variable: this.variable,
        color:    this.color
      },
      success: function(response){
        $("#link_item_prop")
          .prop('hidden', false)
          .click(function(){ $("#sliderVolumeModal").modal('show') })
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
        alert('Load sliderVolumeModal failed..')
        console.log(response)
      }
    })
  },

  set_color: function(color){
    this.color = color
    this.body.attr('stroke', color)
    this.filler.attr('stroke', color)
    this.handle.attr({fill:color, stroke:color})
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
  set_value: function(volume=0, update="yes"){
    volume = parseInt(volume)
    if(volume > 127){ volume = 127 }
    else if(volume < 0){ volume = 0 }

    // converts volume to inverse percent of 0-127
    let percent = volume / 127.0

    // -- calculates new position and size of handle and filler --
    let handle_h = this.handle.getBBox().height
    let handle_new_pos = (this.height() - handle_h) * (1-percent)
    let filler_new_pos = (this.height() - (handle_h/2)) * (1-percent)
    this.handle.attr('y', handle_new_pos)
    this.filler.attr('y', filler_new_pos + (handle_h/2))
    this.filler.attr('height', (this.height()-(handle_h/2))*percent)
    // --

    this.value = volume
    GUI.dirty_levels(this)

    // sends new data to server if applicable.
    //  this option exists to prevent feed-back loops
    if(update == "yes")
      GUI.change_value({variable: this.variable, value: volume})

    percent        = null
    handle_h       = null
    handle_new_pos = null
    filler_new_pos = null

    return this
  },

  touch_volume: function(y){
    let volume = ((this.height() - (y - this.y())) * 127) / this.height()
    this.set_value(volume)
    return this
  },
  // --

  // REQUIRED
  create: function(paper, record, edit="no"){
    let a = Object.create(GUI.slider_volume)
      .init(paper, record)

    if(edit == "no"){
      a.drag(
        function(dx, dy, x, y){
          let offset = $('#wrap').offset().top
          a.touch_volume(y - offset)
        },
        function(){},
        function(){}
      )
    }
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
            a.paper.circle(0, 0, 20)
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
            a.paper.circle(0, 0, 20)
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
    this.filler.remove()
    this.handle.remove()

    // remove any charms
    GUI.clear_charms()

    // re-hide the item property page
    $("#link_item_prop").prop('hidden', true)

    // flag for removal from database
    this.remove_me = true
  }

})
