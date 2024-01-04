// Function to apply styles to the '.timeline-scale-effect' elements /////////////////////////////////////////////////


function applyTimelineScaleEffect(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top <= viewportHeight * 0.95) {
        element.style.opacity = '1';
        element.style.transform = 'scale3d(1, 1, 1)';
        element.style.transition = 'opacity .3s cubic-bezier(.77, 0, .175, 1), transform .3s cubic-bezier(.785, .135, .15, .86)';
    } else {
        element.style.opacity = '0';
        element.style.transform = 'scale3d(0, 1, 1)';
        element.style.transition = 'opacity .2s cubic-bezier(.77, 0, .175, 1), transform .1s linear';
    }

    // Apply effects to direct children with a timeout
    const children = element.children;
    Array.from(children).forEach((child) => {
        if (rect.top <= viewportHeight * 0.95) {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translate3d(0px, 0px, 0px)';
                child.style.transition = 'opacity .5s cubic-bezier(.77, 0, .175, 1), transform .5s cubic-bezier(.25, .46, .45, .94)';
            }, 400 ); // Delay applies only when in viewport

        } else {
            child.style.opacity = '0';
            child.style.transform = 'translate3d(0px, 12px, 0px)';
            child.style.transition = 'opacity .2s cubic-bezier(.77, 0, .175, 1), transform .1s linear';

        }
    });

}

window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.timeline-scale-effect');

    elements.forEach(applyTimelineScaleEffect);

    // Update on scroll
    window.addEventListener('scroll', () => {
        elements.forEach(applyTimelineScaleEffect);

    });
});

// nav drawer slide in and out /////////////////////////////////////////////////

const navDrawer = document.querySelector('.nav-drawer');
const navDrawerSegments = document.querySelector('.nav-drawer-segments');
const navRailSegment = document.querySelector('.nav-rail-segment._w-nav-drawer');
const navRail = document.querySelector('.nav-rail');
const closeTriggers = document.querySelectorAll('.trigger-nav-drawer-close');

let openTimeout;

// Function to open the drawer with a delay
function openDrawerWithDelay() {
  clearTimeout(openTimeout); // Clear any existing timeout
  openTimeout = setTimeout(() => {
    navDrawer.classList.add('open');
    // Add shadow with delay
    /*setTimeout(() => {
      navDrawerSegments.classList.add('shadow-delayed');
    }, 400); // Adjust this delay for the shadow*/
  }, 300); // Delay for opening the drawer
}

// Function to close the drawer immediately
function closeDrawer() {
  clearTimeout(openTimeout);
  navDrawer.classList.remove('open');
  navDrawerSegments.classList.remove('shadow-delayed'); // Remove shadow immediately
}

// Open drawer when hovering over navRailSegment
navRailSegment.addEventListener('mouseenter', openDrawerWithDelay);

// Close drawer when mouse leaves navRailSegment, unless hovering over navDrawer or navRail
navRailSegment.addEventListener('mouseleave', () => {
  if (!navDrawer.matches(':hover') && !navRail.matches(':hover')) {
    closeDrawer();
  }
});

// Keep drawer open when hovering over navDrawer or navRail
navDrawer.addEventListener('mouseenter', () => clearTimeout(openTimeout));
navDrawer.addEventListener('mouseleave', () => {
  if (!navRailSegment.matches(':hover') && !navRail.matches(':hover')) {
    closeDrawer();
  }
});

navRail.addEventListener('mouseenter', () => {
  if (navDrawer.classList.contains('open')) {
    clearTimeout(openTimeout);
  }
});
navRail.addEventListener('mouseleave', () => {
  if (!navDrawer.matches(':hover') && !navRailSegment.matches(':hover')) {
    closeDrawer();
  }
});

// Close drawer when hovering over elements with .trigger-nav-drawer-close class
closeTriggers.forEach(trigger => {
  trigger.addEventListener('mouseenter', closeDrawer);
});



//mobile nav and mobile fab sliding in and out on scroll /////////////////////////////////////////////////

