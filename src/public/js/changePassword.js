let button = document.querySelector('#btn')

button.addEventListener('click', (e)=>{
    e.preventDefault
    location.href = 'http://localhost:8080/auth/login'
})