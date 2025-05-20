document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#navbar ul li a');
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0; // Get navbar height for scroll offset

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate position to scroll to, considering navbar height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Optionally, close mobile nav if open, and update active link immediately
                // For now, active link is handled by scroll listener
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('.resume-section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 20; // Adjust for navbar and a little buffer
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        // If at the top of the page, or no section is "current" (e.g. scrolled past last section),
        // you might want to clear all active states or set the first link as active.
        // For this setup, if 'current' is empty (e.g. top of page before first section), no link will be active.
        // If scrolled to the very top, make "Summary" active if it's the first section.
        if (window.pageYOffset < sections[0].offsetTop - navbarHeight - 20) {
             navLinks.forEach(link => link.classList.remove('active'));
             const firstLink = document.querySelector('#navbar ul li a[href="#summary"]');
             if (firstLink) {
                // firstLink.classList.add('active'); // Or remove active from all if preferred
             }
        }
    });


    // Hover effects for experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('experience-item-hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('experience-item-hover');
        });
    });

    // Hover effects for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('project-item-hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('project-item-hover');
        });
    });

    // Basic check for console log from initial setup
    console.log("JavaScript file loaded and interactive features enabled.");
});