/*let lastScrollY = window.scrollY;
let navbar = document.querySelector('.navbar-mobile');
let fab = document.querySelector('.fab.fixed');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const maxScrollY = document.body.scrollHeight - window.innerHeight;
  const isScrollingDown = currentScrollY > lastScrollY;

  // Prevent animation at the top and bottom bounce
  if (currentScrollY <= 0 || currentScrollY >= maxScrollY) {
    return;
  }

  // Navbar logic
  navbar.style.transform = isScrollingDown ? 'translateY(-150%)' : 'translateY(0)';

  // FAB logic
  fab.style.transform = isScrollingDown ? 'translateY(150%)' : 'translateY(0)';

  lastScrollY = currentScrollY;
});



//preloader animation
//no longer needed
document.addEventListener('DOMContentLoaded', function () {
    // Detect if the browser is Chrome
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
        // Only run the animation if it's not Chrome
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
    }
}); */

//preloader fade out and display to none /////////////////////////////////////////////////

window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');

        loader.addEventListener('animationend', () => {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 250);
        });
    } else {
        console.error("Loader element not found.");
    }
});


document.querySelectorAll('.delayed-link').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default immediate navigation

        var destinationUrl = this.getAttribute('href'); // Get the URL from the link's href attribute

        setTimeout(function () {
            window.location.href = destinationUrl; // Navigate to the URL after the delay
        }, 500); // Delay in milliseconds (1000ms = 1 second)
    });
});



// Mapping of slugs to section classes /////////////////////////////////////////////////

var slugToTagMapping = {
    'startup-platform': 'sos',
    'athletic-training-app': 't121',
    'intranet-design-system': 'rhds',
    'job-order-process': 'rhjo',
    'about': 'main'
};

// defining color values for the color variables /////////////////////////////////////////////////

var variableColorValues = ['primary', 'on-primary', 'primary-container', 'on-primary-container', 'primary-fixed', 'on-primary-fixed', 'primary-fixed-dim', 'on-primary-fixed-variant', 'secondary', 'on-secondary', 'on-secondary-hover', 'on-secondary-focused-pressed', 'on-secondary-drag', 'secondary-container', 'on-secondary-container', 'secondary-fixed', 'on-secondary-fixed', 'secondary-fixed-dim', 'on-secondary-fixed-variant', 'tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container', 'tertiary-fixed', 'on-tertiary-fixed', 'tertiary-fixed-dim', 'on-tertiary-fixed-variant', 'error', 'on-error', 'error-container', 'on-error-container', 'outline', 'background', 'on-background', 'surface', 'on-surface', 'surface-variant', 'on-surface-variant', 'inverse-surface', 'inverse-on-surface', 'inverse-primary', 'shadow', 'surface-tint', 'outline-variant', 'scrim', 'surface-container-highest', 'surface-container-high', 'surface-container', 'surface-container-low', 'surface-container-lowest', 'surface-bright', 'surface-dim', 'primary-hover', 'primary-focused-pressed', 'primary-drag', 'on-primary-hover', 'on-primary-focused-pressed', 'on-primary-drag', 'on-secondary-container-hover', 'on-secondary-container-focused-pressed', 'on-secondary-container-drag', 'on-secondary-fixed-variant-hover', 'on-secondary-fixed-variant-focused-pressed', 'on-secondary-fixed-variant-drag', 'on-tertiary-container-hover', 'on-tertiary-container-focused-pressed', 'on-tertiary-container-drag', 'on-surface-hover', 'on-surface-focused-pressed', 'on-surface-drag', 'on-surface-variant-hover', 'on-surface-variant-focused-pressed', 'on-surface-variant-drag', 'inverse-on-surface-hover', 'inverse-on-surface-focused-pressed', 'inverse-on-surface-drag'];

// helper functions ////////////////////////////////////////////////////////////////////////////////////

