App.variables = App.cable.subscriptions.create("VariablesChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
    console.log("Variables Channel Connected")
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    // Called when there's incoming data on the websocket for this channel
    GUI.set_values(data)
  },

  change_value: function(data) {
    return this.perform('change_value', { data: data })
  },

  update_variables: function() {
    return this.perform('update_variables')
  }

});
