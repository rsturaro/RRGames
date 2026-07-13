// Banco de dados simulado sem emojis e estruturado com quebras de linha (\n) para formatação limpa
const gamesDatabase = [
    {
        id: 1,
        title: "Nintendo Wii Black Edition",
        platform: "Nintendo",
        price: 1199.90, 
        type: "console",
        date: "2026-06-30",
        images: [
            "./Imagens games/wii-principal.jpg",
            "./Imagens games/wii2.jpg",
            "./Imagens games/wii3.jpg",
            "./Imagens games/wii4.jpg",
            "./Imagens games/wii5.jpg"
        ],
        description: "Nintendo Wii Black Edition 512MB (Na Caixa Completo)\n2 Controles Originais\n1 Fonte Original\n1 Cabo AV Original\n1 Jogo\n1 Sensor Bar\nManuais originais",
        payment: ["Pix (5% Off)", "Cartão de Crédito"],
        inStock: true
    },
    {
        id: 2,
        title: "Super Nintendo Baby",
        platform: "Nintendo",
        price: 509.90,
        type: "console",
        date: "2026-06-30",
        images: [
            "./Imagens games/baby-principal.png",
            "./Imagens games/baby2.png",
            "./Imagens games/baby3.png",
            "./Imagens games/baby4.png",
            "./Imagens games/baby5.png"
        ],
        description: "Super Nintendo SNES Baby Americano (roda jogos originais e réplica)\n1 Controle\n1 Fonte\n1 Cabo RF\n1 Jogo (BomberMan)",
        payment: ["Pix (5% Off)", "Cartão de Crédito"],
        inStock: true
    },
    {
        id: 5,
        title: "Nintendo 64 Americano",
        platform: "Nintendo",
        price: 789.90,
        type: "console",
        date: "2026-07-13",
        images: [
            "./Imagens games/n64-principal.jpg",
            "./Imagens games/n64 2.jpg",
            "./Imagens games/n64 3.jpg",
            "./Imagens games/n64 4.jpg"
        ],
        description: "Nintendo 64 Americano Desbloqueado\n1 Controle\n1 Fonte\n1 Cabo AV\n1 Jumper Pack\n1 Cartão de Memória\nSuper Mario 64\nHey You Pikachu\nKirby 64: The Crystal Shards\nDonkey Kong 64",        payment: ["Pix (5% Off)", "Cartão de Crédito"],
        inStock: true
    },
    {
        id: 3,
        title: "Super Nintendo FAT",
        platform: "Nintendo",
        price: 649.90,
        type: "console",
        date: "2026-06-30",
        images: [
            "./Imagens games/super-principal.png",
            "./Imagens games/super2.png",
            "./Imagens games/super3.png",
            "./Imagens games/super4.png",
            "./Imagens games/super5.png"
        ],
        description: "Super Nintendo SNES FAT Americano (roda jogos originais e réplica)\n1 Controle\n1 Fonte\n1 Cabo AV\n1 Jogo (PAC-MAN)",
        payment: ["Pix (5% Off)", "Cartão de Crédito"],
        inStock: true
    },
    {
        id: 4,
        title: "Playstation 2 FAT",
        platform: "Sony",
        price: 659.90,
        type: "console",
        date: "2026-06-30",
        images: [
            "./Imagens games/ps2-principal.png",
            "./Imagens games/ps22.png",
            "./Imagens games/ps23.png",
            "./Imagens games/ps24.png"
        ],
        description: "Playstation 2 FAT Desbloqueado com OPL\n1 Controle Original\n1 Fonte Original\n1 Cabo AV Original\n10 Jogos da sua escolha no OPL\nMemory Card 8MB Original\nDesbloqueado e com leitor 100% funcionando",
        payment: ["Pix (5% Off)", "Cartão de Crédito"],
        inStock: true
    }
];

