document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // VIDEO PLAYER CONTROLS
    // =========================================
    const video = document.getElementById('mainVideo');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const timeDisplay = document.getElementById('timeDisplay');

    // Auto-play on load (with muted fallback)
    if (video && video.readyState >= 2) {
        try {
            video.play();
            console.log('✅ Видео запустилось с звуком! 🔊');
        } catch (error) {
            video.muted = true;
            video.play();
            console.log('⚠️ Автозапуск отключён браузером. Звук включён вручную.');
            
            // Show welcome toast notification
            showToast('🎬 ЖЁТСКОЕ ПОРНО — Видео играет!');
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

    // =========================================
    // SEARCH FORM SUBMISSION
    // =========================================
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const query = e.target.querySelector('.search-input').value.trim();
        
        if (query) {
            showToast(`🔍 Поиск: "${query}"`);
            
            // Simulate search filter effect
            document.querySelectorAll('.video-card, .popular-item').forEach(item => {
                item.style.opacity = '0.5';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 300);
            });
        } else {
            e.target.querySelector('.search-input').focus();
        }
    });

    // =========================================
    // SUBSCRIBE FORM SUBMISSION
    // =========================================
    document.getElementById('subscribeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('.subscribe-input').value.trim();
        
        if (email) {
            showToast(`🔔 Вы подписались: ${email}`);
            e.target.reset();
            
            // Add to list of subscribers (simulated)
            const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            subscribers.push(email);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
        } else {
            e.target.querySelector('.subscribe-input').focus();
        }
    });

    // =========================================
    // NEWSLETTER FORM SUBMISSION
    // =========================================
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('.newsletter-input').value.trim();
        
        if (email) {
            showToast(`📧 Подписка на рассылку: ${email}`);
            e.target.reset();
        } else {
            e.target.querySelector('.newsletter-input').focus();
        }
    });

    // =========================================
    // USER DROPDOWN TOGGLE
    // =========================================
    const userDropdown = document.getElementById('userDropdown');
    
    // Toggle dropdown on click (simulated)
    document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target)) {
            userDropdown.classList.remove('show');
        }
    });

    // =========================================
    // QUALITY SELECTOR CHANGE
    // =========================================
    const qualitySelect = document.getElementById('qualitySelect');
    
    qualitySelect.addEventListener('change', (e) => {
        const quality = e.target.value;
        
        if (video) {
            video.src = `porno.mp4?quality=${quality}`;
            showToast(`📺 Качество: ${quality.toUpperCase()}`);
            
            // Simulate loading new quality
            video.style.opacity = '0.5';
            setTimeout(() => {
                video.style.opacity = '1';
            }, 300);
        }
    });

    // =========================================
    // SUBTITLES TOGGLE (Simulated)
    // =========================================
    const subtitleBtn = document.getElementById('subtitleBtn');
    
    let subtitlesEnabled = false;
    
    subtitleBtn.addEventListener('click', () => {
        subtitlesEnabled = !subtitlesEnabled;
        
        if (video) {
            video.style.color = subtitlesEnabled ? '#ff6b00' : 'inherit';
            
            // Add track element dynamically (simulated)
            const track = document.createElement('track');
            track.setAttribute('kind', 'captions');
            track.setAttribute('srclang', 'ru');
            track.setAttribute('label', 'Русские субтитры');
            track.setAttribute('default', 'true');
            
            if (subtitlesEnabled) {
                video.appendChild(track);
                showToast('📝 Субтитры включены!');
            } else {
                video.removeChild(track);
                showToast('📝 Субтитры выключены');
            }
        }
    });

    // =========================================
    // THEME TOGGLE (Dark/Light - Simulated)
    // =========================================
    const themeToggle = document.getElementById('themeToggle');
    
    let isDarkMode = true;
    
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            themeToggle.textContent = '🌙';
            document.body.style.backgroundColor = '#0a0a0a';
            showToast('🌙 Тёмная тема активна');
        } else {
            themeToggle.textContent = '☀️';
            document.body.style.backgroundColor = '#f5f5f5';
            document.body.style.color = '#333';
            showToast('☀️ Светлая тема активна');
            
            // Adjust text colors for light mode
            const headings = document.querySelectorAll('.video-title, .section-heading, .sidebar-title');
            headings.forEach(h => {
                h.style.color = '#ff6b00';
            });
        }
    });

    // =========================================
    // TOAST NOTIFICATION SYSTEM
    // =========================================
    function showToast(message) {
        const toast = document.createElement('div');
        
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: linear-gradient(135deg, #ff6b00 0%, #cc5200 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1.1rem;
            z-index: 9999;
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // =========================================
    // VIDEO HOVER EFFECTS
    // =========================================
    video.addEventListener('mouseenter', () => {
        video.style.transform = 'scale(1.02)';
    });

    video.addEventListener('mouseleave', () => {
        video.style.transform = 'scale(1)';
    });

    // =========================================
    // PRELOADER ANIMATION (ИСПРАВЛЕНО!)
    // =========================================
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Fade out completely after animation — УБРАЛИ display:none
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            // Не удаляем из DOM, чтобы не ломать анимации
        }, 500);
    }, 1500);

    // =========================================
    // POPULAR LIST INTERACTION (Heart Animation)
    // =========================================
    const popularItems = document.querySelectorAll('.popular-item');
    
    popularItems.forEach(item => {
        item.addEventListener('click', () => {
            showToast(`❤️ Вы выбрали: ${item.querySelector('a').textContent}`);
            
            // Heart animation effect
            const heart = document.createElement('span');
            heart.textContent = '❤️';
            heart.style.cssText = `
                position: absolute;
                left: 10px;
                top: -20px;
                font-size: 1.5rem;
                animation: floatUp 1s ease forwards;
            `;
            
            item.style.position = 'relative';
            item.appendChild(heart);
            
            // Add keyframes for floating heart (inline)
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatUp {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-40px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        });
    });

    // =========================================
    // RELATED VIDEOS INTERACTION
    // =========================================
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            showToast(`▶️ Смотрим: ${card.querySelector('.card-title').textContent}`);
            
            // Highlight effect
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });

    // =========================================
    // CATEGORY FILTERS (Simulated)
    // =========================================
    const categoryLinks = document.querySelectorAll('.sidebar a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', () => {
            showToast(`📂 Категория: ${link.textContent}`);
            
            // Filter effect on related videos
            videoCards.forEach(card => {
                card.style.opacity = '0.3';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    
                    // Random highlight
                    if (Math.random() > 0.5) {
                        card.style.boxShadow = `0 15px 40px rgba(255, 107, 0, ${0.3 + Math.random()*0.3})`;
                        setTimeout(() => {
                            card.style.boxShadow = '';
                        }, 800);
                    }
                }, 300);
            });
        });
    });

    // =========================================
    // BUTTON INTERACTION (Heart Animation)
    // =========================================
    const heartBtn = document.querySelector('.btn-primary');
    
    let isLiked = false;
    
    heartBtn.addEventListener('click', () => {
        isLiked = !isLiked;
        
        if (heartBtn) {
            heartBtn.textContent = isLiked ? '❤️' : '🤍';
            
            // Heart animation
            const heart = document.createElement('span');
            heart.textContent = isLiked ? '❤️' : '';
            heart.style.cssText = `
                position: absolute;
                left: 20px;
                top: -15px;
                font-size: 1.8rem;
                animation: floatUp 1s ease forwards;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatUp {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-40px) scale(1.5); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            heartBtn.style.position = 'relative';
            heartBtn.appendChild(heart);
        }
        
        showToast(isLiked ? '❤️ Добавлено в избранное!' : '🤍 Убрано из избранного');
    });

    // =========================================
    // FOOTER SOCIAL ICONS (Hover Effects)
    // =========================================
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.3) rotate(20deg)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // =========================================
    // CONSOLE LOGS (For Debugging)
    // =========================================
    console.log('%c 🎬 ЖЁТСКОЕ ПОРНО — Загружено Успешно!', 
        'background: linear-gradient(135deg, #ff6b00 0%, #cc5200 100%); color: white; padding: 1rem; border-radius: 8px;'
    );

    console.log('%c 📺 Видео готово к просмотру!', 
        'background: #1a1a1a; color: #ff6b00; padding: 0.5rem 1rem; border-radius: 4px;'
    );
});

// =========================================
// GLOBAL KEYBOARD SHORTCUTS (Optional)
// =========================================
document.addEventListener('keydown', (e) => {
    // Spacebar to pause/play
    if (e.code === 'Space' && video) {
        e.preventDefault();
        
        if (video.paused || video.ended) {
            video.play();
            playBtn.textContent = '⏸️';
            showToast('▶️ Видео играет!');
        } else {
            video.pause();
            playBtn.textContent = '▶️';
            showToast('⏸️ Видео пауза!');
        }
    }

    // F to fullscreen (simulated)
    if (e.code === 'KeyF' && video) {
        e.preventDefault();
        
        const isFullscreen = document.fullscreenElement;
        
        if (!isFullscreen) {
            document.documentElement.requestFullscreen().then(() => {
                showToast('⛶ Полноэкранный режим!');
            });
        } else {
            document.exitFullscreen().then(() => {
                showToast('📺 Нормальный режим!');
            });
        }
    }

    // M to mute/unmute (simulated)
    if (e.code === 'KeyM' && video) {
        e.preventDefault();
        
        video.muted = !video.muted;
        
        showToast(video.muted ? '🔇 Звук выключен' : '🔊 Звук включён');
    }
});

// =========================================
// LOCAL STORAGE (Persist Subscribers)
// =========================================
const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');

if (subscribers.length > 0) {
    console.log(`📝 ${subscribers.length} подписчиков в базе!`);
    
    // Show welcome message if first visit
    setTimeout(() => {
        showToast(`🎉 Добро пожаловать на ЖЁТСКОЕ ПОРНО! (${subscribers.length} подписчиков)`);
    }, 1000);
}

// =========================================
// END OF SCRIPTS
// =========================================
