const API_URL = "http://localhost:8000/api/"

let myForm = document.querySelector('#formLogin')

var myModal = new bootstrap.Modal(document.getElementById('myModalLogin'), {keyboard: false})
var myModal2 = new bootstrap.Modal(document.getElementById('myModalError'), {keyboard: false})


// Local Storage to reduce number of server´s requests
function saveUserProfile(myJSON) {
    localStorage.clear();

    for ([key, value] of Object.entries(myJSON)) {
        localStorage.setItem(key, value);
        console.log("mi item key is: " + key);
        console.log("my value is: " + value);
    }
}

function selectModal(){

    if () {

    }

}


// Form Data Retrieve
function getFormData(){

    let user_profile = {}

    let username = myForm.querySelector('#myUserName').value
    let password = myForm.querySelector('#myPassword').value

    user_profile = {...user_profile, username}
    user_profile = {...user_profile, password}

    return user_profile

}


// AJAX Comms to End-Point
const postFetch = async(postData) => {

    const data = await fetch(`${API_URL}users/login/`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })

    const dataResult = await data.json()

    console.log(dataResult)
    saveUserProfile(dataResult)

    return dataResult
}


// Event Handler
myForm.addEventListener('submit', (e) => {

    e.preventDefault()
    e.stopPropagation()

    let userData = getFormData()
    console.log("Form Data Result: ", userData)

    let myResponse = postFetch(userData)

    myResponse.then(console.log("Ajax Response Result: ", myResponse.data))
    myResponse.then(myModal.show())
    myResponse.catch((error)=>console.log(error)) 

    //myResponse.then(console.log("SUCESS"),console.log("Something Wrong"))
    //window.location.href = "people_amount.html" // If I enable this promise its interrupted and localStorage as well
})

/* 
-------------------------------------------------
    Algorithm description for this ajax 
-------------------------------------------------

1. user data introduction into form
2. user data validation
3. submit btn add event listener
4. prevent default
5. user data into json format
6. ajax comms to endpoint
7. catch BE response
8. store user ID into localstorage
9. redirect to the next page

*/