// Gerenciador de Views com Transição de Carregamento Fictício (1 Segundo Mínimo) e Histórico Integrado
const switchView = (targetViewId, isBackAction = false) => {
    const loader = document.getElementById('loading-overlay');
    if (loader) loader.classList.add('show'); 

    // Se NÃO for uma ação disparada pelo botão voltar, adiciona o novo estado ao histórico do navegador
    if (!isBackAction) {
        history.pushState({ viewId: targetViewId }, "", `#${targetViewId}`);
    }

    setTimeout(() => {
        const sections = document.querySelectorAll('.view-section');
        sections.forEach(section => {
            if(section.id === targetViewId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (loader) loader.classList.remove('show'); 
    }, 1000); 
};

// Alterna os avisos estáticos do topo a cada 3 segundos
const initTopTicker = () => {
    const items = document.querySelectorAll('.ticker-item');
    if (items.length === 0) return;
    
    let currentIndex = 0;

    setInterval(() => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }, 3000);
};

// Renderiza dinamicamente o ÚLTIMO game adicionado na div de Lançamentos da Home
const renderLancamentoHome = () => {
    const container = document.getElementById('lancamento-dinamico');
    if (!container || gamesDatabase.length === 0) return;

    const ultimoGame = gamesDatabase[gamesDatabase.length - 1];
    const buttonText = ultimoGame.inStock === false ? "ESGOTADO" : "Ver Detalhes";
    const disabledClass = ultimoGame.inStock === false ? "disabled" : "";

    container.innerHTML = `
        <div class="game-card lancamento-card" data-game-id="${ultimoGame.id}">
            <div class="game-img">
                <img src="${ultimoGame.images[0]}" alt="${ultimoGame.title}">
            </div>
            <div class="game-info">
                <h3>${ultimoGame.title}</h3>
                <p class="platform">${ultimoGame.platform}</p>
                <p class="price">R$ ${ultimoGame.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <button class="btn-details ${disabledClass}">${buttonText}</button>
            </div>
        </div>
    `;

    container.querySelector('.lancamento-card').addEventListener('click', () => {
        if (ultimoGame.inStock !== false) {
            renderProdutoInterno(ultimoGame.id);
        }
    });
};

// Mecanismo Dinâmico de Filtros e Renderização do Catálogo
const renderCatalogo = () => {
    const container = document.getElementById('catalogo-dinamico');
    if (!container) return;

    const searchText = document.getElementById('search-input').value.toLowerCase();
    const selectedCategory = document.getElementById('filter-category').value;
    const currentOrder = document.getElementById('order-by').value;

    let filteredGames = gamesDatabase.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchText);
        const matchesCategory = (selectedCategory === 'todos') || (game.type === selectedCategory);
        return matchesSearch && matchesCategory;
    });

    if (currentOrder === 'barato') {
        filteredGames.sort((a, b) => a.price - b.price);
    } else if (currentOrder === 'caro') {
        filteredGames.sort((a, b) => b.price - a.price);
    } else if (currentOrder === 'recentes') {
        filteredGames.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (filteredGames.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">Nenhum item encontrado para os filtros selecionados.</p>`;
        return;
    }

    container.innerHTML = filteredGames.map(game => {
        const buttonText = game.inStock === false ? "ESGOTADO" : "Ver Detalhes";
        const disabledClass = game.inStock === false ? "disabled" : "";

        return `
            <div class="game-card" data-id="${game.id}">
                <div class="game-img">
                    <img src="${game.images[0]}" alt="${game.title}">
                </div>
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p class="platform">${game.platform}</p>
                    <p class="price">R$ ${game.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <button class="btn-details ${disabledClass}">${buttonText}</button>
                </div>
            </div>
        `;
    }).join('');

    container.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const targetGame = gamesDatabase.find(g => g.id == id);
            if (targetGame && targetGame.inStock !== false) {
                renderProdutoInterno(id);
            }
        });
    });
};

// Renderização Dinâmica da Página Interna do Produto com Carrossel de Imagens Completo
const renderProdutoInterno = (id) => {
    const game = gamesDatabase.find(g => g.id == id);
    const container = document.getElementById('detalhe-produto-content');
    if (!game || !container) return;

    const zapMessage = encodeURIComponent(`Olá! Tenho interesse no item ${game.title} (${game.platform}). Poderia me passar os detalhes para o fechamento?`);

    const slidesHTML = game.images.map(imgSrc => `
        <div class="carousel-slide">
            <img src="${imgSrc}" alt="${game.title}">
        </div>
    `).join('');

    const thumbsHTML = game.images.map((imgSrc, index) => `
        <div class="thumb-item ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${imgSrc}" alt="Miniatura ${index + 1}">
        </div>
    `).join('');

    // Processa a descrição transformando quebras de linha em divs com ícone de controle preto
    const formattedDescriptionHTML = game.description.split('\n').map(line => {
        if(line.trim() === "") return "";
        return `
            <div class="desc-item">
                <i class="fa-solid fa-gamepad"></i>
                <span>${line}</span>
            </div>
        `;
    }).join('');

    // Mapeia e injeta os ícones de pagamento específicos (Pix ou Cartão) sem as bolinhas
    const paymentHTML = game.payment.map(method => {
        let iconClass = "fa-solid fa-credit-card"; 
        if (method.toLowerCase().includes("pix")) {
            iconClass = "fa-brands fa-pix"; 
        }
        return `<li><i class="${iconClass}"></i> ${method}</li>`;
    }).join('');

    let buyButtonHTML = `
        <a href="https://wa.me/5511990112716?text=${zapMessage}" target="_blank" class="btn-whatsapp-buy">
            <i class="fa-brands fa-whatsapp"></i> Finalizar Compra
        </a>
    `;

    if (game.inStock === false) {
        buyButtonHTML = `
            <button class="btn-whatsapp-buy disabled" disabled style="background-color: #666; cursor: not-allowed;">
                ESGOTADO
            </button>
        `;
    }

    container.innerHTML = `
        <div class="product-detail-layout">
            <div class="carousel-container">
                <div class="carousel-main">
                    <button class="carousel-arrow prev"><i class="fa-solid fa-chevron-left"></i></button>
                    <div class="carousel-track" id="carouselTrack">
                        ${slidesHTML}
                    </div>
                    <button class="carousel-arrow next"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                <div class="carousel-thumbs" id="carouselThumbs">
                    ${thumbsHTML}
                </div>
            </div>
             
            <div class="product-meta">
                <span class="platform">${game.platform}</span>
                <h1>${game.title}</h1>
                <p class="price">R$ ${game.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                 
                <div class="product-description">
                    ${formattedDescriptionHTML}
                </div>
                 
                <div class="payment-methods">
                    <h4>Formas de Pagamento:</h4>
                    <ul>
                        ${paymentHTML}
                    </ul>
                </div>

                ${buyButtonHTML}
            </div>
        </div>
    `;
    
    switchView('produto-page');
    initCarrosselLogic(game.images.length);
};

