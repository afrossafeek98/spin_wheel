// Border Line Adjustment
const border_line = 10;

// Segment Colours and Items
const sectors = [
  { color: "#56ccf2", label: "COLA" },
  { color: "#2e9cdb", label: "FANTA" },
  { color: "#2f80ed", label: "ESPRESSO" },
  { color: "#f2c94c", label: "MILCHKAFFE" },
  { color: "#f2994a", label: "COLA" },
  { color: "#eb5857", label: "FANTA" },
  { color: "#6fcf97", label: "MILCHKAFFE" },
  { color: "#27ae60", label: "CAPPUCHINO" },
  { color: "#bb6bd9", label: "ESPRESSO" },
  { color: "#9b51e0", label: "MILCHKAFFE" },
  { color: "#56ccf2", label: "COLA" },
  { color: "#2e9cdb", label: "FANTA" },
  { color: "#2f80ed", label: "ESPRESSO" },
  { color: "#f2c94c", label: "MILCHKAFFE" },
  { color: "#f2994a", label: "COLA" },
  { color: "#eb5857", label: "FANTA" },
  { color: "#6fcf97", label: "MILCHKAFFE" },
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const elSpin = document.querySelector("#now_turn");
const ctx = document.querySelector("#wheel").getContext`2d`;
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / tot;
let ang = 0;

//* Get index of current sector */
const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;

//* Draw sectors and prizes texts to canvas */
const drawSector = (sector, i) => {
  const ang = arc * i;
  ctx.save();
  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();
  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(sector.label, rad - border_line, 5);
  ctx.restore();
};

elSpin.addEventListener("click", () => {
  spin()
});

// // INIT!
sectors.forEach(drawSector);

function spin() {
  let preferred_rotation = 4;
  let steps = 360 / tot;

  let randomIndex = Math.round(Math.random() * (tot - 1));
  let pin_degree = 0;

  if (
    (tot > 11 && tot < 13) ||
    (tot > 15 && tot < 22) ||
    (tot > 27 && tot < 50)
  )
    pin_degree = steps / 2;
  let randomItem = sectors[randomIndex]["label"];

  let rotation = 0;
  let randomNum = [];
  let num = 0;
  for (let t = 3; t < sectors.length; t++) {
    num = num + 1;
    randomNum[t] = num;
  }

  let count = parseInt(90 / steps);
  rotation = (360 * preferred_rotation) + (360 - randomIndex * steps) - (steps / 2);
  
  let randomDegree = rotation;
  let randomGift = randomItem;

  const myButton = document.getElementById("now_turn");
  myButton.style.display = "none";

  const styleElement = document.getElementById("dynamic-keyframes");
  styleElement.id = "dynamic-keyframes";

  const keyframesCSS =
    `
    @-webkit-keyframes wheelOfFortune {
      0% {
          -webkit-transform: rotate(0);
                  transform: rotate(0);
      }
      100% {
          -webkit-transform: rotate(` +
    randomDegree +
    `deg);
                  transform: rotate(` +
    randomDegree +
    `deg);
      }
    }
    @keyframes wheelOfFortune {
        0% {
            -webkit-transform: rotate(0);
                    transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(` +
    randomDegree +
    `deg);
                    transform: rotate(` +
    randomDegree +
    `deg);
        }
    }
    
    #wheelOfFortune {
      -webkit-animation: wheelOfFortune 7s cubic-bezier(0.0, 0.0, 0.0, 1.10) both;
              animation: wheelOfFortune 7s cubic-bezier(0.0, 0.0, 0.0, 1.10) both;
    }

    @keyframes div-block-133 {
      0% {
          transform: scale(1,1);
      }
      50% {
          transform: scale(1.2,1.2);
      }
      100% {
          transform: scale(1,1);
      }
    }
  
    .div-block-133 {
      animation: div-block-133 2s;
    }

    @keyframes heading-5 {
      0% {
          transform: scale(1,1);
      }
      50% {
          transform: scale(1.2,1.2);
      }
      100% {
          transform: scale(1,1);
      }
    }
  
    .heading-5 {
      animation: heading-5 2s;
    }
  `;

  styleElement.innerHTML = keyframesCSS;
  document.head.appendChild(styleElement);

  setTimeout(function () {
    replaceInlineCSSInPop(randomGift);
  }, 8000);
}

function replaceInlineCSSInPop(randomGift) {
  console.log(randomGift);
  const myGiftDiv = document.getElementById("giftDiv");
  myGiftDiv.style =
    "opacity: 1; display: flex;position: absolute;left: 173px;top: 15%;";

  const myGiftPop = document.getElementById("giftPopup");
  myGiftPop.style =
    "-webkit-transform:translate3d(0, 0, 0) scale3d(1.5, 1.5, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;";

  const mySpan = document.getElementById("gift");
  mySpan.innerText = randomGift;
}