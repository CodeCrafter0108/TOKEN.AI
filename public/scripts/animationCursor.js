let doc = $(document),
  mX,
  mY = doc.height() / 1.5,
  fX = doc.width() / 2,
  mouse = false,
  letter = [];
// let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*~`/.,<>?\|]}{[".split("")
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZウマャュマワク'.split('');

mR = (n, i) => Math.floor(Math.random() * n) + i;

inject = () => {
  $('body').prepend('<canvas id="animationCanvas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; pointer-events: none;"></canvas>');
  can = document.querySelector('canvas');
  con = can.getContext('2d');
  init();
};

size = () => {
  can.height = 0;
  can.width = 0;
  can.height = window.innerHeight;
  can.width =  window.innerWidth;
};

$(window).on('resize', () => size());

init = () => {
  size();
  think();
};

doc.on('mousemove', (e) => {
  mX = e.clientX;
  mY = e.clientY;
  mouse = true;
});

dT = (x, y, t, s, c) => {
  con.save();
  con.font = '' + s + 'px monospace';
  con.shadowColor = 'rgba(126, 196, 37, ' + c + ')';
  con.shadowBlur = s / 2;
  con.fillStyle = 'rgba(126, 196, 37, ' + c + ')';
  let tW = con.measureText(t).width;
  con.fillText(t, x - tW / 2, y);
  con.restore();
};

dR = (x, y, w, h, c) => {
  con.save();
  con.beginPath();
  con.rect(x, y, w, h);
  con.fillStyle = c;
  con.fill();
  con.restore();
};

think = () => {
  let sC = mR(2, 1);

  if (!mouse) {
  } else {
    fX = mX;
  }

  if (sC == 1 || sC == 3) {
    letter.push([
      fX - 10 + mR(30, 0),
      mY + mR(15, 0),
      letters[mR(letters.length, 0)],
      mR(20, 8),
      mR(4, 2) / 10,
      mR(4, 1) + Math.random(10) / 10,
      mR(30, 0)
    ]);
  }

  for (let i = 0; i < letter.length; i++) {
    if (sC == 2) {
      letter[i][2] = letters[mR(letters.length, 0)];
    }
    letter[i][1] -= letter[i][5];
    if (letter[i][4] >= 0) {
      letter[i][4] -= 0.01;
    } else {
      letter.splice(i, 1);
    }
  }

  animate();

  if (mouse) {
    mouse = false;
  }
};

animate = () => {
  con.clearRect(0, 0, can.width, can.height);
  for (let i = 0; i < letter.length; i++) {
    dT(letter[i][0], letter[i][1], letter[i][2], letter[i][3], letter[i][4]);
    let rH = mR(540, 10);
    let sH = mR(rH, 1);
    letter[i][6] == 2 ? dR(letter[i][0], letter[i][1] - sH, letter[i][3] / 1.5, rH, 'rgba(126, 196, 37, 0.01)') : null;
  }
};

setInterval(() => think(), 1000 / 60);

doc.ready(() => inject());
