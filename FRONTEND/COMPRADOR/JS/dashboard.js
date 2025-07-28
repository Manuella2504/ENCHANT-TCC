 // Dados simulados dos pontos de coleta
        const pontosColeta = [
            { nome: 'Entradas', status: '3 doadores', ativo: true },
            { nome: 'Pedidos de coleta e', status: 'arrecadou', ativo: true },
            { nome: 'Pedidos de coleta e', status: 'arrecadou', ativo: true },
            { nome: 'Pedidos de coleta e', status: 'arrecadou', ativo: true },
            { nome: 'Pedidos de coleta e', status: 'arrecadou', ativo: true }
        ];

        // Dados do gráfico
        const dadosGrafico = {
            mensal: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                alta: [25, 30, 28, 35, 32, 40, 38, 45, 42, 38, 35, 40],
                baixa: [15, 18, 22, 20, 25, 30, 28, 32, 30, 28, 25, 30]
            },
            semanal: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                alta: [20, 25, 30, 28, 35, 40, 32],
                baixa: [15, 20, 25, 22, 28, 30, 25]
            },
            anual: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                alta: [200, 250, 300, 350, 400, 380],
                baixa: [150, 180, 220, 260, 300, 280]
            }
        };

        let graficoAtual = null;

        // Inicializar dashboard
        function inicializarDashboard() {
            carregarPontosColeta();
            criarGrafico();
            atualizarEstatisticas();
        }

        // Carregar pontos de coleta na sidebar
        function carregarPontosColeta() {
            const container = document.getElementById('pontos-coleta');
            container.innerHTML = '';
            
            pontosColeta.forEach(ponto => {
                const pontoElement = document.createElement('div');
                pontoElement.className = 'collection-point';
                pontoElement.innerHTML = `
                    <div class="point-icon"></div>
                    <div class="point-info">
                        <div class="point-name">${ponto.nome}</div>
                        <div class="point-status">${ponto.status}</div>
                    </div>
                    <div class="point-arrow">›</div>
                `;
                container.appendChild(pontoElement);
            });
        }

        // Criar gráfico
        function criarGrafico() {
            const ctx = document.getElementById('doacoesChart').getContext('2d');
            const dados = dadosGrafico.mensal;
            
            if (graficoAtual) {
                graficoAtual.destroy();
            }
            
            graficoAtual = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dados.labels,
                    datasets: [
                        {
                            label: 'Ativa alta variação',
                            data: dados.alta,
                            borderColor: '#e74c3c',
                            backgroundColor: 'rgba(231, 76, 60, 0.1)',
                            tension: 0.4,
                            fill: false,
                            pointBackgroundColor: '#e74c3c',
                            pointBorderColor: '#e74c3c',
                            pointRadius: 4
                        },
                        {
                            label: 'Ativa baixa variação',
                            data: dados.baixa,
                            borderColor: '#e67e22',
                            backgroundColor: 'rgba(230, 126, 34, 0.1)',
                            tension: 0.4,
                            fill: false,
                            pointBackgroundColor: '#e67e22',
                            pointBorderColor: '#e67e22',
                            pointRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#f0f0f0'
                            },
                            ticks: {
                                color: '#666'
                            }
                        },
                        x: {
                            grid: {
                                color: '#f0f0f0'
                            },
                            ticks: {
                                color: '#666'
                            }
                        }
                    },
                    elements: {
                        point: {
                            hoverRadius: 6
                        }
                    }
                }
            });
        }

        // Atualizar gráfico baseado no filtro
        function atualizarGrafico() {
            const filtro = document.querySelector('.filter-select').value;
            const dados = dadosGrafico[filtro];
            
            graficoAtual.data.labels = dados.labels;
            graficoAtual.data.datasets[0].data = dados.alta;
            graficoAtual.data.datasets[1].data = dados.baixa;
            graficoAtual.update();
        }

        // Simular dados do banco de dados
        function atualizarEstatisticas() {
            // Simular chamada para API/banco de dados
            const estatisticas = {
                cadastros: Math.floor(Math.random() * 50) + 30,
                doacoes: Math.floor(Math.random() * 30) + 80,
                pendentes: Math.floor(Math.random() * 10) + 15,
                triadas: Math.floor(Math.random() * 20) + 40,
                finalizadas: Math.floor(Math.random() * 50) + 80,
                tempo: Math.floor(Math.random() * 10) + 1
            };
            
            // Atualizar elementos na tela
            Object.keys(estatisticas).forEach(key => {
                const elemento = document.getElementById(`stat-${key}`);
                if (elemento) {
                    elemento.textContent = estatisticas[key];
                }
            });
        }

        // Gerar relatório de doações
        function gerarRelatorio() {
            // Simular geração de relatório
            alert('Gerando relatório de doações...\n\nDados simulados do banco:\n- Total de doações: 245\n- Doações ativas: 180\n- Doações pendentes: 45\n- Doações finalizadas: 200');
        }

        // Gerar PDF do dashboard
        function gerarPDF() {
            // Usar jsPDF para gerar PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Título
            doc.setFontSize(20);
            doc.text('Dashboard de Doações', 20, 30);
            
            // Data atual
            doc.setFontSize(12);
            doc.text(`Relatório gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, 50);
            
            // Estatísticas
            doc.setFontSize(14);
            doc.text('Estatísticas:', 20, 70);
            
            const stats = [
                `Doadores para registro: ${document.getElementById('stat-cadastros').textContent}`,
                `Doações deferentes: ${document.getElementById('stat-doacoes').textContent}`,
                `Doações para graduação: ${document.getElementById('stat-pendentes').textContent}`,
                `Doações triadas: ${document.getElementById('stat-triadas').textContent}`,
                `Doações finalizadas: ${document.getElementById('stat-finalizadas').textContent}`
            ];
            
            let y = 90;
            stats.forEach(stat => {
                doc.text(`• ${stat}`, 25, y);
                y += 15;
            });
            
            // Pontos de coleta
            doc.text('Pontos de Coleta Ativos:', 20, y + 10);
            y += 25;
            
            pontosColeta.forEach(ponto => {
                doc.text(`• ${ponto.nome} - ${ponto.status}`, 25, y);
                y += 10;
            });
            
            // Salvar PDF
            doc.save('dashboard-doacoes.pdf');
        }

        // Atualizar dados periodicamente (simular tempo real)
        setInterval(() => {
            atualizarEstatisticas();
        }, 30000); // Atualizar a cada 30 segundos

        // Inicializar quando a página carregar
        document.addEventListener('DOMContentLoaded', inicializarDashboard);
   