//Vue
var vm = new Vue({
  el: "#app",
  data: {
    staNameJa: "うえの",
    doubleColor: true,
    doubleNum: true,
    num: true,
    synchronizeNC: "路線色1と一致",
    synchronizeNC2: "自由選択",
  },
  //computed: {
  //  callData: function () {
  //    var saved = JSON.parse(window.localStorage.getItem("lastData"));
  //  },
  //},
});

var canvas1 = document.getElementById("base");
var ctx = canvas1.getContext("2d");
var canvas4 = document.getElementById("staname");
var ctxSN = canvas4.getContext("2d");
var canvas3 = document.getElementById("threeLetter");
var ctxT = canvas3.getContext("2d");
var canvas2 = document.getElementById("numbering");
var ctxN = canvas2.getContext("2d");
var canvas5 = document.getElementById("numbering2");
var ctxN2 = canvas5.getContext("2d");
var result = document.getElementById("result");
var ctxR = result.getContext("2d");

WebFont.load({
  custom: {
    families: [
      "M PLUS 1p",
      "Arial",
      "Open Sans",
      "Lato",
      "Noto Sans SC",
      "Noto Sans KR",
    ],
  },
  active: function () {
    update();
  },
});

const jaFont =
  "'M PLUS 1p', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'M+ 1p', 'sans-serif'";
const enFont = "'Helvetica', 'Arial', sans-serif";
const numFont = "'Open Sans', 'Lato', 'sans-serif'";
const chFont = "Noto Sans SC";
const koFont = "Noto Sans KR";

let station = {};
update();
//function
window.onbeforeunload = function (e) {
  e.returnValue = "入力内容は保存されません。ページを離れてよろしいですか？";
};
function update() {
  station.doubleColor = document.getElementById("sameColor").checked;
  station.numbering = document.getElementById("staNumSwitch").checked;
  station.numbering2 = document.getElementById("staNumSwitch2").checked;
  station.threeLS = document.getElementById("staThreeLetterSwitch").checked;
  station.lineColor1 = document.getElementById("color1").value;
  station.lineColor2 = document.getElementById("color2").value;

  switch (document.getElementById("synchronizeNC").value) {
    case "路線色1と一致":
      station.numColor1 = station.lineColor1;
      break;
    case "路線色2と一致":
      station.numColor1 = station.lineColor2;
      break;
    default:
      station.numColor1 = color1N.value;
      break;
  }

  switch (document.getElementById("synchronizeNC2").value) {
    case "路線色1と一致":
      station.numColor2 = station.lineColor1;
      break;
    case "路線色2と一致":
      station.numColor2 = station.lineColor2;
      break;
    default:
      station.numColor2 = color2N.value;
      break;
  }

  station.staNameJa = document.getElementById("sta-name-ja").value;
  station.staNameEn = document.getElementById("sta-name-en").value;
  station.staNameCh = document.getElementById("sta-name-ch").value;
  station.staNameKo = document.getElementById("sta-name-ko").value;
  station.numColor = station.lineColor1;
  station.numText = document
    .getElementById("sta-num")
    .value.replace(/[^a-z,A-Z]/g, "");
  station.num = document.getElementById("sta-num").value.replace(/[^0-9]/g, "");
  station.numText2 = document
    .getElementById("sta-num2")
    .value.replace(/[^a-z,A-Z]/g, "");
  station.num2 = document
    .getElementById("sta-num2")
    .value.replace(/[^0-9]/g, "");
  station.threeL = document.getElementById("sta-threeLetter").value;
  //window.localStorage.setItem("lastData", JSON.stringify(station)); //保存
  draw(station);
}

function download() {
  let link = document.createElement("a");
  link.href = result.toDataURL("image/png");
  link.download = station.staNameJa + "_縦型駅名標.png";
  link.click();
}

function drawNum(ctxN, y, numText, num, color) {
  //枠
  ctxN.fillStyle = color;
  ctxN.moveTo(60, y); //スタート地点
  ctxN.arc(74, y, 14, Math.PI, 1.5 * Math.PI, false); //左上
  ctxN.lineTo(186, y - 14); //直線上
  ctxN.arc(186, y, 14, 1.5 * Math.PI, 0, false); //右上
  ctxN.lineTo(200, y + 116); //直線右
  ctxN.arc(186, y + 112, 14, 0, 0.5 * Math.PI, false); //右下
  ctxN.lineTo(50, y + 126); //直線下
  ctxN.arc(74, y + 112, 14, 0.5 * Math.PI, Math.PI, false); //左下
  ctxN.closePath(); //パスを閉じる(直線左)
  ctxN.fill();
  //中身
  ctxN.fillStyle = "whitesmoke";
  ctxN.fillRect(74, y, 112, 112);
  ctxN.textAlign = "center";
  ctxN.fillStyle = "#383838";
  ctxN.font = `bold 47px ${numFont}`;
  ctxN.fillText(numText, 130, y + 42, 200);
  ctxN.font = `bold 65px ${numFont}`;
  ctxN.fillText(num, 130, y + 97, 200);
}

