(() => {
  'use strict';

  fetch('http://localhost:3000/verificar-sessao', {
    method: 'GET',
    credentials: 'same-origin'
  })
    .then(response => response.json())
    .then(data => {
      if (data.autenticado) {
        window.location.href = '/private/index.html';
      }
    })
    .catch(error => console.error('Erro ao verificar sessão:', error));

  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password })
      });

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.redirectTo || '/private/index.html';
      }
      
      else if (response.status === 401) {
        alert('Email ou senha incorretos!');
      } else {
        const error = await response.json();
        alert(error.message || 'Erro inesperado ao tentar fazer login');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão com o servidor');
    }

    form.classList.add('was-validated');
  });
})();