// Function to find the current section in view
function getCurrentSectionInView() {
    var sections = document.querySelectorAll('.fullpage-section');
    var currentSection = null;
    var viewportHeight = window.innerHeight;

    sections.forEach(section => {
        var rect = section.getBoundingClientRect();
        // Check if the section is within the viewport (considering a section in view if at least half of it is visible)
        if (rect.top < viewportHeight / 2 && rect.bottom > viewportHeight / 2) {
            currentSection = section;
        }
    });

    return currentSection;
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Helper function to determine if the screen width is within the desired range
function isScreenWidthWithinRange() {
    var screenWidth = window.innerWidth;
    return screenWidth >= 768 && screenWidth <= 991;
}

// Helper function to determine if the screen width is less than or equal to 767
function isMobileScreenWidth() {
    return window.innerWidth <= 767;
}

// dark and light mode theme ///////////////////////////////////////////////////////////////////////////

// Global variable to store the current theme
var currentTheme;

// Function to get the current slug from the URL or body class
function getCurrentSlug() {
    var slug = window.location.pathname.split('/').pop();
    return slug;
}

// Function to get the current section or slug-based class
function getCurrentSectionOrSlugClass() {
    var slug = getCurrentSlug();
    if (slug && slugToTagMapping[slug]) {
        return slugToTagMapping[slug];
    }
    var currentSection = getCurrentSectionInView();
    return currentSection ? currentSection.classList[1] : 'default';
}

// Refactored function to apply the theme
function applyTheme(theme) {
    console.log('Applying theme:', theme);
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}

// Function to initialize theme and update variables
function initializeAndApplyTheme() {
    var storedTheme = localStorage.getItem('theme');
    var systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    currentTheme = storedTheme || systemPreference;
    applyTheme(currentTheme);
    updateDynamicVariables();
}

// Toggle theme function
function toggleTheme() {
    var isDarkMode = currentTheme === 'dark';
    currentTheme = isDarkMode ? 'light' : 'dark';
    applyTheme(currentTheme);
    updateDynamicVariables();
}


// initial mobile navbar styles on load at top /////////////////////////////////////////////////////////
/*
// Define initial styles for .navbar-mobile
const initialNavbarMobileStyles = {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none'
};

// apply styles function
function applyInitialNavbarMobileStyles() {
    var navbarMobile = document.querySelector('.navbar-mobile');
    if (navbarMobile) {
        navbarMobile.style.backgroundColor = initialNavbarMobileStyles.backgroundColor;
        navbarMobile.style.borderColor = initialNavbarMobileStyles.borderColor;
        navbarMobile.style.boxShadow = initialNavbarMobileStyles.boxShadow;
    }
}

// stored styles for mobile navbar opening and closing effects /////////////////////////////////////////

let storedStyles = {}; */

// updating variables based on section /////////////////////////////////////////////////////////////////


function updateDynamicVariables(targetSection) {
    console.log('updateDynamicVariables called with theme:', currentTheme);
    var sectionOrSlugClass = getCurrentSectionOrSlugClass();
    // If a targetSection is provided, use its class for color updates
    if (targetSection) {
        sectionOrSlugClass = targetSection.classList[1] || 'default';
    }

    // Update color variables
    variableColorValues.forEach(variable => {
        var newVariableRef = `var(--${sectionOrSlugClass}--${currentTheme}--${variable})`;
        document.documentElement.style.setProperty(`--${variable}`, newVariableRef);
    });
}

// debounce functions //////////////////////////////////////////////////////////////////////////////////

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

// Debounced handleResize function
var debouncedHandleResize = debounce(function () {
    handleResize();
}, 100); // 100ms delay

// resize handler //////////////////////////////////////////////////////////////////////////////////////


var previousWidth = window.innerWidth;

function handleResize() {
    var currentWidth = window.innerWidth;

    // Check if we're crossing the 992px or 768px thresholds
    var crossedThreshold = (previousWidth <= 991 && currentWidth >= 992) ||
        (previousWidth >= 992 && currentWidth <= 991) ||
        (previousWidth < 768 && currentWidth >= 768) ||
        (previousWidth >= 768 && currentWidth < 768);

    // If the threshold is crossed, reload the page immediately
    if (crossedThreshold) {
        window.location.reload();
        return; // Stop further execution
    }

    previousWidth = currentWidth; // Update the previous width for the next resize event

    // Other resize logic...
}

// Attach the event listener
window.addEventListener('resize', handleResize);



// calling functions ///////////////////////////////////////////////////////////////////////////////////


// Immediately apply the theme and update colors
initializeAndApplyTheme(); // Initialize and apply theme
updateDynamicVariables();

// Attach event listeners to theme toggle buttons using class selectors
document.querySelectorAll('.theme-toggle').forEach(button => {
    button.addEventListener('click', toggleTheme);
});

// System preference change listener for dark mode with debounce
var handleSystemPreferenceChange = debounce(function(event) {
    // Call toggleTheme if the new system preference is different from the current theme
    if ((event.matches && currentTheme === 'light') || (!event.matches && currentTheme === 'dark')) {
        toggleTheme();
    }
}, 250); // 250 milliseconds

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemPreferenceChange);


