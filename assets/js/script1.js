   // ===== Slider Logic =====
    const skillsTabs = document.querySelectorAll(".skills .tab-btn");
    const skillsSlider = document.getElementById("skillsSlider");
    const skillsDropdown = document.getElementById("skillsDropdown");

    const projectsTabs = document.querySelectorAll(".projects .tab-btn");
    const projectsSlider = document.getElementById("projectsSlider");
    const projectsDropdown = document.getElementById("projectsDropdown");

    function slideTo(slider, index) {
      slider.style.transform = `translateX(-${index * 100}%)`;
    }

    // Desktop tab clicks
    skillsTabs.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        skillsTabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        slideTo(skillsSlider, i);
        skillsDropdown.value = i;
      });
    });

    projectsTabs.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        projectsTabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        slideTo(projectsSlider, i);
        projectsDropdown.value = i;
      });
    });

    // Mobile dropdown changes
    skillsDropdown.addEventListener("change", e => {
      const index = e.target.value;
      slideTo(skillsSlider, index);
      skillsTabs.forEach(b => b.classList.remove("active"));
      skillsTabs[index].classList.add("active");
    });

    projectsDropdown.addEventListener("change", e => {
      const index = e.target.value;
      slideTo(projectsSlider, index);
      projectsTabs.forEach(b => b.classList.remove("active"));
      projectsTabs[index].classList.add("active");
    });