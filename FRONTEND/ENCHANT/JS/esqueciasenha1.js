  document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('.containersubsub');
        const emailInput = document.getElementById('email-e1');

        // Inicializar o modal de mensagens (Bootstrap 4)
        const mensagemModal = $('#mensagemModal');
        const mensagemModalBody = document.getElementById('mensagemModalBody');
        const mensagemModalLabel = document.getElementById('mensagemModalLabel');

        // Função para mostrar mensagem no modal
        function mostrarMensagem(mensagem, tipo = 'erro') {
          mensagemModalBody.textContent = mensagem;

          // Configurar o título e as cores de acordo com o tipo de mensagem
          if (tipo === 'sucesso') {
            mensagemModalLabel.textContent = 'Sucesso';
            mensagemModalLabel.style.color = '#693B11';
          } else if (tipo === 'info') {
            mensagemModalLabel.textContent = 'Informação';
            mensagemModalLabel.style.color = '#693B11';
          } else {
            mensagemModalLabel.textContent = 'Atenção';
            mensagemModalLabel.style.color = '#693B11';
          }

          mensagemModal.modal('show');
        }

        if (form) {
          form.addEventListener('submit', function (event) {
            event.preventDefault();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(emailInput.value)) {
              // Email válido, mostrar mensagem de sucesso e redirecionar
              mostrarMensagem('Sucesso');

              // Redirecionar após 2 segundos para dar tempo de ler a mensagem
              setTimeout(function () {
                window.location.href = "esqueciasenha2.html";
              }, 2000);
            } else {
              // Email inválido, mostrar modal de erro
              mostrarMensagem('Por favor, insira um email válido.');
              emailInput.focus();
            }
          });
        }
      });