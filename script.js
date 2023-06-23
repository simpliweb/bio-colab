// in order to use Github Rest API to display repository information
import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit({
  auth: process.env.TOKEN,
});
// process.env.TOKEN
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


// responsive drop-down-nav
document.addEventListener("DOMContentLoaded", () => {
  console.log('running')  
    const open = document.querySelector('.menu-open');
    const close = document.querySelector('.menu-close');
    const menu = document.querySelector('.drop-down-nav');
    const home = document.getElementById('home-anchor');
    const about = document.getElementById('about-anchor');
    const projects = document.getElementById('projects-anchor');


    open.addEventListener('click', (e) => {      
        menu.classList.add('open');
    })

    close.addEventListener('click', (e) => {
        menu.classList.remove('open');
    })

    home.addEventListener('click', (e) => {
      menu.classList.remove('open');
    }); 

    about.addEventListener('click', (e) => {
      menu.classList.remove('open');
    }); 

    projects.addEventListener('click', (e) => {
      menu.classList.remove('open');
    }); 

}) // END drop-down-nav