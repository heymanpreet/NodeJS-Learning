console.log("before");
//const userData = getUser(1); // we cant get data from async function like this.
//console.log(userData);// we will get undefined because it will be executed first & results will be available later
//when the result is ready user function will be called
// Callback hell
// getUser(1,(user) => {
//     console.log(user);
//     getRepositories(user.gihubUserName, repos => {
//         console.log(`repositories: ${repos}`);
//         getCommits(repos,commits => {
//             console.log(`commits: ${commits}`);
//         })
//     })
// })

// Fixing issue of callback hell by defining naming function
getUser(1,getRepoFromUser)
console.log("after");
function displayCommits(commits) {
    console.log(`commits: ${commits}`);
}

function getCommitFromRepo(repos) {
    console.log(`repositories: ${repos}`);
    getCommits(repos,displayCommits);
}

function getRepoFromUser(user) {
    console.log(user);
    getRepositories(user.gihubUserName, getCommitFromRepo);
}

function getUser(id,callback){
    setTimeout(() => {
        console.log("Reading Data from Database");
        callback({"userId":id, gihubUserName:'mosh'});
    },2000);
}

function getRepositories(gitUser,callbackRepo) {
    setTimeout(() => {
        console.log("getting repos of user");
        callbackRepo(['Repo1','Repo2','Repo3']);
    },2000)
}

function getCommits(gitRepo,callback) {
    setTimeout(() => {
        console.log("getting commits of Repo");
        callback(['Commit1','commit2','commit3']);
    },2000)
};