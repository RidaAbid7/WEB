function doBindings() {
    let submitBtn = document.getElementById("submitBtn");
    submitBtn.onclick = handleFormSubmission; 
    scrolldown;
}
$(doBindings);
// $(document).ready(function(){
//     scrolldown();
// });

function handleFormSubmission(event) {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        event.preventDefault();
    }
}
  
  




function scrolldown(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}