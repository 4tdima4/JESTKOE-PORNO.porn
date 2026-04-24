document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const timeDisplay = document.getElementById('timeDisplay');

    // Auto-play on load (muted for autoplay policy)
    if (video && video.readyState >= 2) {
        video.play().catch(() => {
            console.log('Автозапуск отключён браузером. Нажмите Play вручную.');
        });
    }

    // Play/Pause Toggle
    playBtn.addEventListener('click', () => {
        if (video.paused || video.ended) {
            video.play();
            playBtn.textContent = '⏸️';
        } else {
            video.pause();
            playBtn.textContent = '▶️';
        }
    });

    // Update Progress Bar & Time Display
    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const progressPercent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            
            timeDisplay.textContent = `⏱️ ${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
    });

    // Format Time Helper
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Search Form Submission
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const query = e.target.querySelector('.search-input').value.trim();
        
        if (query) {
            alert(`Вы ищете: "${query}" 🔍`);
            // Здесь можно добавить поиск по API или фильтровать видео
        } else {
            e.target.querySelector('.search-input').focus();
        }
    });

    // Subscribe Form Submission
    document.getElementById('subscribeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('.subscribe-input').value.trim();
        
        if (email) {
            alert(`Вы успешно подписались с ${email}! 🔔`);
            e.target.reset();
        } else {
            e.target.querySelector('.subscribe-input').focus();
        }
    });

    // Auto-Play on Enter Key in Search
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = input.value.trim();
                alert(`Вы ищете: "${query}" 🔍`);
            }
        });
    });

    // Video Hover Preview Effect
    video.addEventListener('mouseenter', () => {
        video.style.transform = 'scale(1.02)';
    });

    video.addEventListener('mouseleave', () => {
        video.style.transform = 'scale(1)';
    });

    // Console Log for Debugging
    console.log('🎬 ЖЁТСКОЕ ПОРНО Загружено Успешно!');
    
    // Show Welcome Message
    setTimeout(() => {
        alert('Добро пожаловать на ЖЁТСКОЕ ПОРНО! 🎉');
    }, 1500);
});