// Lógica de Execução do Carrossel (Controle de Toques e Movimento do Trilho)
const initCarrosselLogic = (totalImages) => {
    const track = document.getElementById('carouselTrack');
    const thumbs = document.querySelectorAll('.thumb-item');
    const btnPrev = document.querySelector('.carousel-arrow.prev');
    const btnNext = document.querySelector('.carousel-arrow.next');
    
    if (!track) return;
    let currentIndex = 0;

    const updateCarousel = (index) => {
        if (index < 0) index = totalImages - 1;
        if (index >= totalImages) index = 0;
        currentIndex = index;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        if(thumbs[currentIndex]) thumbs[currentIndex].classList.add('active');
    };

    if (btnPrev) btnPrev.addEventListener('click', () => updateCarousel(currentIndex - 1));
    if (btnNext) btnNext.addEventListener('click', () => updateCarousel(currentIndex + 1));

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const idx = parseInt(thumb.getAttribute('data-index'));
            updateCarousel(idx);
        });
    });

    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const threshold = 50;
        if (startX - endX > threshold) {
            updateCarousel(currentIndex + 1);
        } else if (endX - startX > threshold) {
            updateCarousel(currentIndex - 1);
        }
    };
};

// EventListeners e Inicialização Global
document.addEventListener("DOMContentLoaded", () => {
    // --- MAPEAMENTO DO HISTÓRICO PARA O BOTÃO VOLTAR DO CELULAR ---
    // Define o estado inicial assim que a aplicação SPA carrega na Home
    history.replaceState({ viewId: 'home-page' }, "", "#home-page");

    // Intercepta a ação de voltar do navegador/celular
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.viewId) {
            // true sinaliza para a função switchView que a navegação veio do botão voltar
            switchView(event.state.viewId, true);
        } else {
            // Fallback caso o histórico esteja limpo por algum motivo
            switchView('home-page', true);
        }
    });
    // -------------------------------------------------------------

    renderCatalogo();
    renderLancamentoHome();
    initTopTicker(); // Inicializa os avisos rotativos a cada 3s

    // Controle Lógico do Menu Hambúrguer (Mobile)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    document.getElementById('search-input').addEventListener('input', renderCatalogo);
    document.getElementById('filter-category').addEventListener('change', renderCatalogo);
    document.getElementById('order-by').addEventListener('change', renderCatalogo);

    // Gerenciador de cliques nos links de navegação da SPA
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if(navMenu) navMenu.classList.remove('show'); 
            switchView(target);
        });
    });

    // Fechar menu mobile ao clicar em links de âncoras internas
    document.querySelectorAll('.nav-link-anchor').forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu) navMenu.classList.remove('show');
        });
    });

    document.getElementById('nav-logo').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('home-page');
    });

    document.getElementById('btn-voltar-catalogo').addEventListener('click', () => {
        switchView('catalogo-page');
    });

    const featuredCard = document.querySelector('.featured-card');
    if(featuredCard) {
        featuredCard.addEventListener('click', () => {
            const id = featuredCard.getAttribute('data-game-id');
            const targetGame = gamesDatabase.find(g => g.id == id);
            if (targetGame && targetGame.inStock !== false) {
                renderProdutoInterno(id);
            }
        });
    }
});
