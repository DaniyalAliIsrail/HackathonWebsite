import{ auth, signInWithEmailAndPassword,} from "./firebaseConfig.js"
// var show = document.getElementById("psShow")
var password = document.getElementById("password")
var email = document.getElementById("email")

const signIn = document.getElementById("signIn")
signIn.addEventListener("click",login)
function login(){
   
    if(!email.value || !password.value){
        Swal.fire({
            title: 'Fill All The Fields',
            icon: 'warning',
            confirmButtonColor: 'rgb(119, 73, 248)',
            iconColor: 'rgb(119, 73, 248)'
          })
        return
    }
    
signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) =>{
    localStorage.setItem("user",JSON.stringify(userCredential))
    window.location.replace("./dashboard.html")
  })
  .catch((error) => {
    const errorMessage = error.message
    console.log(error.message);
    if(errorMessage == "Firebase: Error (auth/user-not-found)."){
        Swal.fire({
            title: 'User Not Exist',
            icon: 'warning',
            confirmButtonColor: 'rgb(119, 73, 248)',
            iconColor: 'rgb(119, 73, 248)'
          })
    }else if(errorMessage == "Firebase: Error (auth/invalid-email)."){
        Swal.fire({
            title: 'Invalid-Email',
            icon: 'warning',
            confirmButtonColor: 'rgb(119, 73, 248)',
            iconColor: 'rgb(255, 0, 0)'
          })
    }else if(errorMessage == "Firebase: Error (auth/wrong-password)."){
         Swal.fire({
                text: 'Password Doesn\'t Match',
                icon: 'warning',
                iconColor: 'rgb(119, 73, 248)',
                confirmButtonColor: 'rgb(119, 73, 248)',
              })
    }
  });
         
}