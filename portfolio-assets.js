//image loading, lazy for 'lazy' class, eager for key images, blurHash

document.addEventListener('DOMContentLoaded', () => {

    // Preloading key images
    const keyImages = document.querySelectorAll('.key-image');

    keyImages.forEach(img => {
        const src = img.getAttribute('data-src');
        const preloadImg = new Image();
        preloadImg.src = src;
        img.onload = () => {
            img.classList.add('loaded');
        };
        img.src = src; // Also set the src to start loading the image eagerly
    });

    // Handle lazy images (with or without BlurHash)
    const lazyImages = document.querySelectorAll("img.lazy");

    const loadAndFadeInImage = (img) => {
        img.src = img.dataset.src;
        img.onload = () => {
            img.classList.add('loaded');
            // Additional logic if this is a BlurHash image
            // e.g., hide the BlurHash canvas or div
        };
    };

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    loadAndFadeInImage(lazyImage);
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(lazyImage => lazyImageObserver.observe(lazyImage));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(loadAndFadeInImage);
    }

    // Handle non-lazy images (without BlurHash)
    const regularImages = document.querySelectorAll("img:not(.lazy)");
    regularImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });
});

//---------------------------------------------------------------------------------

// Function to handle dropdown logic

function handleDropdownClick(event) {
    var isClickInsideMenuDropdown = event.target.closest('.tab-menu-dropdown') !== null;

    if (isClickInsideMenuDropdown) {
        var dropdown = event.target.closest('.tabs-container').querySelector('.tabs-menu');
        var icon = event.target.closest('.tab-menu-dropdown').querySelector('.chip-trailing-icon.filter-dropdown');

        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'flex';
            icon.classList.add('rotate-180');
        } else {
            dropdown.style.display = 'none';
            icon.classList.remove('rotate-180');
        }
    } else {
        document.querySelectorAll('.tabs-menu').forEach(function (dropdown) {
            if (dropdown.style.display !== 'none') {
                dropdown.style.display = 'none';
                var icon = dropdown.closest('.tabs-container').querySelector('.chip-trailing-icon.filter-dropdown');
                if (icon) {
                    icon.classList.remove('rotate-180');
                }
            }
        });
    }
}

// Attach event listener based on screen width

if (window.innerWidth < 768) {
    document.addEventListener('click', handleDropdownClick);
}

// Optionally, handle window resize to attach/detach the event listener
window.addEventListener('resize', function () {
    if (window.innerWidth < 768) {
        // Attach event listener if not already attached
        if (!document.hasClickListener) {
            document.addEventListener('click', handleDropdownClick);
            document.hasClickListener = true;
        }
    } else {
        // Remove event listener if screen width is not less than 768px
        if (document.hasClickListener) {
            document.removeEventListener('click', handleDropdownClick);
            document.hasClickListener = false;
        }
    }
});

//---------------------------------------------------------------------------------

//reset tab scroll position to top when switching

$(document).ready(function () {
    $('.scroll-to-top').on('click', function () {
        var windowWidth = $(window).width(); // Get the current window width
        var scrollValue;

        // Define scroll values for different breakpoints
        if (windowWidth < 768) { // Mobile breakpoint
            scrollValue = 0; // Mobile scroll value
        } else { // Desktop and larger
            scrollValue = 88; // Desktop scroll value
        }

        // Animate the scrollTop of .image-modal to the determined scrollValue
        $('.image-modal').animate({
            scrollTop: scrollValue
        }, 1000, 'easeOutQuart'); // Animation duration in milliseconds
    });
});

//---------------------------------------------------------------------------------

//update tab dropdown text to current tab

$(document).ready(function () {
    // Function to update the dropdown text of the corresponding tab component
    function updateDropdownText(tabComponent) {
        // Get the text of the active tab within this component
        var currentText = $(tabComponent).find('.tab-link.w--current .tab-link-text').text();
        // Update the text of the dropdown in this tab component
        $(tabComponent).find('.tab-dropdown-current-text').text(currentText);
    }

    // Update dropdown text for all tab components on page load
    $('.tabs-container').each(function () {
        updateDropdownText(this);
    });

    // Listen for clicks on the tab links within any tab component
    $('.tabs-container .tab-link').on('click', function () {
        // Use a timeout to allow Webflow to update the .w--current class
        var tabComponent = $(this).closest('.tabs-container');
        setTimeout(function () {
            updateDropdownText(tabComponent);
        }, 100);
    });
});

//---------------------------------------------------------------------------------

//one accordion open at a time

$('[data-click="faq"]').click(function () {
    if (!$(this).is('.open')) {
        $('[data-click="faq"].open').each((i, item) => {
            item.click();
        });
        $(this).addClass('open');
    } else {
        $(this).removeClass('open');
    }
});

//---------------------------------------------------------------------------------

//loader animation

document.addEventListener('DOMContentLoaded', function () {
    const bars = document.querySelectorAll('.rainbow-wave-loader div');
    let currentIndex = 0;
    const highlightBar = () => {
        bars.forEach((bar, index) => {
            bar.classList.remove('highlight');
            if (index === currentIndex) {
                bar.classList.add('highlight');
            }
        });
        currentIndex = (currentIndex + 1) % bars.length;
    };
    highlightBar();
    setInterval(highlightBar, 2200 / bars.length); // Sync with CSS animation duration
});

