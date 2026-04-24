document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const timeDisplay = document.getElementById('timeDisplay');

    // ✅ АВТОЗАПУСК С ЗВУКОМ (если браузер разрешит)
    if (video && video.readyState >= 2) {
        try {
            video.play();
            console.log('✅ Видео запустилось с звуком! 🔊');
        } catch (error) {
            // Если автозапуск заблокирован — ставим muted
            video.muted = true;
            video.play();
            console.log('⚠️ Автозапуск отключён браузером. Звук включён вручную.');
            
            // Показываем уведомление (можно заменить на alert или toast)
            setTimeout(() => {
                const msg = document.createElement('div');
                msg.textContent = '🔊 Видео запустилось с звуком!';
                msg.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #ff004c;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    z-index: 9999;
                `;
                document.body.appendChild(msg);
                
                setTimeout(() => msg.remove(), 3000);
            }, 500);
        }
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

    // Video Hover Preview Effect
    video.addEventListener('mouseenter', () => {
        video.style.transform = 'scale(1.02)';
    });

    video.addEventListener('mouseleave', () => {
        video.style.transform = 'scale(1)';
    });

    // Console Log for Debugging
    console.log('🎬 ЖЁТСКОЕ ПОРНО Загружено Успешно!');
});