function draw(station) {
  ctx.beginPath();
  ctxSN.beginPath();
  ctxN.beginPath();
  ctxN2.beginPath();
  ctxT.beginPath();

  ctx.clearRect(0, 0, 260, 1220);
  ctxSN.clearRect(0, 0, 260, 2040);
  ctxN.clearRect(0, 0, 260, 1220);
  ctxN2.clearRect(0, 0, 260, 1220);
  ctxT.clearRect(0, 0, 260, 1220);
  //本体

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 130 * 2, 610 * 2);
  ctx.shadowColor = "gray";
  ctx.shadowBlur = 5 * 2;
  ctx.fillStyle = "whitesmoke";
  ctx.beginPath(); //パスリセット
  ctx.moveTo(5 * 2, 10 * 2); //スタート地点
  ctx.arc(10 * 2, 10 * 2, 5 * 2, Math.PI, 1.5 * Math.PI, false); //左上
  ctx.lineTo(120 * 2, 5 * 2); //直線上
  ctx.arc(120 * 2, 10 * 2, 5 * 2, 1.5 * Math.PI, 0, false); //右上
  ctx.lineTo(125 * 2, 600 * 2); //直線右
  ctx.arc(120 * 2, 600 * 2, 5 * 2, 0, 0.5 * Math.PI, false); //右下
  ctx.lineTo(10 * 2, 605 * 2); //直線下
  ctx.arc(10 * 2, 600 * 2, 5 * 2, 0.5 * Math.PI, Math.PI, false); //左下
  ctx.closePath(); //パスを閉じる(直線左)
  ctx.fill();
  //ラインカラー
  ctx.shadowBlur = 0;
  ctx.fillStyle = station.lineColor1;
  ctx.fillRect(41 * 2, 5 * 2, 48 * 2, 90 * 2);
  if (station.doubleColor) {
    ctx.fillStyle = station.lineColor2;
    ctx.fillRect(65 * 2, 5 * 2, 24 * 2, 90 * 2);
  }
  //駅名描画
  ctxSN.setTransform(1, 0, 0, 1, 0, 0);
  ctxSN.font = `bold 130px ${jaFont}`;
  ctxSN.textAlign = "center";
  ctxSN.fillStyle = "#383838";
  var textList = station.staNameJa.split("");
  function writeVertical() {
    textList.forEach((tx, i) => {
      ctxSN.fillText(tx, 130, 466 + 120 * (i - 1), 120);
    });
  }
  if (
    textList.length >= 4 &&
    textList.length <= 5 &&
    station.numbering &&
    station.numbering2
  ) {
    ctxSN.setTransform(1, 0, 0, 0.8, 0, 5);
    writeVertical();
  } else if (
    textList.length >= 6 &&
    textList.length <= 7 &&
    station.numbering &&
    station.numbering2
  ) {
    ctxSN.setTransform(1, 0, 0, 0.6, 0, 50);
    writeVertical();
  } else if (textList.length === 6 || textList.length === 7) {
    ctxSN.setTransform(1, 0, 0, 0.77, 0, 5);
    writeVertical();
  } else if (textList.length >= 8) {
    ctxSN.setTransform(1, 0, 0, 0.6, 0, 50);
    writeVertical();
  } else {
    writeVertical();
  }

  ctx.font = `bold 130px ${jaFont}`;
  ctx.textAlign = "center";
  ctx.fillStyle = "#383838";
  //駅名英語
  ctx.font = `bold 50px ${enFont}`;
  ctx.fillText(station.staNameEn, 65 * 2, 550 * 2, 100 * 2);
  //駅名中国語
  ctx.font = `32px ${chFont}`;
  ctx.fillText(station.staNameCh, 65 * 2, 572 * 2, 100 * 2);
  //駅名韓国語
  ctx.font = `32px ${koFont}`;
  ctx.fillText(station.staNameKo, 65 * 2, 594 * 2, 100 * 2);
  //ナンバリング
  //スリーレターコード
  ctxT.fillStyle = "#383838";

  y = station.numbering2 ? 732 : 882;

  ctxT.moveTo(46, y); //スタート地点
  ctxT.arc(74, y, 28, Math.PI, 1.5 * Math.PI, false); //左上
  ctxT.lineTo(186, y - 28); //直線上
  ctxT.arc(186, y, 28, 1.5 * Math.PI, 0, false); //右上
  ctxT.lineTo(214, 1028); //直線右
  ctxT.arc(186, 1028, 28, 0, 0.5 * Math.PI, false); //右下
  ctxT.lineTo(74, 1056); //直線下
  ctxT.arc(74, 1028, 28, 0.5 * Math.PI, Math.PI, false); //左下
  ctxT.closePath(); //パスを閉じる(直線左)
  ctxT.fill();

  ctxT.fillStyle = "whitesmoke";
  ctxT.textAlign = "center";
  ctxT.font = `47px ${numFont}`;
  ctxT.fillText(station.threeL, 130, y + 11.5, 200);

  if (station.numbering && station.numbering2) {
    drawNum(ctxN, 760, station.numText, station.num, station.numColor1);
    drawNum(ctxN2, 914, station.numText2, station.num2, station.numColor2);
  } else if (station.numbering) {
    drawNum(ctxN, 914, station.numText, station.num, station.numColor1);
  }

  //合成
  ctxR.drawImage(canvas1, 0, 0);
  ctxR.drawImage(canvas4, 0, 0);
  if (station.threeLS && station.numbering) {
    ctxR.drawImage(canvas3, 0, 0);
  }

  ctxR.drawImage(canvas2, 0, 0);
  ctxR.drawImage(canvas5, 0, 0);
}
