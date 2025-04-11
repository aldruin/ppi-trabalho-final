(() => {
  'use strict';

  const form = document.getElementById('cadastroForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Cadastro realizado com sucesso!');
        window.location.href = '/login.html';
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão com o servidor.');
    }

    form.classList.add('was-validated');
  });
})();
