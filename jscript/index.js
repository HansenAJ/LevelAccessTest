console.log("Javascript Loaded");

//Accessible users and passwords in place of a true database
let userlist = [
    {user:"level", pass: 'Access123', name:"LevelAccess", email:"LevelAccess@LevelAccess.com"},
    {user:"LaurenH", pass: 'LaurenPass', name:"Lauren H", email:"Lauren.hrabsky@levelaccess.com"},
    {user:"AlexH", pass: 'AlexPass', name:"Alex H", email:"Hansen.Alexander.J@gmail.com"}
]

//Checks if session storage is empty, if so, it pre-populates with userlist above
if(JSON.stringify(sessionStorage.getItem("mainUserList")) == 'null'){
    sessionStorage.setItem("mainUserList", JSON.stringify(userlist));
}

//Add script to buttons on various page loads
if(document.getElementsByClassName("login_btn")[0] != null){
    document.getElementsByClassName("login_btn")[0].addEventListener("click", loginCheck);
}
if(document.getElementsByClassName("newacc_btn")[0] != null){
    document.getElementsByClassName("newacc_btn")[0].addEventListener("click", acc_rdr);
}
if(document.getElementsByClassName("userinfo")[0] != null){
    //use session storage to display log in success and user name
    let currentUser = sessionStorage.getItem("name");
    document.getElementsByClassName("userinfo")[0].innerHTML = "Thank you for logging in to Level Access, " + currentUser + ".";
}
if(document.getElementsByClassName("account_btn")[0] != null){
    document.getElementsByClassName("account_btn")[0].addEventListener("click", accountCreate);
}
if(document.getElementsByClassName("home_btn")[0] != null){
    document.getElementsByClassName("home_btn")[0].addEventListener("click", signOut);
}
if(document.getElementsByClassName("signout_btn")[0] != null){
    document.getElementsByClassName("signout_btn")[0].addEventListener("click", signOut);
}



function loginCheck(){
    //Get user inputs from page
    let userinput = document.getElementsByClassName("user_input")[0].value;
    let passinput = document.getElementsByClassName("pass_input")[0].value;
    //Counter to exit for-loop gracefully
    let loginsuccess = 0;
    //Gets master list of logins from local storage
    let masterList = JSON.parse(sessionStorage.getItem("mainUserList"));
    //Loop to verify user/pass combo is present in list
    for(i=0; i <=(masterList.length - 1); i++){
        if(masterList[i].user == userinput && masterList[i].pass == passinput){
            loginsuccess = 1;
            //Session storage for displaying user to logged in page
            sessionStorage.setItem("name", masterList[i].name);
            //GO TO LOGGED IN PAGE
            window.location.href ="./goodlogin.html";
            break;
        }
    }
    //If no user/pass combo is found, redirect to failed login page
    if(loginsuccess == 0){
        sessionStorage["loggeduser"] = '';
        window.location.href ="./badlogin.html";
    }

}
//Function to validate passwords match on new user creation, and display error if passwords don't match
function passValidate(){
    let pass = document.getElementsByClassName("pass_input")[0].value;
    let passval = document.getElementsByClassName("passval_input")[0].value;

    if(pass==passval){
       document.getElementsByClassName("passverify")[0].style.visibility = "hidden";
       document.getElementsByClassName("passverify")[0].removeAttribute("role", "alert");
       document.getElementsByClassName("account_btn")[0].disabled = false;
    }else{
        document.getElementsByClassName("passverify")[0].style.visibility = "visible";
        document.getElementsByClassName("passverify")[0].setAttribute("role", "alert");
        document.getElementsByClassName("account_btn")[0].disabled = true;
    }

}

//Function to create accounts
function accountCreate(){
    //creates new user object and populates it with data from form
    let newUser = {user:"", pass:"", name:"", email:""};
    newUser.user = document.getElementsByClassName("user_input")[0].value;
    newUser.pass = document.getElementsByClassName("pass_input")[0].value;
    newUser.name = document.getElementsByClassName("name_input")[0].value;
    newUser.email = document.getElementsByClassName("email_input")[0].value;
    //Sets user name to session for new account
    sessionStorage.setItem("name", newUser.name);
    //Gets main list from session storage, adds new user, then over-writes previous mainlist
    let tempUserList = JSON.parse(sessionStorage.getItem("mainUserList"));
    tempUserList.push(newUser);
    sessionStorage.setItem("mainUserList", JSON.stringify(tempUserList));
    //clears previous information in 'newUser' for next addition. This step may be uneeded.
    newUser = {user:"", pass:"", name:"", email:""};
}
//Redirects new user creation to logged in page
function newUserRedirect(){
    window.location.replace("./goodlogin.html");
    return false;
}
function acc_rdr(){
    window.location.href ="./newuser.html";
}
//Function to do a dummy sign-out and return to fresh login page
function signOut(){
    window.location.href ="./index.html";
}