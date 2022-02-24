const { Builder, By, Key, until } = require("selenium-webdriver");
async function test() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://guessIt.vercel.app/");
  var ans = await driver.findElement(By.className("col_gen")).getText();
  ans=ans.substring(3);
  ans="rgba"+ans;
  ans = ans.replace(")", ",1)");
//   console.log(typeof(ans));
  var choices = await driver.findElements(By.className("box"));
  let opts = [];
  for (let i = 0; i < choices.length; i++) {
    opts.push(await choices[i].getCssValue("background-color"));
    opts[i] = opts[i].replace(/\s/g, "");
  }
  //   console.log(opts);
  let res;
  for (let i = 0; i < opts.length; i++) {
    console.log(ans + " " + opts[i]);
    if (ans == opts[i]) {
      res = i;
      break;
    }
  }
  solve(choices[res]);
  close(driver);
}
function solve(choice){
    setTimeout(() => {
        if (choice) choice.click();
        else {
            console.log("No solution found");
        }
    }, 2000);
}
function close(driver){
    setTimeout(() => {
        driver.close();
    }
    , 4000);
}
test();
