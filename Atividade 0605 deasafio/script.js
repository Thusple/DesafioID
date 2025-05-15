document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const statusDiv = document.getElementById('status');
    const userInfoDiv = document.getElementById('userInfo');
    const userIdInput = document.getElementById('userId').value.trim();
  
    if (!userIdInput) {
      statusDiv.textContent = 'Por favor, insira um ID.';
      userInfoDiv.innerHTML = '';
      return;
    }
  
    const userId = parseInt(userIdInput, 10);
  
    if (isNaN(userId)) {
      statusDiv.textContent = 'Por favor, insira um número válido.';
      userInfoDiv.innerHTML = '';
      return;
    }
  
    statusDiv.textContent = 'Carregando...';
    userInfoDiv.innerHTML = '';
  
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Usuário não encontrado!');
          } else {
            throw new Error('Erro ao buscar usuário.');
          }
        }
        return response.json();
      })
      .then(user => {
        statusDiv.textContent = '';
        userInfoDiv.innerHTML = `
          <h3>Informações do Usuário</h3>
          <p><strong>Nome:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Cidade:</strong> ${user.address.city}</p>
        `;
      })
      .catch(error => {
        statusDiv.textContent = error.message;
      });
  });