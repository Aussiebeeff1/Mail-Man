title = "Mail Man";

description = `
 [Press Move]
`;

characters = [  // 6x6 pixels
  `
  rrr
  rgr         
  bbb
 g b g
  b b
`,
];

options = {
  viewSize: { x: 80, y: 100 },
  theme: "crt",
  isPlayingBgm: true,
  seed: 42,
  
};

let x;
let speed;
let attack;
let scores = 0;
let startTime = getTime();  // Store the start time in seconds
let timeLimit = 30;         // Set the time limit in seconds

function update() {
  // Check if the time limit has been reached
  if (getTime() - startTime >= timeLimit) {
    end();
  }

  // init
  if (ticks === 0) {
    x = 50;
    attack = {
      pos: vec(rnd(70), -20),
      wide: 8,
      speed: 1,
    };
  }

  // ground
  color("green");
  rect(0, 80, 80, 20);

  // attack
  color("light_red");
  box(attack.pos.x, attack.pos.y, attack.wide);
  attack.pos.y += attack.speed;
  if (attack.pos.y > 105) {
    attack = {
      pos: vec(rnd(80), -10),
      wide: rnd(15) + 4,
      speed: 0.2,
    };
  }

  // player
  speed = input.isPressed ? -1.5 : 1.5;
  color("black");
  if (char("a", x, 70).isColliding.rect.light_red) {
    play("hit");
    score++;
    attack = {
      pos: vec(rnd(80), -10),
      wide: rnd(10) + 1,
      speed: 1,
    };
  }
  x += speed;
  if (x < 0 + 3) x = 0 + 3;
  if (x > 80 - 3) x = 80 - 3;


  // display time
  let remainingTime = timeLimit - (getTime() - startTime);
  color("black");
  text(`Time: ${remainingTime.toFixed(0.1)}`, 2, 12);
}


function getTime() {
  return Math.floor(ticks / 60);  // 60 frames per second
}