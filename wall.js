class Wall {

  constructor({ type, texture, text, position, rotation, width, height, repeat, highlight }) {
    this.id        = this._uuidv4();
    this.type      = type;
    this.texture   = texture;
    this.text      = text;
    this.position  = position;
    this.rotation  = rotation;
    this.width     = width;
    this.height    = height;
    this.repeat    = repeat;
    this.highlight = highlight;
  }

  html() {
    const { id, type, texture, text, width, height, repeat, highlight } = this;
    const [ x, y, z ] = this.position;
    const [ a, b, c ] = this.rotation;

    return `<div class='${type} texture-${texture} ${repeat ? 'texture-repeat' : ''} ${highlight ? 'texture-highlight' : ''}'
                 data-wall='${id}'
                 style='width: ${width}px;
                        height: ${height}px;
                        margin-left: -${width/2}px;
                        margin-top: -${height/2}px;
                        transform: translate3d(${x}px, ${y}px, ${z}px)
                                   rotateX(${a}deg)
                                   rotateY(${b}deg)
                                   rotateZ(${c}deg);'>${text ? text : ''}</div>`;
  }

  json() {
    const { type, texture, position, rotation, width, height } = this;
    let json = { type, texture, position, rotation, width, height };
    if ( this.text   ) json.text = this.text;
    if ( this.repeat ) json.repeat = true;
    return json;
  }

  _uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

}
