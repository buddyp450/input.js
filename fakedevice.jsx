'use strict';
// Use the keyboard as a fake joystick
const React = require('react');
require('./input');
require('./input.fakedevice');

export default class Connect extends React.Component {

  render() {
    const gamepad = new Input.Device(new Input.FakeDevice());
    const container = () => <div id="gamepad"></div>;
    return (
      <div>
        {container}
      </div>
    )
  }
}

  document.getElementById("start").style.display = "none";


  function getH2() {
    return React.createComponent('h2');
  }

  var header = document.createElement("h2");
  header.appendChild(document.createTextNode("Gamepad: " + gamepad.id));
  container.appendChild(header);

  header = document.createElement("h3");
  header.appendChild(document.createTextNode("Axes"));
  container.appendChild(header);

  var ul = document.createElement("ul");
  var iter = Object.keys(gamepad.axes);
  for (var i in iter) {
    var li = document.createElement("li");
    var prog = document.createElement("progress");
    prog.setAttribute("max", "2");
    prog.setAttribute("value", "1");
    prog.setAttribute("id", gamepad.id + "-" + iter[i]);
    li.appendChild(document.createTextNode(iter[i]));
    li.appendChild(prog);
    ul.appendChild(li);
  }
  container.appendChild(ul);

  header = document.createElement("h3");
  header.appendChild(document.createTextNode("Buttons"));
  container.appendChild(header);

  ul = document.createElement("ul");
  iter = Object.keys(gamepad.buttons);
  for (var i in Object.keys(gamepad.buttons)) {
    li = document.createElement("li");
    prog = document.createElement("progress");
    prog.setAttribute("max", "1");
    prog.setAttribute("value", "0");
    prog.setAttribute("id", gamepad.id + "-" + iter[i]);
    li.appendChild(document.createTextNode(iter[i]));
    li.appendChild(prog);
    ul.appendChild(li);
  }
  container.appendChild(ul);

  window.removeEventListener("keydown", connect, false);
  window.mozRequestAnimationFrame(updateStatus);
}

function updateStatus(e) {
  var id = gamepad.id + "-";

  var iter = Object.keys(gamepad.axes);
  for (var i in iter) {
    document.getElementById(id + iter[i]).setAttribute("value", gamepad.axes[iter[i]] + 1);
  }

  iter = Object.keys(gamepad.buttons);
  for (var i in iter) {
    document.getElementById(id + iter[i]).setAttribute("value", gamepad.buttons[iter[i]]);
  }

  window.mozRequestAnimationFrame(updateStatus);
}

// requires keypress to start?
window.addEventListener("keydown", connect, false);
