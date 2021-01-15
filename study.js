const cn0Ele = document.getElementById("cn0")//hero
let cn0Ctx = cn0Ele.getContext("2d")
const cn1Ele = document.getElementById("cn1")//bullet
let cn1Ctx = cn1Ele.getContext("2d")
const cn2Ele = document.getElementById("cn2")//enemy
let cn2Ctx = cn2Ele.getContext("2d")

let heroSize = 30;
let heroX = cn0Ele.width/2;
let heroY = cn0Ele.height-heroSize/2-10;

let bulletSize = 5;
let bulletX = -1;
let bulletY = -1;

let enemyNumber = 15;
let enemySize = 30;
let enemyPosition = [];
for (let i = 0; i <enemyNumber; i++) {
  enemyPosition.push([1, Math.random()*(cn0Ele.width-20-enemySize)+10+enemySize*0.5, Math.random()*(cn0Ele.height/3-10-enemySize*0.5)+10+enemySize*0.5, Math.random()*20+10]);
}

drawHero();
drawEnemy();

function drawHero(){
  cn0Ctx.clearRect(0, 0, cn0Ele.width, cn0Ele.height);
  cn0Ctx.beginPath(); //パスの宣言
  cn0Ctx.fillStyle = "blue";
  cn0Ctx.arc(heroX, heroY, 1, 0, Math.PI * 2, true); // 中心
  cn0Ctx.fill();
  cn0Ctx.rect(heroX-heroSize/2,heroY-heroSize/2, heroSize,heroSize);
  cn0Ctx.stroke();
}

function drawBullet(){
  //描画
  cn1Ctx.clearRect(0, 0, cn0Ele.width, cn0Ele.height);

  cn1Ctx.beginPath();
  cn1Ctx.fillStyle = "black";
  cn1Ctx.arc(bulletX, bulletY, bulletSize, 0, Math.PI * 2, true); // 円
  cn1Ctx.fill();

  ///enemyとの当たり判定
  let frag = 0;
  for (var i = 0; i < enemyPosition.length; i++) {
    if (enemyPosition[i][0]==1) {
      if ((enemyPosition[i][1]-bulletX)**2+(enemyPosition[i][2]-bulletY)**2 <= (enemySize*0.5+bulletSize)**2 +5) {
        enemyPosition[i][0]=0;
        cn1Ctx.textAlign = "center";
        cn1Ctx.fillText("HIT!!", enemyPosition[i][1],enemyPosition[i][2]);
      }
    }else {
      frag++;
    }
  }
  if (frag == enemyNumber) {//enemyを全員倒してたら、終了
    document.removeEventListener("keydown", input);
    cn0Ctx.textAlign = "center";
    cn0Ctx.font = "200px cursive";
    cn0Ctx.fillText("YOU WIN!!", cn0Ele.width/2,cn0Ele.height/2, cn0Ele.width);
  }

  //更新
  bulletY = bulletY - 20;
  if (bulletY > -40) {
    setTimeout(drawBullet, 200);
  }
}

function drawEnemy(){
  cn2Ctx.clearRect(0, 0, cn0Ele.width, cn0Ele.height);

  for (var i = 0; i < enemyPosition.length; i++) {

    if (enemyPosition[i][0]==1) {//生存してたら
      //描画
      cn2Ctx.beginPath(); //パスの宣言
      cn2Ctx.fillStyle = "red";
      cn2Ctx.arc(enemyPosition[i][1], enemyPosition[i][2], 1, 0, Math.PI * 2, true); // 中心
      cn2Ctx.stroke();
      cn2Ctx.rect(enemyPosition[i][1]-enemySize/2,enemyPosition[i][2]-enemySize/2, enemySize,enemySize);
      cn2Ctx.fill();

      ///heroとの当たり判定
      if ((enemyPosition[i][1]-heroX)**2+(enemyPosition[i][2]-heroY)**2 <= (enemySize*0.5+heroSize*0.5)**2) {
        document.removeEventListener("keydown", input);

        cn2Ctx.textAlign = "center";
        cn2Ctx.fillText("[[DEATH!!]]", heroX,heroY);
        cn0Ctx.textAlign = "center";
        cn0Ctx.font = "200px cursive";
        cn0Ctx.fillText("GAME OVER...", cn0Ele.width/2,cn0Ele.height/2, cn0Ele.width);
      }


      //進行
      enemyPosition[i][2] = enemyPosition[i][2] + enemyPosition[i][3];
      if (enemyPosition[i][2] >= cn0Ele.height+enemySize/2) {//降りきったらまた上から
        enemyPosition[i][2] = 10 - enemySize/2;
      }
    }

  }

  setTimeout(drawEnemy, 300);
}

document.addEventListener("keydown", input);

function input(event){
  switch (event.key) {
    case "ArrowRight":
      heroX = heroX + 15;
      drawHero();
      break;
    case "ArrowLeft":
      heroX = heroX - 15;
      drawHero();
      break;
    case "a":
      bulletX = heroX;
      bulletY = heroY-heroSize/2;
      drawBullet();
  }
}
