// Mobile menu toggle with animations
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileMenuPanel = document.getElementById("mobile-menu-panel");
const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

let isMenuOpen = false;

function openMenu() {
  if (!mobileMenuOverlay || !mobileMenuPanel || !mobileMenuBackdrop) return;

  isMenuOpen = true;
  mobileMenuOverlay.classList.remove("pointer-events-none");
  mobileMenuBackdrop.classList.remove("pointer-events-none");

  // Lower navbar z-index to ensure menu appears above
  const navbar = document.getElementById("main-navbar");
  if (navbar) {
    navbar.style.zIndex = "50";
  }

  // Show close icon, hide menu icon
  if (menuIcon) menuIcon.classList.add("hidden");
  if (closeIcon) closeIcon.classList.remove("hidden");
  if (mobileMenuButton) {
    mobileMenuButton.setAttribute("aria-expanded", "true");
  }

  // Trigger animations
  requestAnimationFrame(() => {
    mobileMenuBackdrop.classList.remove("opacity-0");
    mobileMenuBackdrop.classList.add("opacity-100");
    mobileMenuPanel.classList.remove("translate-x-full");
    mobileMenuPanel.classList.add("translate-x-0");

    // Animate menu items
    mobileNavItems.forEach((item, index) => {
      setTimeout(
        () => {
          item.classList.remove("translate-x-4", "opacity-0");
          item.classList.add("translate-x-0", "opacity-100");
        },
        100 + index * 50
      );
    });
  });

  // Prevent body scroll and add class for CSS targeting
  document.body.style.overflow = "hidden";
  document.body.style.overflowY = "hidden";
  document.body.classList.add("mobile-menu-open");
}

function closeMenu() {
  if (!mobileMenuOverlay || !mobileMenuPanel || !mobileMenuBackdrop) return;

  isMenuOpen = false;

  // Show menu icon, hide close icon
  if (menuIcon) menuIcon.classList.remove("hidden");
  if (closeIcon) closeIcon.classList.add("hidden");
  if (mobileMenuButton) {
    mobileMenuButton.setAttribute("aria-expanded", "false");
  }

  // Animate menu items out
  mobileNavItems.forEach((item) => {
    item.classList.remove("translate-x-0", "opacity-100");
    item.classList.add("translate-x-4", "opacity-0");
  });

  // Animate panel and backdrop
  mobileMenuBackdrop.classList.remove("opacity-100");
  mobileMenuBackdrop.classList.add("opacity-0");
  mobileMenuPanel.classList.remove("translate-x-0");
  mobileMenuPanel.classList.add("translate-x-full");

  // Re-enable body scroll after animation
  setTimeout(() => {
    mobileMenuBackdrop.classList.add("pointer-events-none");
    mobileMenuOverlay.classList.add("pointer-events-none");
    document.body.style.overflow = "";
    document.body.style.overflowY = "auto";
    document.body.classList.remove("mobile-menu-open");

    // Restore navbar z-index
    const navbar = document.getElementById("main-navbar");
    if (navbar) {
      navbar.style.zIndex = "";
    }
  }, 300);
}

if (mobileMenuButton && mobileMenuOverlay) {
  mobileMenuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking backdrop
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener("click", () => {
      closeMenu();
    });
  }

  // Close menu when clicking outside
  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });
}

// Function to update active nav item based on scroll position
function updateActiveNavItem() {
  const navItems = document.querySelectorAll(".nav-item[data-section]");
  const sections = document.querySelectorAll("section[id]");
  const allSections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100; // Offset for fixed navbar

  let activeSection = "hero"; // Default to hero

  // Find the projects section to handle stats section
  const projectsSection = document.querySelector(
    "section#projects"
  ) as HTMLElement | null;

  // Check which section is currently in view
  sections.forEach((section) => {
    const sectionElement = section as HTMLElement;
    const sectionTop = sectionElement.offsetTop;
    const sectionHeight = sectionElement.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      activeSection = sectionElement.id;
    }
  });

  // Handle StatsSection (comes before Projects)
  // If we're before projects section, treat as stats
  if (projectsSection !== null) {
    const projectsEl: HTMLElement = projectsSection;
    const projectsTop = projectsEl.offsetTop;

    // Check if we're in the stats section (before projects)
    if (scrollPosition < projectsTop) {
      // Check all sections without IDs (like StatsSection)
      allSections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        // Skip if section has an ID (already handled above)
        if (sectionElement.id) return;

        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          // If this section is before projects, it's likely the stats section
          if (sectionTop < projectsTop) {
            activeSection = "stats";
          }
        }
      });
    }
  }

  // Special case: if at top of page, show hero as active
  if (window.scrollY < 200) {
    activeSection = "hero";
  }

  // Update nav items
  navItems.forEach((item) => {
    const navLink = item as HTMLElement;
    const sectionId = navLink.getAttribute("data-section");

    if (sectionId === activeSection) {
      navLink.classList.add("nav-active");
      // Remove any text color classes as CSS handles it
      navLink.classList.remove("text-text-secondary", "text-slate");
      // Remove border-b-2 if present (underline takes precedence)
      navLink.classList.remove("border-b-2", "border-slate");
    } else {
      navLink.classList.remove("nav-active");
      // Remove any text color classes as CSS handles it
      navLink.classList.remove("text-slate", "text-text-secondary");
    }
  });
}

