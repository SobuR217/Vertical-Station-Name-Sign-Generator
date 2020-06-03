window.onbeforeunload = function (e) {
  e.returnValue = "行った変更が保存されない可能性があります。";
};
let defaultData = {
  color: "#F68B1E",
  color2: "#257BCB",
  numColorPrevious1: "#F68B1E",
  numColorPrevious2: "#00B261",
  doubleColor: true,
  staNameJa: "うえの",
  staNameEn: "Ueno",
  staNameCh: "上野",
  staNameKo: "우에노",
  threeL: "UEN",
  numPrevious1: "JU 02",
  numPrevious2: "JJ 01",
  numbering: true,
  numbering2: true,
  synchronizeNC: "路線色1と一致",
  synchronizeNC2: "自由選択",
  staThreeLetterSwitch: true,
  localCharacter: false,
  localCharacterWho: "むすび丸",
};

//Vue
var vm = new Vue({
  el: "#app",
  data: () => {
    let saved = localStorage.getItem("lastSaved");
    if (JSON.parse(saved)) {
      return JSON.parse(saved);
    } else {
      let station = {};
      Object.assign(station, defaultData);
      return station;
    }
  },
  computed: {
    numColor1: function () {
      switch (this.synchronizeNC) {
        case "路線色1と一致":
          return this.color;
        case "路線色2と一致":
          return this.color2;
        default:
          return this.numColorPrevious1;
      }
    },
    numColor2: function () {
      switch (this.synchronizeNC2) {
        case "路線色1と一致":
          return this.color;
        case "路線色2と一致":
          return this.color2;
        default:
          return this.numColorPrevious2;
      }
    },
    numText: function () {
      return this.numPrevious1.replace(/[^a-z,A-Z]/g, "");
    },
    numText2: function () {
      return this.numPrevious2.replace(/[^a-z,A-Z]/g, "");
    },
    num: function () {
      return this.numPrevious1.replace(/[^0-9]/g, "");
    },
    num2: function () {
      return this.numPrevious2.replace(/[^0-9]/g, "");
    },
    lCImage: function () {
      lCImage = new Image();

      switch (this.localCharacterWho) {
        case "むすび丸":
          lCImage.src = "images/onigiriBanana.png";
          return lCImage;
        //case "hoge":
        //  lCImage.src  = "images/hoge.png";
        //  break;
      }
    },
  },
  methods: {
    reset: function () {
      localStorage.clear();
      Object.assign(this.$data, defaultData);
      this.draw();
    },

    download() {
      let link = document.createElement("a");
      link.href = result.toDataURL("image/png");
      link.download = this.staNameJa + "_縦型駅名標.png";
      link.click();
    },

    drawNum(ctxN, y, numText, num, color) {
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
    },

    draw() {
      ctxN.beginPath();
      ctxN.clearRect(0, 0, 260, 1220);
      ctxR.beginPath();
      ctxR.clearRect(0, 0, 260, 1220);
      ctx.beginPath();
      ctx.clearRect(0, 0, 260, 1220);
      ctxSN.beginPath();
      ctxSN.clearRect(0, 0, 260, 2070);
      ctxN2.beginPath();
      ctxN2.clearRect(0, 0, 260, 1220);
      ctxT.beginPath();
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
      ctx.fillStyle = this.color;
      ctx.fillRect(41 * 2, 5 * 2, 48 * 2, 90 * 2);
      if (this.doubleColor) {
        ctx.fillStyle = this.color2;
        ctx.fillRect(65 * 2, 5 * 2, 24 * 2, 90 * 2);
      }
      //駅名描画
      ctxSN.setTransform(1, 0, 0, 1, 0, 0);
      ctxSN.font = `bold 130px ${jaFont}`;
      ctxSN.textAlign = "center";
      ctxSN.fillStyle = "#383838";
      let staNameJaReplaced = this.staNameJa
        .replace(/ー/g, "l")
        .replace(/-/g, "l");
      var textList = staNameJaReplaced.split("");
      function writeVertical() {
        textList.forEach((tx, i) => {
          ctxSN.fillText(tx, 130, 466 + 120 * (i - 1), 120);
        });
      }
      if (
        textList.length >= 4 &&
        textList.length <= 5 &&
        this.numbering &&
        this.numbering2
      ) {
        ctxSN.setTransform(1, 0, 0, 0.8, 0, 5);
        writeVertical();
      } else if (
        textList.length >= 6 &&
        textList.length <= 7 &&
        this.numbering &&
        this.numbering2
      ) {
        ctxSN.setTransform(1, 0, 0, 0.6, 0, 60);
        writeVertical();
      } else if (textList.length === 6 || textList.length === 7) {
        ctxSN.setTransform(1, 0, 0, 0.77, 0, 15);
        writeVertical();
      } else if (textList.length >= 8) {
        ctxSN.setTransform(1, 0, 0, 0.6, 0, 60);
        writeVertical();
      } else {
        writeVertical();
      }

      ctx.font = `bold 130px ${jaFont}`;
      ctx.textAlign = "center";
      ctx.fillStyle = "#383838";
      //駅名英語
      ctx.font = `bold 50px ${enFont}`;
      ctx.fillText(this.staNameEn, 65 * 2, 550 * 2, 100 * 2);
      //駅名中国語
      ctx.font = `32px ${chFont}`;
      ctx.fillText(this.staNameCh, 65 * 2, 572 * 2, 100 * 2);
      //駅名韓国語
      ctx.font = `32px ${koFont}`;
      ctx.fillText(this.staNameKo, 65 * 2, 594 * 2, 100 * 2);
      //ナンバリング
      //スリーレターコード
      if (this.staThreeLetterSwitch && this.numbering) {
        ctxT.fillStyle = "#383838";

        y = this.numbering2 ? 732 : 882;

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
        ctxT.fillText(this.threeL, 130, y + 11.5, 200);
      }

      if (this.numbering && !this.numbering2) {
        this.drawNum(ctxN, 914, this.numText, this.num, this.numColor1);
      } else if (this.numbering && this.numbering2) {
        this.drawNum(ctxN, 760, this.numText, this.num, this.numColor1);
        this.drawNum(ctxN2, 914, this.numText2, this.num2, this.numColor2);
      }

      //合成
      ctxR.drawImage(canvas1, 0, 0);
      ctxR.drawImage(canvas4, 0, 0);

      ctxR.drawImage(canvas3, 0, 0);

      ctxR.drawImage(canvas2, 0, 0);
      ctxR.drawImage(canvas5, 0, 0);
      if (this.localCharacter) {
        ctxR.drawImage(this.lCImage, 50, 50, 170, 170);
      }
    },
    save() {
      //保存
      localStorage.setItem("lastSaved", JSON.stringify(this.$data));
    },
  },
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

jaFont =
  "'M PLUS 1p', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'M+ 1p', 'sans-serif'";
enFont = "'Helvetica', 'Arial', sans-serif";
numFont = "'Open Sans', 'Lato', 'sans-serif'";
chFont = "Noto Sans SC";
koFont = "Noto Sans KR";

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
    vm.draw();
  },
});
vm.draw();
