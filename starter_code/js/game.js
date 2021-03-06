class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.fps = 60;
    this.framesCounter = 0;
    this.player;
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  }

  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;

      this.clear();
      this.drawAll();
      this.moveAll();
      this.clearObstacles();
      if (this.framesCounter === Math.floor(Math.random()*(150 - 50)) + 50) this.generateObstacles();
      if (this.isCollision()) this.gameOver();
      if (this.framesCounter > 200) this.framesCounter = 0;
    }, 1000 / this.fps);
  }
  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Faby(this.ctx);
    this.obstacles = [];
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawAll() {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(obstacle => obstacle.draw());
  }

  moveAll() {
    this.background.move();
    this.player.update();
    this.obstacles.forEach(obstacle => obstacle.move());
  }

  generateObstacles() {
    this.obstacles.push(
      new Obstacle(this.ctx, 130, 200, this.width, this.height)
    );
    console.log("generateObstacles ==>>", this.obstacles);
  }

  gameOver() {
    clearInterval(this.interval);
  }

  isCollision() {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    return this.obstacles.some(
      obs =>
        (this.player.posX + this.player.width > obs.posX &&
          obs.posX + obs.width > this.player.posX &&
          this.player.posY + this.player.height > obs.posUp &&
          obs.posUp + obs.height > this.player.posY) ||
        (this.player.posX + this.player.width > obs.posX &&
          obs.posX + obs.width > this.player.posX &&
          this.player.posY + this.player.height > obs.posY &&
          obs.posY + obs.height > this.player.posY)
    );
  }

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obstacle => obstacle.posX >= 0);
  }
}
