// tổng hợp từ nhiều nguồn trên YT =)

(function initStorageNamespace() {
    const STORAGE_KEY = 'news_articles_v1';

    function getAll() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const data = JSON.parse(raw);
            if (!Array.isArray(data)) return [];
            return data;
        } catch (e) {
            console.error('Failed to parse storage', e);
            return [];
        }
    }

    function saveAll(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    function generateId() {
        return 'n_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    function addOne(article) {
        const list = getAll();
        const now = Date.now();
        const item = {
            id: generateId(),
            title: article.title.trim(),
            image: article.image.trim(),
            content: article.content.trim(),
            summary: article.summary?.trim() || article.content.trim().slice(0, 100) + '…',
            createdAt: now
        };
        list.push(item);
        saveAll(list);
        return item;
    }

    function getById(id) {
        return getAll().find(x => x.id === id) || null;
    }

    function seedIfEmpty() {
        const list = getAll();
        if (list.length) return;
        const seeded = [
            {
                title: 'Khai mạc giải chạy mùa xuân',
                image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop',
                content: 'Sáng nay đã diễn ra giải chạy phong trào với sự tham gia của hơn 2.000 vận động viên từ khắp nơi. Sự kiện nhằm cổ vũ lối sống lành mạnh và kết nối cộng đồng.',
            },
            {
                title: 'Ra mắt công nghệ pin mới',
                image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
                content: 'Các nhà nghiên cứu công bố bước tiến mới trong công nghệ pin, giúp tăng mật độ năng lượng và rút ngắn thời gian sạc xuống chỉ còn vài phút.',
            },
            {
                title: 'Du lịch xanh được ưa chuộng',
                image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
                content: 'Các tour du lịch thân thiện môi trường ngày càng thu hút du khách trẻ, mở ra nhiều cơ hội phát triển bền vững cho ngành dịch vụ.',
            }
        ].map(x => addOne(x));
        return seeded;
    }

    window.NewsStorage = { getAll, addOne, getById, seedIfEmpty };
    seedIfEmpty();
})();

