class Editor {

  constructor(world, player) {
    this.world       = world;
    this.player      = player;
    this.currentWall = null;

    window.addEventListener('keydown', (e) => this._handleKeyDown(e));
    window.addEventListener('click',   (e) => this._handleClick(e));
  }

  _handleKeyDown(e) {
    if ( e.key == 'Escape' ) {
      this.player.toggleBirdsEyeView();

    } else if ( e.key == 'c' ) {
      this.world.spawnWall(this._round(this._invert(this.player.position)),
                           this._round(this._invert(this.player.orientation)));

    } else {
      if ( !this.currentWall ) return;

      switch(e.key) {
        case 'i':
          this.currentWall.position[2] -= 10;
          break;
        case 'k':
          this.currentWall.position[2] += 10;
          break;
        case 'j':
          this.currentWall.position[0] -= 10;
          break;
        case 'l':
          this.currentWall.position[0] += 10;
          break;
        case 'u':
          this.currentWall.rotation[1] += 10;
          break;
        case 'o':
          this.currentWall.rotation[1] -= 10;
          break;
        case 'p':
          console.log(JSON.stringify(this.world.json(), null, 2));
        default:
          return;
      }
    }
    this.world.render();
  }

  _round(array) {
    return array.map((v) => Math.round(v/10)*10);
  }

  _invert(array) {
    return array.map((v) => -1*v);
  }

  _handleClick(e) {
    const id = e.target.getAttribute('data-wall');
    if ( !id ) return;

    const wall = this.world.getWall(id);
    if ( !wall ) return;

    if ( this.currentWall ) {
      this.currentWall.highlight = false;
    }
    this.currentWall = wall;
    wall.highlight = true;

    this.world.render();
    console.log(wall);
  }

}
