// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// Programme Structure Term Tabs
document.querySelectorAll('.programme-term-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const termNum = tab.dataset.term;
        document.querySelectorAll('.programme-term-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.programme-term-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById('programme-term-' + termNum);
        if (panel) panel.classList.add('active');
    });
});

function setupCarousel({ track, cards, prevBtn, nextBtn, gap, desktopVisible }) {
    if (!track || !cards.length) return;
    let index = 0;
    const wrapper = track.parentElement;

    function visibleCount() {
        if (!wrapper || !cards[0]) return 1;
        const w = wrapper.clientWidth;
        const cardW = cards[0].offsetWidth || 1;
        const count = Math.max(1, Math.floor((w + gap) / (cardW + gap)));
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return Math.min(2, count, desktopVisible);
        return Math.min(count, desktopVisible);
    }

    function maxIndex() {
        return Math.max(0, cards.length - visibleCount());
    }

    function update() {
        index = Math.min(index, maxIndex());
        const step = cards[0].offsetWidth + gap;
        track.style.transform = `translateX(-${index * step}px)`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { index = Math.min(maxIndex(), index + 1); update(); });
    window.addEventListener('resize', update);
    update();
}

setupCarousel({
    track: document.querySelector('.feature-cards'),
    cards: document.querySelectorAll('.feature-card'),
    prevBtn: document.querySelector('.feature-carousel-prev'),
    nextBtn: document.querySelector('.feature-carousel-next'),
    gap: 25,
    desktopVisible: 3
});

setupCarousel({
    track: document.querySelector('.standout-cards'),
    cards: document.querySelectorAll('.standout-card'),
    prevBtn: document.querySelector('.carousel-prev'),
    nextBtn: document.querySelector('.carousel-next'),
    gap: 25,
    desktopVisible: 3
});

setupCarousel({
    track: document.querySelector('.faculty-grid'),
    cards: document.querySelectorAll('.faculty-card'),
    prevBtn: document.querySelector('.faculty-prev-btn'),
    nextBtn: document.querySelector('.faculty-next-btn'),
    gap: window.innerWidth <= 768 ? 20 : 40,
    desktopVisible: 4
});

// Recognitions Mobile Carousel
const recognitionsCards = document.querySelector('.recognitions-cards');
const recognitionItems = document.querySelectorAll('.recognition-item');
const recognitionPrevBtn = document.querySelector('.recognition-prev-btn');
const recognitionNextBtn = document.querySelector('.recognition-next-btn');
let recognitionIndex = 0;

function updateRecognitionsCarousel() {
    if (!recognitionsCards) return;
    if (window.innerWidth <= 768) {
        const containerWidth = recognitionsCards.parentElement.offsetWidth;
        recognitionsCards.style.transform = `translateX(-${recognitionIndex * (containerWidth + 20)}px)`;
    } else {
        recognitionsCards.style.transform = 'translateX(0)';
        recognitionIndex = 0;
    }
}

if (recognitionPrevBtn && recognitionNextBtn) {
    recognitionPrevBtn.addEventListener('click', () => {
        recognitionIndex = Math.max(0, recognitionIndex - 1);
        updateRecognitionsCarousel();
    });
    recognitionNextBtn.addEventListener('click', () => {
        recognitionIndex = Math.min(recognitionItems.length - 1, recognitionIndex + 1);
        updateRecognitionsCarousel();
    });
}
window.addEventListener('resize', updateRecognitionsCarousel);

// Hero APPLY NOW → NPF popup (Criminology pattern)
(function initHeroApply() {
    var applyBtn = document.getElementById('heroApplyNowBtn');
    if (!applyBtn) return;
    applyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var npfTrigger = document.querySelector('.hero-npf-trigger.npfWidget-3ce176d6b60096269be0bf1dbdcfa31e');
        if (npfTrigger) {
            npfTrigger.click();
            return;
        }
        var fallback = document.querySelector('.npfWidgetButton.npfWidget-3ce176d6b60096269be0bf1dbdcfa31e');
        if (fallback) fallback.click();
    });
})();