// Smooth scroll for anchor links with URL hash update
document
  .querySelectorAll('a[href^="#"], a[href="/"], a[href="/en"]')
  .forEach((anchor: Element) => {
    const link = anchor as HTMLAnchorElement;
    link.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      // Function to perform scroll after menu closes
      const performScroll = (targetHref: string) => {
        if (targetHref === "/" || targetHref === "/en") {
          // Scroll to top for home
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          window.history.pushState(null, "", targetHref);
          updateActiveNavItem();
          return;
        }

        if (targetHref && targetHref.startsWith("#")) {
          const target = document.querySelector(targetHref);
          if (target) {
            // Wait a bit for any layout changes to complete
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });

                // Update URL hash
                window.history.pushState(null, "", targetHref);

                // Update active nav item after scroll
                setTimeout(() => {
                  updateActiveNavItem();
                }, 100);
              });
            });
          }
        }
      };

      // Close mobile menu if open, then scroll
      if (isMenuOpen) {
        closeMenu();
        // Wait for menu to close and body scroll to be restored before scrolling
        setTimeout(() => {
          performScroll(href || "");
        }, 350); // Wait for menu close animation (300ms) + small buffer
      } else {
        performScroll(href || "");
      }
    });
  });

// Update active nav item on scroll
let scrollTimeout: ReturnType<typeof setTimeout>;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    updateActiveNavItem();
  }, 10);
});

// Update active nav item on page load
window.addEventListener("load", () => {
  // Check if there's a hash in URL
  if (window.location.hash) {
    const hash = window.location.hash;
    const target = document.querySelector(hash);
    if (target) {
      // Wait for all content to load and layout to stabilize
      setTimeout(() => {
        requestAnimationFrame(() => {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          updateActiveNavItem();
        });
      }, 200);
    }
  } else {
    updateActiveNavItem();
  }
});

// Also handle hash on DOMContentLoaded for faster initial scroll
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const hash = window.location.hash;
    const target = document.querySelector(hash);
    if (target) {
      // Small delay to ensure layout is ready
      setTimeout(() => {
        requestAnimationFrame(() => {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          updateActiveNavItem();
        });
      }, 100);
    }
  }
});

// Initial update
updateActiveNavItem();

// Function to toggle navbar transparency based on hero section visibility
function toggleNavbarTransparency() {
  const navbar = document.getElementById("main-navbar");
  const heroSection = document.querySelector(
    "section#hero"
  ) as HTMLElement | null;
  const aboutSection = document.querySelector(
    "section#about"
  ) as HTMLElement | null;
  const logo = document.getElementById(
    "navbar-logo"
  ) as HTMLImageElement | null;
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (!navbar || !heroSection) return;

  const heroTop = heroSection.offsetTop;
  const heroHeight = heroSection.offsetHeight;
  const scrollPosition = window.scrollY;
  // Check if we're in the hero section (before About Us section)
  const aboutTop = aboutSection
    ? aboutSection.offsetTop
    : heroTop + heroHeight;
  const isInHeroSection = scrollPosition < aboutTop - 100;

  if (isInHeroSection) {
    // Transparent navbar with low-opacity background - white text and logo
    navbar.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-md");
    navbar.classList.add("bg-transparent", "shadow-none", "navbar-hero-bg");
    navbar.classList.add("show-hero-text");
    navbar.style.borderBottom = "none";
    navbar.style.backdropFilter = "none";

    // Hero state uses hero logo (handled via CSS visibility)
    if (logo) {
      logo.style.filter = "";
    }

    // Update mobile menu button icons to white
    if (mobileMenuButton) {
      mobileMenuButton.classList.remove(
        "text-accent-blue",
        "hover:text-medium-blue"
      );
      mobileMenuButton.classList.add(
        "text-white",
        "hover:text-accent-blue"
      );
    }
    if (menuIcon) menuIcon.classList.add("text-white");
    if (closeIcon) closeIcon.classList.add("text-white");
  } else {
    // Default navbar - colored text and logo
    navbar.classList.remove(
      "bg-transparent",
      "shadow-none",
      "navbar-hero-bg"
    );
    navbar.classList.remove("show-hero-text");
    navbar.classList.add("bg-white/95", "backdrop-blur-md", "shadow-md");
    navbar.style.borderBottom = "";
    navbar.style.backdropFilter = "";

    // Default state uses default logo (handled via CSS visibility)
    if (logo) {
      logo.style.filter = "";
    }

    // Reset mobile menu button
    if (mobileMenuButton) {
      mobileMenuButton.classList.remove(
        "text-white",
        "hover:text-accent-blue"
      );
      mobileMenuButton.classList.add(
        "text-accent-blue",
        "hover:text-medium-blue"
      );
    }
    if (menuIcon) menuIcon.classList.remove("text-white");
    if (closeIcon) closeIcon.classList.remove("text-white");
  }
}

// Update navbar on scroll
let navbarScrollTimeout: ReturnType<typeof setTimeout>;
window.addEventListener("scroll", () => {
  clearTimeout(navbarScrollTimeout);
  navbarScrollTimeout = setTimeout(() => {
    toggleNavbarTransparency();
  }, 10);
});

// Initial check
toggleNavbarTransparency();

// Also check on page load and resize
window.addEventListener("load", () => {
  toggleNavbarTransparency();
});

window.addEventListener("resize", () => {
  toggleNavbarTransparency();

  // Close mobile menu if window is resized above 900px
  if (window.innerWidth >= 900 && isMenuOpen) {
    closeMenu();
  }
});