window.addEventListener('load', function () {
    console.log("Page loaded, starting timeout for loader fade-out.");
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            console.log("Fading out loader now.");
            loader.classList.add('fade-out');
        } else {
            console.error("Loader element not found.");
        }

        loader.addEventListener('animationend', () => {
            console.log("Fade-out animation completed, setting loader to display: none.");
            loader.style.display = 'none';
        });
    }, 4000); // Adjust this time as needed
});

//---------------------------------------------------------------------------------

//show/hide static images for before/after

//add .selected class to .switch on 1st and remove on 2nd click, remove .unselected class to .switch on 1st and add on 2nd click

// when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // on .switch click
    document.querySelectorAll('.switch').forEach(trigger => {
        trigger.addEventListener('click', function () {
            // using a more descriptive variable for toggle state
            this.toggleState = ((this.toggleState || 0) + 1) % 2;

            // finding the closest .with-switch container
            const container = this.closest('.with-switch');

            // elements within the same container
            const staticElements = container.querySelectorAll('.static-before-after');
            const splitterElements = container.querySelectorAll('.splitter-container');

            if (this.toggleState) { // 1st click
                staticElements.forEach(elem => elem.classList.add('visible'));
                splitterElements.forEach(elem => elem.classList.add('hidden'));
                this.closest('.switch').classList.add('selected');
                this.closest('.switch').classList.remove('unselected');
            } else { // 2nd click (toggle)
                staticElements.forEach(elem => elem.classList.remove('visible'));
                splitterElements.forEach(elem => elem.classList.remove('hidden'));
                this.closest('.switch').classList.remove('selected');
                this.closest('.switch').classList.add('unselected');
            }
        });
    });
});

//---------------------------------------------------------------------------------

//changing border radius on scroll

const changingRadiusElements = document.querySelectorAll('.changing-radius');

window.addEventListener('scroll', () => {
    changingRadiusElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // If the top of the element is still within the viewport
        if (rect.top >= 0 && rect.top <= windowHeight) {
            const visibleHeight = Math.min(rect.bottom, windowHeight) - rect.top;
            const totalHeight = rect.bottom - rect.top;
            const visibilityPercentage = visibleHeight / totalHeight;

            let newBorderRadius;

            if (visibilityPercentage >= 0.05) {
                newBorderRadius = 0; // Set to 0px when 5% or more is visible
            } else {
                newBorderRadius = 28 - (28 * (visibleHeight / (0.05 * totalHeight)));
            }

            element.style.borderTopLeftRadius = `${newBorderRadius}px`;
            element.style.borderTopRightRadius = `${newBorderRadius}px`;
        }
    });
});


//---------------------------------------------------------------------------------

//fade-in/out effect

// Initial check for visibility state
function initialCheck(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top < viewportHeight * 0.90) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    } else {
        element.style.opacity = '0';
        element.style.transform = 'translateY(100px)';
    }
}

window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.fade-effect');

    // Function to update visibility
    const updateVisibility = (element) => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top <= viewportHeight * 0.90) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        } else if (rect.top > viewportHeight * 0.90) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(100px)';
        }
    };

    // Initial state
    elements.forEach(updateVisibility);

    // Update on scroll
    window.addEventListener('scroll', () => {
        elements.forEach(updateVisibility);
    });
});

//---------------------------------------------------------------------------------

//reset scroll position on modal

document.querySelectorAll(".close-modal").forEach(function (button) {
    button.addEventListener("click", function () {
        setTimeout(function () {
            // Find the closest modal ancestor of the clicked button
            const modal = button.closest(".image-modal");
            if (modal) {
                modal.scrollTop = 0;
            }
        }, 800); // 800ms delay
    });
});


//---------------------------------------------------------------------------------

//show focused-pressed state layer on mouse down

// Grab all the buttons
const buttons = document.querySelectorAll('.button, .icon-button, .chip, .button-segment, .accordion-header, .menu-item');

// Loop through each button
buttons.forEach((button) => {
    // Grab the nested div for this button
    const nestedDiv = button.querySelector('.state-layer.focused-pressed');

    if (nestedDiv) {
        // Set initial opacity and transition
        nestedDiv.style.opacity = '0';
        nestedDiv.style.transition = 'opacity 200ms ease-out';

        // On mousedown, set opacity to 1
        button.addEventListener('mousedown', function () {
            nestedDiv.style.opacity = '1';
        });

        // On mouseup, revert opacity to 0
        button.addEventListener('mouseup', function () {
            nestedDiv.style.opacity = '0';
        });

        // Also consider the scenario where the user drags the mouse outside the button
        button.addEventListener('mouseleave', function () {
            nestedDiv.style.opacity = '0';
        });
    }
});

//---------------------------------------------------------------------------------

//ripple effect

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.button, .icon-button, .chip, .button-segment, .accordion-header, .menu-item');

    buttons.forEach(button => {
        button.addEventListener('mousedown', function (e) {
            // Create a new ripple element for this click
            const ripple = document.createElement("div");
            ripple.className = "ripple";

            // Get the existing color (assuming an existing ripple element)
            const existingRipple = button.querySelector('.ripple');
            const existingColor = window.getComputedStyle(existingRipple).backgroundColor;

            // Set the color for the new ripple
            ripple.style.backgroundColor = existingColor;


            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            ripple.classList.add('active');

            // Remove the ripple element when its animation is done
            ripple.addEventListener('animationend', function () {
                ripple.remove();
            });
        });
    });
});
