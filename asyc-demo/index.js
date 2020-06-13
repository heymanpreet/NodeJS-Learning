console.log("before");
//const userData = getUser(1); // we cant get data from async function like this.
//console.log(userData);// we will get undefined because it will be executed first & results will be available later
//when the result is ready user function will be called
getUser(1,function (user) {
    console.log(user);
    // Get Repos
    getRepositories(user.gihubUserName,(repos) => {
        console.log(repos);
    })  
})
console.log("after");

// function getUser(id){
//     setTimeout(() => {
//         console.log("Reading Data from Database");
//         return {"userId":id, gihubUserName:'mosh'}
//     },2000);
// }
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