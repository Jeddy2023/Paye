const  form = document.getElementById("form")
const  username = document.getElementById("username")
const  email = document.getElementById("email")
const  password = document.getElementById("pin")
const  password2 = document.getElementById("pin2")

// VALIDATION FUNCTION

// SHOWERROR MESSAGE
function showError(input, message){
    // getting the parent element of the input tag
    const formControl = input.parentElement

    // adding a class to the parent element of the username input parent element
    formControl.className = 'form-control error'

    // getting the small tag that's display the error message
    const small = formControl.querySelector('small')

    // making the text of the small text to be equal to any error message passed into it
    small.innerText = message
}

// SHOW SUCCESS OUTLINE
function showSuccess(input){
    // getting the parent element of the username input tag
    const formControl = input.parentElement

    // adding a class to the parent element of the username input parent element
    formControl.className = 'form-control success'
}

// CHECK REQURED FIELD
function checkRequired(inputArr){
    // this function loops through all the input and check if the requirement are meet
    inputArr.forEach(function(input){
      if(input.value.trim()=== ''){
        showError(input, `${getFieldnName(input)} is required` )
      }else(
          showSuccess(input)
      )
    });
}


// CHECK LENGTH

function checkLength(input, min, max){
    let userName = username.value
    if(input.value.length < min){
        showError(input, `${getFieldnName(input)} must be greater than ${min} characters`) 
    }else if(input.value.length > max){
        showError(input, `${getFieldnName(input)} must be less than ${max} characters`) 
    }else{
        showSuccess(input)
        localStorage.setItem('username', userName)  
    }
}

// GET FIELD NAME
function getFieldnName(input){
    // this function returns the id name of the input id with the first letter capitalised
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}


// CHECK IF THE THE PASSWORDS INPUT MATCH
function checkPasswordMatch(input1, input2){
    let userPassword = password2.value
    if(input1.value !== input2.value){
        showError(input2, `Pin's do not match`)
    }else if(input1.value === ''){
        showError(input2, `Pin's do not match`)
    }
    else{
        showSuccess(input2)
        localStorage.setItem('pin', userPassword) 
    }
}



// CHECK EMAIL IS VALID
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

   if(re.test(input.value.trim())){
    showSuccess(input)
   }else{
      showError(input, 'Email is not valid')
   }
}


// EVENT LISTENERS
// AN EVENTLISTENER FOR FORM VALIDATION
form.addEventListener("submit", function(e){
    // this stops the form from auto submiting
    e.preventDefault()
    checkRequired([username, email, password, password2,])
   checkLength(username, 3, 15)
   checkLength(password, 6, 25)
   checkEmail(email)
   checkPasswordMatch(password, password2)
   successPass = document.querySelectorAll('.success')
   console.log(successPass.length)
   if(successPass.length > 3){
    window.location.href = 'login.html';
   }
})

// function checkifUserExist(username, password){
  

// }

