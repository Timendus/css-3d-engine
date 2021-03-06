
  class Player {

    constructor() {
      this.position        = [0,0,0];
      this.orientation     = [0,0,0];
      this.velocity        = [0,0,0];
      this.angularVelocity = [0,0,0];
      this.touchPosition   = [0,0];

      this.buttonsPressed = {
        forward:     false,
        backward:    false,
        strafeLeft:  false,
        strafeRight: false,
        turnLeft:    false,
        turnRight:   false,
        touching:    false
      };

      this._bindEventHandlers();
    }


    /** Put the player in a fixed birds eye view over the level **/

    toggleBirdsEyeView() {
      if ( this.savedPosition && this.savedOrientation ) {
        this.position = this.savedPosition;
        this.orientation = this.savedOrientation;
        this.savedPosition = null;
        this.savedOrientation = null;
      } else {
        this.savedPosition = this.position;
        this.savedOrientation = this.orientation;
        this.position = [0, 2000, 300];
        this.orientation = [-90, 0, 0];
      }
    }


    /** Main loop velocity updates **/

    update(timePassed) {
      // We create a bias based on the amount of time that has passed since the
      // last call. We base how much velocity we add, how far we move, etc on
      // this bias. The fraction determines how "fast paced" the engine is.
      let bias = timePassed / 1.4;

      const [b, v, a] = [this.buttonsPressed, this.velocity, this.angularVelocity];

      // Increase velocities based on pressed keys
      if ( b.forward     && v[2] < 100  )    v[2] = Math.min(v[2] + bias,  100);
      if ( b.backward    && v[2] > -100 )    v[2] = Math.max(v[2] - bias, -100);
      if ( b.strafeLeft  && v[0] > -100 )    v[0] = Math.max(v[0] - bias, -100);
      if ( b.strafeRight && v[0] < 100  )    v[0] = Math.min(v[0] + bias,  100);

      // Decrease velocities if no keys pressed
      if ( !b.forward && !b.backward )       v[2] -= v[2] * bias / 100;
      if ( !b.strafeLeft && !b.strafeRight ) v[0] -= v[0] * bias / 100;
      if ( Math.abs(v[0]) < 1 )              v[0] = 0;
      if ( Math.abs(v[2]) < 1 )              v[2] = 0;

      // Increase angular velocities based on pressed keys
      if ( b.turnLeft  && a[1] > -100 )      a[1] = Math.max(a[1] - bias, -100);
      if ( b.turnRight && a[1] < 100  )      a[1] = Math.min(a[1] + bias,  100);

      // Decrease angular velocities if no keys pressed
      if ( !b.turnLeft && !b.turnRight )     a[1] -= a[1] * bias / 100;
      if ( Math.abs(a[1]) < 1 )              a[1] = 0;

      // Move some distance
      this._move(v[2] * bias / 100);
      this._strafe(v[0] * bias / 100);

      // Turn some angle
      this._turn(a[1] * bias / 360);
    }


    /** Moving the player **/

    _move(distance) {
      this.position[2] += this._cosine(this.orientation[1]) * distance;
      this.position[0] -= this._cosine(90 - this.orientation[1]) * distance;
    }

    _strafe(distance) {
      this.position[2] += this._cosine(this.orientation[1] + 90) * distance;
      this.position[0] -= this._cosine(90 - (this.orientation[1] + 90)) * distance;
    }

    _turn(degrees) {
      this.orientation[1] += degrees;
    }

    _cosine(a) {
      return Math.cos(a * Math.PI / 180);
    }


    /** Catching input events **/

    _bindEventHandlers() {
      // Keyboard navigation
      window.addEventListener('keydown',           (e) => this._handleKeyDown(e));
      window.addEventListener('keyup',             (e) => this._handleKeyUp(e));

      // Mobile navigation
      window.addEventListener('deviceorientation', (e) => this._handleOrientation(e));
      window.addEventListener('touchstart',        (e) => this._handleTouch(e));
      window.addEventListener('touchmove',         (e) => this._handleTouch(e));
      window.addEventListener('touchend',          (e) => this._stopTouch(e));
      window.addEventListener('touchcancel',       (e) => this._stopTouch(e));
    }

    _handleKeyUp(e) {
      const b = this.buttonsPressed;
      switch(e.key) {
        case "w":
        case "ArrowUp":
          b.forward = false;
          break;
        case "s":
        case "ArrowDown":
          b.backward = false;
          break;
        case "a":
          b.strafeLeft = false;
          break;
        case "d":
          b.strafeRight = false;
          break;
        case "ArrowLeft":
          b.turnLeft = false;
          break;
        case "ArrowRight":
          b.turnRight = false;
          break;
      }
    }

    _handleKeyDown(e) {
      const b = this.buttonsPressed;
      switch(e.key) {
        case "w":
        case "ArrowUp":
          b.forward = true;
          break;
        case "s":
        case "ArrowDown":
          b.backward = true;
          break;
        case "a":
          b.strafeLeft = true;
          break;
        case "d":
          b.strafeRight = true;
          break;
        case "ArrowLeft":
          b.turnLeft = true;
          break;
        case "ArrowRight":
          b.turnRight = true;
          break;
      }
    }

    _handleOrientation(e) {
      this.buttonsPressed.forward     = e.beta < 40;
      this.buttonsPressed.backward    = e.beta > 60;
      this.buttonsPressed.strafeLeft  = e.gamma < -10;
      this.buttonsPressed.strafeRight = e.gamma > 10;
    }

    _handleTouch(e) {
      if ( this.buttonsPressed.touching ) {
        this.orientation[1] += (this.touchPosition[0] - e.touches[0].pageX) / 100;
      } else {
        this.touchPosition = [e.touches[0].pageX, e.touches[0].pageY];
        this.buttonsPressed.touching = true;
      }
    }

    _stopTouch(e) {
      this.buttonsPressed.touching  = false;
    }

  }
