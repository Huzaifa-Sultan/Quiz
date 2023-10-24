import inquirer from "inquirer";
import chalk from "chalk";


const apiLink: string =
"https://opentdb.com/api.php?amount=05&category=9&difficulty=medium&type=multiple"
let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data);
  let res = await fetchQuiz.json();
  return res.results;
};

let data = await fetchData(apiLink);

let startQuiz = async () => {
  let score: number = 0;
  //for user name
  let name = await inquirer.prompt({
    type: "input",
    name: "fName",
    message: "What is your Name?",
  });
  for (let i = 1; i <= 5; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];
    let ans = await inquirer.prompt({
      type: "list",
      name: "quiz",
      message: data[i].question,
      choices: answers.map((val: any) => val) ,
    });
    if (ans.quiz==data[i].correct_answer) {
        ++score 
        console.log(chalk.blue.bold.italic("Correct"));
    }else{
    console.log(`correct answer is ${chalk.bold.red.italic(data[i].correct_answer)}`);
    }
  }
};
 startQuiz()
