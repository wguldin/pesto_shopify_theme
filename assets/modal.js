class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.overlay = this.modal.querySelector('.modal__overlay');
    this.container = this.modal.querySelector('.modal__container');
    this.closeButtons = this.modal.querySelectorAll('[data-modal-close]');
    this.openButtons = document.querySelectorAll(`[data-modal-open="${modalId}"]`);
    this.form = this.modal.querySelector('form');
    this.formContent = this.modal.querySelector('.modal__form-content');
    this.successContent = this.modal.querySelector('.modal__success-content');
    
    console.log('Modal initialized with elements:', {
      modal: this.modal,
      form: this.form,
      formContent: this.formContent,
      successContent: this.successContent
    });
    
    this.init();
  }

  init() {
    // Add event listeners
    this.closeButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });

    this.openButtons.forEach(button => {
      button.addEventListener('click', () => this.open());
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-open')) {
        this.close();
      }
    });

    // Close on overlay click, but not on container click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Prevent click propagation on container
    this.container.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Handle form submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        // Let the form submit normally
        // The success state will be handled by the page reload
        if (this.form.checkValidity()) {
          this.showSuccess();
        }
      });
    }
  }

  open() {
    this.modal.classList.add('is-open');
    // Reset form state
    this.resetState();
    // Focus on the first focusable element
    const focusableElements = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  close() {
    this.modal.classList.remove('is-open');
    // Reset form state when closing
    this.resetState();
  }

  showSuccess() {
    console.log('Showing success state');
    if (this.formContent && this.successContent) {
      this.formContent.style.display = 'none';
      this.successContent.style.display = 'block';
    } else {
      console.log('Missing elements for success state:', {
        formContent: this.formContent,
        successContent: this.successContent
      });
    }
  }

  resetState() {
    if (this.formContent && this.successContent) {
      this.formContent.style.display = 'block';
      this.successContent.style.display = 'none';
      if (this.form) {
        this.form.reset();
      }
    }
  }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing modal');
  const waitlistModal = new Modal('waitlist-modal');
});

// Mobile menu toggle
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.querySelector('.mobile-menu__close');

function openMobileMenu() {
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  document.querySelector('.header-wrapper').classList.add('mobile-menu-open');
  // Focus first link
  const firstLink = mobileMenu.querySelector('a');
  if (firstLink) firstLink.focus();
}

function closeMobileMenu() {
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  document.querySelector('.header-wrapper').classList.remove('mobile-menu-open');
  hamburger.focus();
}

if (hamburger && mobileMenu && closeBtn) {
  hamburger.addEventListener('click', openMobileMenu);
  closeBtn.addEventListener('click', closeMobileMenu);
  // ESC to close
  document.addEventListener('keydown', function(e) {
    if (mobileMenu.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
      closeMobileMenu();
    }
  });
  // Click outside menu to close
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  // Close menu when clicking on any link
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu and restore scrolling on window resize
  window.addEventListener('resize', function() {
    if (mobileMenu.getAttribute('aria-hidden') === 'false') {
      closeMobileMenu();
    }
  });
} 