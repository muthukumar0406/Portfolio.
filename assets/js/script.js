/* ================================
   PORTFOLIO MAIN SCRIPT
================================= */
$(document).ready(function () {

    /* ========== Navbar toggle (mobile view) ========== */
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll-to-top button activation
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll spy: highlight active section link
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    /* ========== Smooth scrolling ========== */
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    /* ========== EmailJS Contact Form with Validation ========== */
$(document).ready(function () {
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        const $form = $(this);
        const $message = $("#form-message");
        const userEmail = $("#email").val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!emailRegex.test(userEmail)) {
            $message
              .text("❌ Please enter a valid email address.")
              .css("color", "red")
              .fadeIn();
            return;
        }

        // Send form data via AJAX to Formspree
        $.ajax({
            url: $form.attr("action"),
            method: "POST",
            data: $form.serialize(),
            dataType: "json",
            success: function () {
                $message
                  .text("✅ Message sent successfully!")
                  .css("color", "green")
                  .fadeIn();
                $form[0].reset();
            },
            error: function () {
                $message
                  .text("❌ Oops! Something went wrong. Please try again.")
                  .css("color", "red")
                  .fadeIn();
            }
        });
    });
});


    // $("#contact-form").submit(function (event) {
    //     event.preventDefault();

    //     // Get email value from form
    //     const userEmail = $("#email").val().trim();
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //     // Validate email format
    //     if (!emailRegex.test(userEmail)) {
    //         alert("❌ Please enter a valid email address before submitting.");
    //         return; // Stop submission
    //     }

    //     // Initialize EmailJS
    //     emailjs.init("BYXK2Wd1JZq3Ofm-6"); // <-- Replace with your EmailJS Public Key

    //     // Send the form data
    //     emailjs.sendForm('service_lrb7m7l', 'template_27gzjnx', '#contact-form')
    //         .then(function (response) {
    //             console.log('✅ SUCCESS!', response.status, response.text);
    //             $("#contact-form")[0].reset();
    //             alert("✅ Message Sent Successfully!");
    //         }, function (error) {
    //             console.error('❌ FAILED...', error);
    //             alert("❌ Message Sending Failed! Please try again.");
    //         });
    // });
});

/* ========== Dynamic Title and Favicon Change ========== */
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Muthu Kumar";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back to Portfolio 👋";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

/* ========== Typed.js Effect ========== */
var typed = new Typed(".typing-text", {
    strings: ["frontend development","backend development", "network enginner", "devops (upcoming)"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

/* ========== Fetch and Display Skills ========== */
async function fetchData(type = "skills") {
    try {
        const path = type === "skills" ? "./skills.json" : "./projects/projects.json";
        const response = await fetch(path);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Error fetching ${type}:`, err);
    }
}

function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
            <div class="bar">
                <div class="info">
                    <img src="${skill.icon}" alt="${skill.name}" />
                    <span>${skill.name}</span>
                </div>
            </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).forEach(project => {
        projectHTML += `
            <div class="box tilt">
                <img draggable="false" src="assets/images/projects/${project.image}.png" alt="${project.name}" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    // 3D hover effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
}

// /* ========== Load Skills & Projects ========== */
// fetchData("skills").then(data => { if (data) showSkills(data); });
// fetchData("projects").then(data => { if (data) showProjects(data); });

/* ========== Scroll Reveal Animations ========== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h3, .home .content p, .home .content .btn, .home .image', { delay: 200 });
srtop.reveal('.skills .container .bar, .education .box, .work .box, .contact .container', { interval: 200 });
// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('form-message');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    messageDiv.innerHTML = '';
    messageDiv.className = '';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Success message
            messageDiv.innerHTML = '✅ Thank you! Your message has been sent successfully.';
            messageDiv.style.color = 'green';
            messageDiv.className = 'success-message';
            form.reset(); // Clear the form
        } else {
            // Error message
            const errorData = await response.json();
            messageDiv.innerHTML = '❌ Failed to send message. Please try again.';
            messageDiv.style.color = 'red';
            messageDiv.className = 'error-message';
        }
    } catch (error) {
        // Network error
        messageDiv.innerHTML = '❌ Network error. Please check your connection and try again.';
        messageDiv.style.color = 'red';
        messageDiv.className = 'error-message';
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});