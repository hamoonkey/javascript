const btn0Ele = document.getElementById("btn0")
btn0Ele.addEventListener("click", stop);
function stop(){
  switch (frag) {
    case 0:
      frag = 1;
      btn0Ele.value = "再生";
      break;
    case 1:
      frag = 0;
      next();
      btn0Ele.value = "一時停止"
      break;

  }
}

const historyEle = document.getElementById("history");
const btn1Ele = document.getElementById("btn1")
btn1Ele.addEventListener("click", show);
function show(){
  if (btn1Ele.textContent == "+") {
    historyEle.style = "display: block;";
    btn1Ele.textContent = "-";
  }else {
    historyEle.style = "display: none;";
    btn1Ele.textContent = "+";
  }
}


const cn0Ele = document.getElementById("cn0")
let cn0Ctx = cn0Ele.getContext("2d") //2次元のグラフィックスを扱う宣言

const number = 100;
const infectCount0 = 5; //最初の感染者数
let state = [];

for (let i = 0; i < infectCount0; i++) {
  state.push([1, Math.random()*cn0Ele.width, Math.random()*cn0Ele.height, 0]); // [感染状況、キャンバス上のx,y、感染時間]
}
for (let i = infectCount0; i < number; i++) {
  state.push([0, Math.random()*cn0Ele.width, Math.random()*cn0Ele.height, 0]); // [感染状況、キャンバス上のx,y、感染時間]
}
const refTime = 10; //治るまでの時間
const radian = 10; //人の半径。移動距離はこれの2倍
let time = 0;
const maxTime = 100;
let frag = 0;

const cn1Ele = document.getElementById("cn1")
let cn1Ctx = cn1Ele.getContext("2d") //2次元のグラフィックスを扱う宣言
const marginWidth = 30;
const marginHeight = 30;

//軸と目盛り
cn1Ctx.beginPath();
cn1Ctx.moveTo(marginWidth, 0);
cn1Ctx.lineTo(marginWidth, cn1Ele.height - marginHeight);
cn1Ctx.lineTo(cn1Ele.width, cn1Ele.height- marginHeight);
cn1Ctx.stroke();
cn1Ctx.textAlign = "center";
cn1Ctx.textBaseline = "middle";
for (let i = 0; i < 10; i++) {//横軸
  cn1Ctx.fillText(i*maxTime/10, marginWidth+(cn1Ele.width-marginWidth)/10*i, cn1Ele.height-marginHeight + 7);
}
for (let i = 0; i < 10; i++) {//縦軸
  cn1Ctx.fillText(i*number/10, marginWidth -7, (cn1Ele.height-marginHeight)*(1-i/10));
}
cn1Ctx.beginPath();

//main
draw();
setTimeout(next, 1000);



function draw(){ //Canvas描画とグラフ描画と履歴追記
  //Canvas描画
  cn0Ctx.clearRect(0, 0, cn0Ele.width, cn0Ele.height);
  let infectCount = 0;

  for (let i = 0; i < number; i++) {

    cn0Ctx.beginPath(); //パスの宣言
    switch (state[i][0]) {
      case 0:
        cn0Ctx.fillStyle = "white"
        break;
      case 1:
        cn0Ctx.fillStyle = "red";
        infectCount++;
        break;
      case 2:
        cn0Ctx.fillStyle = "blue";
        break;
    }

    cn0Ctx.arc(state[i][1], state[i][2], radian, 0, Math.PI * 2, true); // 円
    cn0Ctx.stroke();
    cn0Ctx.fill();
  }

  //グラフ描画
  cn1Ctx.lineTo( marginWidth+(cn1Ele.width-marginWidth)/maxTime*time, (cn1Ele.height-marginHeight)*(1-infectCount/number) );
  cn1Ctx.stroke();

  //履歴追記
  let tr = document.createElement('tr');
  historyEle.appendChild(tr);
  let tdTime = document.createElement("td");
  tdTime.textContent = time;
  let tdInfectedCount = document.createElement("td");
  tdInfectedCount.textContent = infectCount;
  tr.appendChild(tdTime);
  tr.appendChild(tdInfectedCount);
}


function next(){

  //更新
  time++;
  for (let i = 0; i < number; i++) {
    //感染経過
    if (state[i][0] == 1) {
      state[i][3]++;
      if (state[i][3] == refTime) {
        state[i][0] =2;
      }
    }

    //移動
    let rad = Math.PI*2 /6 * Math.floor(Math.random()*6);
    state[i][1] = state[i][1] + 2*radian*Math.sin(rad);
    state[i][2] = state[i][2] + 2*radian*Math.cos(rad);
  }

  //感染判定
  for (let i = 0; i < number; i++) {
    if (state[i][0] == 1) {//感染中の人について
      for (let j = 0; j < number; j++) {
        if ( Math.sqrt( (state[i][1]-state[j][1])**2 +(state[i][2]-state[j][2])**2 ) <= 2*radian && state[j][0] == 0) { //接触
          state[j][0] = 1;
        }
      }
    }
  }

  draw();

  if (time < maxTime && frag == 0) {
    setTimeout(next, 1000);
  }
}
