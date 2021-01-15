//全体の
const totalNum = 30;
let totalTime = 0;
let totalIncorrect = 0;

const h1Ele = document.getElementById("h1");
const historyEle = document.getElementById("history");
const numEle = document.getElementById("num");
const questionEle = document.getElementById("question");
const incorrectEle = document.getElementById("incorrect");
const answerEle = document.getElementById("answer");
answerEle.focus();//入力できる状態にしとく


//問題設定
let num = 1; //問題番号
let q1 = Math.round(Math.random()*88 +11); //11~99の整数
let q2 = Math.round(Math.random()*88 +11);
let correctAnswer = q1*q2;
let incorrect = 0;

//表示
numEle.textContent = "第"+num+"問";
questionEle.textContent = q1+"×"+q2;

//計測開始
let startTime = new Date();

answerEle.addEventListener("keypress", check);

function check(event) {
  if (event.key == "Enter") { //エンターキーが押されたら正誤判定
    const answer = answerEle.value;
    if (answer == correctAnswer) {
      console.log("正解");

      const endTime = new Date();
      const time = Math.round((endTime.getTime()-startTime.getTime())/1000);
      totalTime = totalTime + time;
      totalIncorrect = totalIncorrect + incorrect;

      //履歴更新
      let tr = document.createElement('tr');
      historyEle.appendChild(tr);
      let tdQuestion = document.createElement("td");
      tdQuestion.textContent = questionEle.textContent;
      let tdIncorrect = document.createElement("td");
      tdIncorrect.textContent = incorrect;
      let tdTime = document.createElement("td");
      tdTime.textContent = time;
      tr.appendChild(tdQuestion);
      tr.appendChild(tdIncorrect);
      tr.appendChild(tdTime);

      //次の問題へ
      next();

    }else {
      console.log("不正解");
      incorrect++;
      incorrectEle.style = "display: inline;";
    }
    answerEle.value = "";
  }
}

function next() {
  if (num == totalNum) {
    h1Ele.textContent = "お疲れ様でした";
    historyEle.style = "display: block;";

    let tr = document.createElement('tr');
    historyEle.appendChild(tr);
    let tdQuestion = document.createElement("td");
    tdQuestion.textContent = "総数："+totalNum;
    let tdIncorrect = document.createElement("td");
    tdIncorrect.textContent = "正答率："+Math.round(totalNum/(totalNum+totalIncorrect)*100)+"％";
    let tdTime = document.createElement("td");
    tdTime.textContent = "総時間："+totalTime+"秒";
    tr.appendChild(tdQuestion);
    tr.appendChild(tdIncorrect);
    tr.appendChild(tdTime);

  }else if (num < totalNum/3) { //2桁×2桁
    incorrectEle.style = "display: none;";

    //問題設定
    num++;
    q1 = Math.round(Math.random()*88 +11); //11~99の整数
    q2 = Math.round(Math.random()*88 +11);
    correctAnswer = q1*q2;
    incorrect = 0;

    //表示
    numEle.textContent = "第"+num+"問";
    questionEle.textContent = q1+"×"+q2;

    //計測開始
    startTime = new Date();

  }else if (num>=totalNum/3 && num<totalNum*2/3){
    h1Ele.textContent = "次は、2桁÷1桁！小数点以下3桁を四捨五入してください"
    incorrectEle.style = "display: none;";

    //問題設定
    num++;
    q1 = Math.round(Math.random()*88 +11);
    q2 = Math.round(Math.random()*8 +1);
    correctAnswer = Math.round(q1/q2*100)/100;
    incorrect = 0;

    //表示
    numEle.textContent = "第"+num+"問";
    questionEle.textContent = q1+"÷"+q2;

    //計測開始
    startTime = new Date();

  }else {
    h1Ele.textContent = "最後に、2桁÷2桁！小数点以下3桁を四捨五入してください"
    incorrectEle.style = "display: none;";

    //問題設定
    num++;
    q1 = Math.round(Math.random()*88 +11);
    q2 = Math.round(Math.random()*88 +11);
    correctAnswer = Math.round(q1/q2*100)/100;
    incorrect = 0;

    //表示
    numEle.textContent = "第"+num+"問";
    questionEle.textContent = q1+"÷"+q2;

    //計測開始
    startTime = new Date();

  }

}
