const  loginForm = document.getElementById("form")
const  loginUsername = document.querySelector('.login-username')
const  loginPassword = document.querySelector('.login-password')
const inputs = document.querySelectorAll('#form input')

function showError(input, message){
    const formControl = input.parentElement

    formControl.className = 'form-control error'

    const small = formControl.querySelector('small')

    small.innerText = message
}

function showSuccess(input){
    const formControl = input.parentElement

    formControl.className = 'form-control success'
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
      if(input.value.trim()=== ''){
        showError(input, `${getFieldnName(input)} is required` )
      }else{
        showSuccess(input)
      }
          
      
    });
}

function getFieldnName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}




let userName = localStorage.getItem('username')
let userPassword = localStorage.getItem('pin')

console.log(userName)
console.log(userPassword)

function verifyUser(username, password){

    if(username.value.trim() === '' && password.value === ''){
        showError(username,`${getFieldnName(username)} is required` )
        showError(password,`${getFieldnName(password)}  is required` )
    }else if(username.value.trim() === ''){
        showError(username,`${getFieldnName(username)} is required` )
    }else if(password.value === ''){
        showError(password,`${getFieldnName(password)}  is required` )
    }

    else{
        if(username.value.trim() !== userName && password.value !== userPassword){
            showError(username,`${getFieldnName(username)} does not match` )
            showError(password,`${getFieldnName(password)}  does not match` )
        }else if(username.value.trim() === userName && password.value !== userPassword){
            showError(password,`${getFieldnName(password)}  does not match` )
        }else if(username.value.trim() !== userName && password.value === userPassword){
            showError(username,`${getFieldnName(username)} does not match` )
            showError(password,`${getFieldnName(password)}  does not match` )
        }else{
            showSuccess(username)
            showSuccess(password)
            window.location.href = '../pages/main.html'
        }
       
    }
}

function checkifUserExist(username, password){
    // checkRequired(inputs)
    verifyUser(username, password)
    
}




loginForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    // checkRequired(inputs)
    checkifUserExist(loginUsername, loginPassword)
})