// timeout before a callback is called

    let timeout;

    // traversing the DOM and getting the input and span using their IDs

    let password = document.getElementById('userPassword')
    let strengthBadge = document.getElementById('StrengthDisp')

    // The strong and weak password Regex pattern checker

    let strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
    let mediumPassword = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')

    function StrengthChecker(PasswordParameter){
        // We then change the badge's color and text based on the password strength

        if(strongPassword.test(PasswordParameter)) {
            strengthBadge.style.color = "green";
            strengthBadge.textContent = 'Strong';
        } else if(mediumPassword.test(PasswordParameter)){
            strengthBadge.style.color = 'blue';
            strengthBadge.textContent = 'Medium';
        } else{
            strengthBadge.style.color = 'red';
            strengthBadge.textContent = 'Weak';
        }
    }

    // Adding an input event listener when a user types to the  password input

    password.addEventListener('input', () => {

        //The badge is hidden by default, so we show it

        strengthBadge.style.display= 'block'
        clearTimeout(timeout);

        //We then call the StrengChecker function as a callback then pass the typed password to it

        timeout = setTimeout(() => StrengthChecker(password.value), 100);

        //Incase a user clears the text, the badge is hidden again

        if(password.value.length !== 0){

        } else{
            strengthBadge.textContent = 'None';
        }
    }, false);