// Listen for StorageEvent for cross-page theme consistency
window.addEventListener('storage', function (event) {
    if (event.key === 'theme') {
        currentTheme = event.newValue;
        applyTheme(currentTheme);
        updateDynamicVariables();
    }
});

// Attach the debounced resize event listener
window.addEventListener('resize', debouncedHandleResize);

// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Initialize theme based on user preference or system setting
    //initializeTheme();
    //initializeAndApplyTheme(); // Initialize and apply theme

    // Attach event listeners to navbar mobile segments for menu interaction
    /*document.querySelectorAll('.navbar-mobile-segment.menu').forEach(trigger => {
        // Your existing logic for navbar mobile segments...
    });*/

});

// Run the resize handler on initial load
handleResize();

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

// Function to handle dropdown logic in case studies

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

//reset tab scroll position to top when switching for case study modals

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
const buttons = document.querySelectorAll('.button, .icon-button, .chip, .button-segment, .accordion-header, .menu-item, .navbar-mobile-segment, .fab, .nav-rail-segment, .nav-drawer-segment, .list-item, .card-link-container, .in-page-nav-link');

// Loop through each button
buttons.forEach((button) => {
    // Grab the nested div for this button
    const nestedDivs = button.querySelectorAll('.state-layer.focused-pressed');

    nestedDivs.forEach(nestedDiv => {
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
    });
});

//---------------------------------------------------------------------------------

//ripple effect

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.button, .icon-button, .chip, .button-segment, .accordion-header, .menu-item, .navbar-mobile-segment, .fab, .nav-rail-segment, .nav-drawer-segment, .list-item, .card-link-container, .in-page-nav-link');

    buttons.forEach(button => {
        button.addEventListener('mousedown', function (e) {
            let rippleContainer = button.querySelector('.ripple-container');
            let existingRipple = button.querySelector('.ripple');
            let createRippleInsideContainer = false;
            
            if (rippleContainer) {
                createRippleInsideContainer = true;
            }

            // Create a new ripple element for this click
            const newRipple = document.createElement("div");
            newRipple.className = "ripple";

            // Get the color for the new ripple
            const existingColor = window.getComputedStyle(existingRipple).backgroundColor;
            newRipple.style.backgroundColor = existingColor;

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            newRipple.style.width = newRipple.style.height = `${size}px`;
            newRipple.style.left = `${e.clientX - rect.left - size / 2}px`;
            newRipple.style.top = `${e.clientY - rect.top - size / 2}px`;

            if (createRippleInsideContainer) {
                rippleContainer.appendChild(newRipple);
            } else {
                button.appendChild(newRipple);
            }

            newRipple.classList.add('active');

            // Remove the ripple element when its animation is done
            newRipple.addEventListener('animationend', function () {
                newRipple.remove();
            });
        });
    });
});

