document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.textContent = isOpen ? 'Close' : 'Menu';
    });
  }

  const form = document.querySelector('#contactForm');

  if (!form) {
    return;
  }

  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const phone = document.querySelector('#phone');
  const message = document.querySelector('#message');
  const formStatus = document.querySelector('#formStatus');

  const showError = (field, errorText) => {
    const errorBox = document.querySelector(`#${field.id}Error`);
    field.classList.add('invalid');
    errorBox.textContent = errorText;
  };

  const clearError = (field) => {
    const errorBox = document.querySelector(`#${field.id}Error`);
    field.classList.remove('invalid');
    errorBox.textContent = '';
  };

  [name, email, phone, message].forEach((field) => {
    field.addEventListener('input', () => {
      if (field.value.trim() !== '') {
        clearError(field);
        if (formStatus) {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
      valid = false;
    } else {
      clearError(name);
    }

    if (!email.value.trim()) {
      showError(email, 'Please enter your email.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(email);
    }

    if (!phone.value.trim()) {
      showError(phone, 'Please enter your phone number.');
      valid = false;
    } else {
      clearError(phone);
    }

    if (!message.value.trim()) {
      showError(message, 'Please enter your message.');
      valid = false;
    } else {
      clearError(message);
    }

    if (!valid) {
      if (formStatus) {
        formStatus.textContent = 'Please fix the highlighted fields.';
        formStatus.className = 'form-status error';
      }
      return;
    }

    form.reset();
    if (formStatus) {
      formStatus.textContent = 'Form submitted successfully!';
      formStatus.className = 'form-status success';
    }
  });

  const funFact = document.querySelector('#funFact');

  if (funFact) {
    fetch('https://api.quotable.io/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Quote request failed');
        }
        return response.json();
      })
      .then(() => {
        funFact.textContent = 'Hakuna Matata means no worries.';
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        funFact.textContent = 'Unable to load the quote right now.';
      });
  }
});
