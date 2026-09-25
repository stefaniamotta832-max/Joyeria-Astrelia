document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (event) => {
      if (event.target.closest('a') || event.target.closest('button')) {
        return;
      }

      const image = card.querySelector('img')?.src || '';
      const name = card.querySelector('h3')?.textContent.trim() || '';
      const price = card.querySelector('.product-price')?.textContent.trim() || '';
      const descriptionElement = [...card.querySelectorAll('.product-info p')].at(-1);
      const description = descriptionElement?.textContent.trim() || '';

      sessionStorage.setItem(
        'astreliaProduct',
        JSON.stringify({ image, name, price, description })
      );

      window.location.href = 'product.html';
    });
  });

  if (document.body.dataset.page === 'product') {
    const detail = document.getElementById('product-detail');
    const fallback = {
      image: 'images/manilla1.jpg',
      name: 'Manilla Infinito Bali 4, 3mm-PP086',
      price: '$209.900,00',
      description: 'Impuesto incluido. Los gastos de envío se calculan en la pantalla de pago. Diseñada con acabado artesanal, elegante y resistente para usar todos los días.'
    };
    const raw = sessionStorage.getItem('astreliaProduct');
    const product = raw ? JSON.parse(raw) : fallback;
    const productName = product.name || fallback.name;
    const whatsappMessage = encodeURIComponent(`Hola, quiero comprar ${productName}.`);
    const whatsappUrl = `https://wa.me/573203026840?text=${whatsappMessage}`;

    if (detail) {
      detail.innerHTML = `
        <div class="detail-layout">
          <div class="gallery">
            <div class="main-image">
              <img src="${product.image || fallback.image}" alt="${product.name || fallback.name}" />
            </div>
          </div>

          <div class="detail-info">
            <p class="detail-tag">oro laminado 18k</p>
            <h1>${productName}</h1>

            <p class="detail-price">${product.price || fallback.price}</p>
            <p class="detail-description">${product.description || fallback.description}</p>

            <div class="cta-stack">
              <a class="cta-btn primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Comprar ahora</a>
            </div>

            <div class="info-panel">
              <div class="info-list">
                <div class="info-item"><span class="icon">▣</span><strong>Empaque</strong><span>Especial</span></div>
                <div class="info-item"><span class="icon">♡</span><strong>Amigable</strong><span>con tu piel</span></div>
                <div class="info-item"><span class="icon">🚚</span><strong>Envíos</strong><span>a todo el país</span></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
});
