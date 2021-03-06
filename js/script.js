//Using the HiveMQ public Broker, with a random client Id
var client = new Messaging.Client("broker.mqttdashboard.com", 8000, "myclientid_" + parseInt(Math.random() * 100, 10));

//Gets  called if the websocket/mqtt connection gets disconnected for any reason
client.onConnectionLost = function (responseObject) {
  //Depending on your scenario you could implement a reconnect logic here
  toastr.warning("Disconnected");

};

//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
  //Do something with the push message you received
  $('#messages').html(message.destinationName + ': ' + message.payloadString + '&#8451');
};

//Connect Options
var options = {
  timeout: 5,
  //Gets Called if the connection has sucessfully been established
  onSuccess: function () {
    toastr.info('Connected');
     $('#disconnect, #subcribe, #on, #off').css({ cursor: 'pointer' })
  },
  //Gets Called if the connection could not be established
  onFailure: function (message) {
    toastr.alert("Connection failed: " + message.errorMessage);
  }
};

var publish = function (payload, topic, qos) {
  //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
  var message = new Messaging.Message(payload);
  message.destinationName = topic;
  message.qos = qos;
  client.send(message);
}