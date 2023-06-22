import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit({
  auth: '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',
});

async function info() {
    try {
    const result = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'simpliweb',
      repo: 'jieeunLeePortfolio',
      title: "Created with the REST API",
      body: "This is a test issue created by the REST API",
      
    });
    console.log(result);
    console.log(
        `Success! Status: ${result.status}. Rate limit remaining: ${result.headers['x-ratelimit-remaining']}`
    );
    } catch (error) {
    console.log(
        `Error! Status: ${error.status}. Rate limit remaining: ${error.headers['x-ratelimit-remaining']}. Message: ${error.response.data.message}`
    );
    }      
}
info();



// function displayRepositoryInfo(data) {
//   const cocktail = data.drinks[0];
//   const cocktailDiv = document.getElementById('cocktail');
//   // cocktail name
//   const cocktailName = cocktail.strDrink;
//   const heading = document.createElement('h1');
//   heading.innerHTML = cocktailName;
//   cocktailDiv.appendChild(heading);
// }