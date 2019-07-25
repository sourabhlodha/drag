import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Box extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div
          className="box"
          style={{ backgroundColor: this.props.box.color }}
          draggable={this.props.draggable}
          onDragStart={this.props.onDragStart({ id: this.props.box.id })}
          onDragOver={this.props.onDragOver({ id: this.props.box.id })}
          onDrop={this.props.onDrop({ id: this.props.box.id })}
          >
          <div className="content">{this.props.box.name}</div>
        </div>
      );
    }
  }
  
  class BoxesGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        boxes: [
          { id: 1, name: "BOX1", color: "red" },
          { id: 2, name: "BOX2", color: "green" },
          { id: 3, name: "BOX3", color: "blue" },
          { id: 4, name: "BOX4", color: "orange" },
          { id: 5, name: "BOX5", color: "pink" },
          { id: 6, name: "BOX6", color: "yellow" }
        ]
      };
    }
  
    swapBoxes = (fromBox, toBox) => {
      let boxes = this.state.boxes.slice();
      let fromIndex = -1;
      let toIndex = -1;
  
      for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].id === fromBox.id) {
          fromIndex = i;
        }
        if (boxes[i].id === toBox.id) {
          toIndex = i;
        }
      }
  
      if (fromIndex != -1 && toIndex != -1) {
        let { fromId, ...fromRest } = boxes[fromIndex];
        let { toId, ...toRest } = boxes[toIndex];
        boxes[fromIndex] = { id: fromBox.id, ...toRest };
        boxes[toIndex] = { id: toBox.id, ...fromRest };
  
        this.setState({ boxes: boxes });
      }
    };
  
  /* The dragstart event is fired when the user starts dragging an element or text selection */
  /* event.target is the source element : that is dragged */
  /* Firefox requires calling dataTransfer.setData for the drag to properly work */
  handleDragStart = data => event => {
    let fromBox = JSON.stringify({ id: data.id });
    event.dataTransfer.setData("dragContent", fromBox);
  };
  
  /* The dragover event is fired when an element or text selection is being dragged */
  /* over a valid drop target (every few hundred milliseconds) */
  /* The event is fired on the drop target(s) */
  handleDragOver = data => event => {
    event.preventDefault(); // Necessary. Allows us to drop.
    return false;
  };
  
  /* Fired when an element or text selection is dropped on a valid drop target */
  /* The event is fired on the drop target(s) */
  handleDrop = data => event => {
    event.preventDefault();
  
    let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toBox = { id: data.id };
  
    this.swapBoxes(fromBox, toBox);
    return false;
  };
  
  makeBoxes = () => {
    return this.state.boxes.map(box => (
      <Box
        box={box}
        key={box.id}
        draggable="true"
        onDragStart={this.handleDragStart}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        />
    ));
  };
  
  render() {
    return <div className="boxesGroup">{this.makeBoxes()}</div>;
  }
  }
  
  ReactDOM.render(<BoxesGroup />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

