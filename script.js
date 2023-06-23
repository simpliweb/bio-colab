// in order to use Github Rest API to display repository information
import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit({
  auth: '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',
});

async function orgInfo() {
    try {
      const result = await octokit.request('GET /orgs/{org}/repos', {
        org: 'simpliweb-projects',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      // display repository information
      const titles = document.querySelectorAll('.project-title');
      const details = document.querySelectorAll('.paragraph');
      const pushedAt = document.querySelectorAll('.updatedAt');

      result.data.forEach((repo, index) => {
        titles[index].textContent = repo.name;
        details[index].textContent = repo.description;

        // format display resository pushed date 
        const pushed = new Date(repo.pushed_at);
        const formattedDate = pushed.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });        
        pushedAt[index].textContent = `${formattedDate}`;
      });
      console.log(
        `Success! Status: ${result.status}. Rate limit remaining: ${result.headers['x-ratelimit-remaining']}`
      );
    } catch (error) {
    console.log(
        `Error! Status: ${error.status}. Rate limit remaining: ${error.headers['x-ratelimit-remaining']}. Message: ${error.response.data.message}`
    );
    }     
}
orgInfo();