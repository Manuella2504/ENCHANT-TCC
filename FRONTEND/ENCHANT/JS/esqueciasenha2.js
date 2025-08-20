   const inputs = document.querySelectorAll('.code-input');
        const codigoDoEmail = '789012'; // Código de exemplo
        
        // Funcionalidade dos inputs
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                if (!/^\d*$/.test(value)) {
                    e.target.value = '';
                    return;
                }
                
                if (value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                    inputs[index - 1].focus();
                }
                
                if (e.key === 'ArrowLeft' && index > 0) {
                    inputs[index - 1].focus();
                }
                if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            
            input.addEventListener('focus', (e) => {
                e.target.select();
            });
        });
        
        // Foca no primeiro input
        inputs[0].focus();

        // Função para confirmar o código
        function confirmCode() {
            const enteredCode = Array.from(inputs).map(input => input.value).join('');
            const modalBody = document.getElementById('mensagemModalBody');
            const modalLabel = document.getElementById('mensagemModalLabel');

            if (enteredCode.length < 6) {
                modalLabel.textContent = 'Atenção';
                modalBody.innerHTML = 'Por favor, digite todos os 6 dígitos do código.';
                $('#mensagemModal').modal('show');
                return;
            }

            if (enteredCode === codigoDoEmail) {
                modalLabel.textContent = 'Sucesso';
                modalBody.innerHTML = 'Código confirmado com sucesso! Redirecionando...';
                $('#mensagemModal').modal('show');
                
                // Aguarda o modal ser totalmente exibido antes de redirecionar
                $('#mensagemModal').on('shown.bs.modal', function () {
                    setTimeout(() => {
                        window.location.href = 'esqueciasenha3.html';
                    }, 2000);
                });
            } else {
                modalLabel.textContent = 'Código Incorreto';
                modalBody.innerHTML = 'O código digitado está incorreto. Por favor, tente novamente.';
                $('#mensagemModal').modal('show');
                
                // Limpa os campos após erro
                setTimeout(() => {
                    inputs.forEach(input => input.value = '');
                    inputs[0].focus();
                }, 1000);
            }
        }

        // Função para reenviar código
        function resendCode() {
            const resendBtn = document.getElementById('resendBtn');
            const modalBody = document.getElementById('mensagemModalBody');
            const modalLabel = document.getElementById('mensagemModalLabel');
            
            // Desabilita o botão
            resendBtn.disabled = true;
            resendBtn.textContent = 'Reenviando...';
            
            // Simula o reenvio (aqui você faria a chamada para o backend)
            setTimeout(() => {
                modalLabel.textContent = 'Código Reenviado';
                modalBody.innerHTML = 'Um novo código foi enviado para o seu email. Por favor, verifique sua caixa de entrada.';
                $('#mensagemModal').modal('show');
                
                // Reabilita o botão após 30 segundos
                let countdown = 30;
                const countdownInterval = setInterval(() => {
                    resendBtn.textContent = `Reenviar em ${countdown}s`;
                    countdown--;
                    
                    if (countdown < 0) {
                        clearInterval(countdownInterval);
                        resendBtn.disabled = false;
                        resendBtn.textContent = 'Reenviar código';
                    }
                }, 1000);
            }, 1500);
        }

        // Permite confirmar com Enter
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                confirmCode();
            }
        });