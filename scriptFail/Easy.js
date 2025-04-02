"use strict";

let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let answer = 0;
let kin = 0;
let bkin = 0;

const start = document.getElementById("start");
const ans = document.getElementById("answer");
const items = document.querySelectorAll("ul li");
const tables = document.getElementById("table");
const zg1 = document.getElementById("zougen1");
const zg2 = document.getElementById("zougen2");

//掛け金
const Pkin = document.getElementById("pkin");
const Bkin = document.getElementById("bkin");
document.getElementById("Kin").innerHTML = kin;
document.getElementById("botKin").innerHTML = bkin;

//ゲームスタート
document.getElementById("start").addEventListener("click", () => {
  document.getElementById("Kin").innerHTML = kin;
  document.getElementById("botKin").innerHTML = bkin;
  //お互いの選んだ数字を示す
  let num1 = 0;
  let num2 = 0;
  //お互いの掛け金を示す
  let kake1 = 0;
  let kake2 = 0;
  //勝った方の値に1を入れる変数
  let p = 0;
  let b = 0;
  let dr = 0;
  let kotae = 0;
  //コインの増減示す値
  let zoug1 = 0;
  let zoug2 = 0;
  //botの選択
  let bot = Math.floor(Math.random() * 9) + 1;
  //数字
  num2 = number[bot];
  num1 = pChoice(num1);
  //選んだ数字表示
  document.getElementById("P").innerHTML = num1;
  document.getElementById("C").innerHTML = num2;
  //数字の結果
  Answer();
  //勝敗判定
  p = 0;
  b = 0;
  dr = 0;

  p = PHantei(num1, num2, kin, bkin, kake1, kake2, p);
  b = BHantei(num1, num2, kin, bkin, kake1, kake2, b);
  console.log("p:", p);
  console.log("b:", b);
  setTimeout(function () {
    //どっちも勝ってる場合下記でdrowメソッドを呼ぶ
    if (p == 1 && b == 1) {
      dr = drHantei(dr);
    } else if (p == 1) {
      alert("勝ちです。");
      kin = kin + 1;
      document.getElementById("Kin").innerHTML = kin;
    } else if (b == 1) {
      alert("負けです！！！");
      bkin = bkin + 1;
      document.getElementById("botKin").innerHTML = bkin;
    }
  }, 500);
  if (kin == 10) {
    console.log("コインがなくなりました。あなたの負けです。");
    window.location.replace("GameOver.html");
  }
  if (bkin == 10) {
    console.log("あいてコインがなくなりました。あなたの勝ちです。");
    window.location.replace("GameOver.html");
  }
});
function Kakekin(kin, bkin, kake1, kake2) {
  //掛け金表示
  if (p == 1) {
    kin = kin + kake2;
    bkin = bkin - kake2;
    let ka1 = kake2;
    let ka2 = kake2 * -1;
    console.log("あんた", kin);
    document.getElementById("Kin").innerHTML = kin;
    document.getElementById("botKin").innerHTML = bkin;
    document.getElementById("zougen1").innerHTML = "+" + ka1;
    document.getElementById("zougen2").innerHTML = ka2;
  }
}
//プレイヤーの選択
function pChoice(num1) {
  num1 = 0;
  num1 = parseFloat(document.getElementById("num1").value);
  if (num1 > 10 || num1 < 0) {
    document.getElementById("tyukoku").innerHTML =
      "１０以下の数字で入力してください。";
    pChoice(num1);
  }
  return num1;
}
//答え表示
function Answer() {
  let i = Math.floor(Math.random() * number.length);
  answer = number[i];
  document.getElementById("answer").innerHTML = answer;
  console.log("答え", answer);
}
//どっちの勝ちか？
function PHantei(num1, num2, kin, bkin, kake1, kake2, p) {
  let sa1 = answer - num1;
  let sa2 = answer - num2;
  let keturon = 0;
  if (sa1 < 0) {
    sa1 = sa1 * -1;
  }
  if (sa2 < 0) {
    sa2 = sa2 * -1;
  }
  keturon = Math.min(sa1, sa2);
  if (keturon == sa1) {
    p = 1;
    return p;
  }
}
function BHantei(num1, num2, kin, bkin, kake1, kake2, b) {
  let sa1 = answer - num1;
  let sa2 = answer - num2;
  let keturon = 0;
  if (sa1 < 0) {
    sa1 = sa1 * -1;
  }
  if (sa2 < 0) {
    sa2 = sa2 * -1;
  }
  //どっちが小さいかを判別
  keturon = Math.min(sa1, sa2);
  if (keturon == sa2) {
    b = 1;
    return b;
  }
}
function drHantei(dr) {
  alert("D　R　O　W　です！！");
  dr = 1;
  return dr;
}

//num1はplayerの選んだ数字
//kinはplayerの総掛け金
//kake1はplayerのいくら掛けるか

//num2はｂｏｔの選んだ数字
//bkinはbotの総掛金
//kake2はbotのいくら掛ける
