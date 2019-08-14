window.addEventListener('load', () => {

  const player = new Player();
  const world  = new World();

  const sceneElm  = document.getElementById("scene");
  const cameraElm = document.getElementById("camera");
  const worldElm  = document.getElementById("world");

  let lastTime = null;

  function draw(timestamp) {
    // Tell the player to update itself based on the amount of time passed
    player.update(lastTime ? timestamp - lastTime : 0);
    lastTime = timestamp;

    const [ x, y, z ] = player.position;
    const [ a, b, c ] = player.orientation;

    // Rotate sky texture
    sceneElm.style.backgroundPosition = `${b / 360 * 100}%`;

    // Rotate camera        This value needs to correspond to CSS `perspective` property to undo
    //                      the player's translation:  vvvvv
    cameraElm.style.transform = `translate3d(0px, 0px, 600px) rotateX(${a}deg) rotateY(${b}deg) rotateZ(${c}deg)`;

    // Translate world to right position
    worldElm.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;

    window.requestAnimationFrame(draw);
  }

  // Bootstrap!
  world.render(worldElm);
  draw();

});
