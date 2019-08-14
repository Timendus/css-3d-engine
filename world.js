class World {

  constructor() {
    console.log("And thus the world was created");
  }

  render(target) {
    // Map the map... oh boy this is not intuitive code... :P
    target.innerHTML = this._map().map((o) => this._div(o)).join('');
  }

  _map() {
    return [
      {
        type: 'wall',
        texture: 'floor',
        text: '',
        position: [0, 150, 0],
        rotation: [90, 0, 0]
      },
      {
        type: 'wall',
        texture: 'wall1',
        text: '',
        position: [0, 0, -150],
        rotation: [0, 0, 0]
      },
      {
        type: 'wall',
        texture: 'wall2',
        text: '',
        position: [-150, 0, 0],
        rotation: [0, 90, 0]
      },
      {
        type: 'wall',
        texture: 'wall3',
        text: 'Wall 3',
        position: [150, 0, 0],
        rotation: [0, -90, 0]
      },
      {
        type: 'wall',
        texture: 'wall4',
        text: 'Wall 4',
        position: [0, 0, 150],
        rotation: [0, 180, 0]
      }
    ];
  }

  _div({ type, texture, text, position, rotation }) {
    const [ x, y, z ] = position;
    const [ a, b, c ] = rotation;

    return `<div class='${type} texture-${texture}'
                 style='transform: translate3d(${x}px, ${y}px, ${z}px)
                                   rotateX(${a}deg)
                                   rotateY(${b}deg)
                                   rotateZ(${c}deg);'>${text}</div>`;
  }

}
