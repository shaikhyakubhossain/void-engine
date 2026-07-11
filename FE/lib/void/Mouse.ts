export default class Mouse {
  public x = 0;
  public y = 0;

  public inside = false;

  constructor(
  private readonly canvas: HTMLCanvasElement
) {
  window.addEventListener(
    "mousemove",
    this.handleMove
  );

  window.addEventListener(
    "mouseout",
    this.handleOut
  );
}

  public destroy() {
  window.removeEventListener(
    "mousemove",
    this.handleMove
  );

  window.removeEventListener(
    "mouseout",
    this.handleOut
  );
}

  private readonly handleMove = (
  event: MouseEvent
) => {
  const rect = this.canvas.getBoundingClientRect();

  this.x = event.clientX - rect.left;
  this.y = event.clientY - rect.top;

  this.inside = true;
};

private readonly handleOut = (
  event: MouseEvent
) => {
  if (event.relatedTarget === null) {
    this.inside = false;
  }
};

  private readonly handleEnter = () => {
    this.inside = true;
  };

  private readonly handleLeave = () => {
    this.inside = false;
  };
}