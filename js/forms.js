/* RehabNest Occupational Therapy - Form Handling & Validation */

document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
  initPasswordToggles();
});

function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        const group = input.closest('.form-group') || input.parentElement;
        
        // Remove error
        group.classList.remove('has-error');
        
        // Validate
        if (!input.value.trim()) {
          isValid = false;
          group.classList.add('has-error');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          isValid = false;
          group.classList.add('has-error');
        } else if (input.type === 'checkbox' && !input.checked) {
          isValid = false;
          group.classList.add('has-error');
        }
      });

      // Special check for password confirmation if present
      const pass = form.querySelector('input[name="password"]');
      const confirmPass = form.querySelector('input[name="confirm_password"]');
      if (pass && confirmPass && pass.value !== confirmPass.value) {
        isValid = false;
        const group = confirmPass.closest('.form-group') || confirmPass.parentElement;
        group.classList.add('has-error');
      }

      if (isValid) {
        showFormSuccess(form);
      }
    });
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormSuccess(form) {
  const successMessage = document.createElement('div');
  successMessage.className = 'alert alert-success';
  successMessage.style.padding = '1rem';
  successMessage.style.backgroundColor = 'var(--success-bg)';
  successMessage.style.color = 'var(--success)';
  successMessage.style.borderRadius = 'var(--radius-sm)';
  successMessage.style.marginTop = '1rem';
  successMessage.style.fontWeight = '600';
  successMessage.innerHTML = '<i class="fas fa-check-circle" style="margin-right:0.5rem;"></i> Request submitted successfully! Our clinic team will reach out to you shortly.';

  form.reset();
  form.appendChild(successMessage);

  // Auto remove message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

function initPasswordToggles() {
  const toggles = document.querySelectorAll('.password-toggle-icon');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          toggle.className = 'fas fa-eye-slash password-toggle-icon';
        } else {
          input.type = 'password';
          toggle.className = 'fas fa-eye password-toggle-icon';
        }
      }
    });
  });
}
