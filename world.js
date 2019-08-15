class World {

  constructor(targetElm) {
    this.targetElm = targetElm;

    // Map the map... oh boy this is not intuitive code... :P
    this.walls = this._map().map((o) => new Wall(o));

    console.log("And thus the world was created");
  }

  render() {
    this.targetElm.innerHTML = this.walls.map((o) => o.html()).join('');
  }

  spawnWall(position, orientation) {
    this.walls.push(new Wall({
      type: 'wall',
      texture: 'wall1',
      position: position,
      rotation: orientation,
      width: 300,
      height: 300
    }));
  }

  getWall(id) {
    return this.walls.find((w) => w.id == id);
  }

  json() {
    return this.walls.map((w) => w.json());
  }

  _map() {
    return JSON.parse(`

[
  {
    "type": "floor",
    "texture": "floor4",
    "position": [
      0,
      150,
      -300
    ],
    "rotation": [
      90,
      0,
      0
    ],
    "width": 3000,
    "height": 3000,
    "repeat": true
  },
  {
    "type": "wall",
    "texture": "wall1",
    "position": [
      0,
      0,
      -450
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "width": 300,
    "height": 300,
    "text": "wsad"
  },
  {
    "type": "wall",
    "texture": "wall2",
    "position": [
      -150,
      0,
      -300
    ],
    "rotation": [
      0,
      90,
      0
    ],
    "width": 300,
    "height": 300,
    "text": "<- / ->"
  },
  {
    "type": "wall",
    "texture": "wall3",
    "position": [
      150,
      0,
      -300
    ],
    "rotation": [
      0,
      -90,
      0
    ],
    "width": 300,
    "height": 300
  },
  {
    "type": "wall",
    "texture": "wall4",
    "position": [
      0,
      0,
      -150
    ],
    "rotation": [
      0,
      180,
      0
    ],
    "width": 300,
    "height": 300
  }
]

    `);
  }

}
