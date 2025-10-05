// Facebook Clone Interactive Features
class FacebookClone {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.posts = [];
        this.currentUser = {
            name: 'أحمد محمد',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        };
        
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
        this.initializeAnimations();
        this.loadPosts();
        this.initializeNotifications();
    }

    // Theme Management
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Event Binding
    bindEvents() {
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('focus', () => this.showSearchSuggestions());
            searchInput.addEventListener('blur', () => this.hideSearchSuggestions());
        }

        // Navigation icons
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Post interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) {
                this.handlePostAction(e);
            }
            if (e.target.closest('.story')) {
                this.handleStoryClick(e);
            }
            if (e.target.closest('.post-option')) {
                this.handlePostOption(e);
            }
        });

        // Modal events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Infinite scroll
        window.addEventListener('scroll', () => this.handleScroll());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    // Search Functionality
    handleSearch(query) {
        if (query.length < 2) return;
        
        // Simulate search results
        const searchResults = [
            'أحمد محمد',
            'سارة أحمد', 
            'محمد علي',
            'فاطمة خالد',
            'عمر حسن'
        ].filter(name => name.includes(query));
        
        this.showSearchResults(searchResults);
    }

    showSearchResults(results) {
        let dropdown = document.querySelector('.search-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'search-dropdown';
            document.querySelector('.search-bar').appendChild(dropdown);
        }
        
        dropdown.innerHTML = results.map(result => 
            `<div class="search-result-item">
                <i class="fas fa-search"></i>
                <span>${result}</span>
            </div>`
        ).join('');
        
        dropdown.style.display = 'block';
    }

    showSearchSuggestions() {
        const suggestions = ['أصدقاء', 'صفحات', 'مجموعات', 'أحداث', 'صور'];
        this.showSearchResults(suggestions);
    }

    hideSearchSuggestions() {
        setTimeout(() => {
            const dropdown = document.querySelector('.search-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        }, 200);
    }

    // Navigation Handling
    handleNavigation(e) {
        e.preventDefault();
        
        // Remove active class from all nav icons
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.classList.remove('active');
        });
        
        // Add active class to clicked icon
        e.currentTarget.classList.add('active');
        
        // Add click animation
        e.currentTarget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.currentTarget.style.transform = '';
        }, 150);
    }

    // Post Actions
    handlePostAction(e) {
        const actionBtn = e.target.closest('.action-btn');
        const post = actionBtn.closest('.post');
        const action = actionBtn.classList.contains('like-btn') ? 'like' :
                     actionBtn.classList.contains('comment-btn') ? 'comment' : 'share';
        
        switch(action) {
            case 'like':
                this.toggleLike(post, actionBtn);
                break;
            case 'comment':
                this.focusCommentInput(post);
                break;
            case 'share':
                this.sharePost(post);
                break;
        }
    }

    toggleLike(post, likeBtn) {
        const isLiked = likeBtn.classList.contains('liked');
        
        if (isLiked) {
            likeBtn.classList.remove('liked');
            likeBtn.style.color = '';
            likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i><span>إعجاب</span>';
        } else {
            likeBtn.classList.add('liked');
            likeBtn.style.color = 'var(--primary-color)';
            likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i><span>معجب</span>';
            
            // Add like animation
            this.createLikeAnimation(likeBtn);
        }
        
        // Update like count
        this.updateLikeCount(post, !isLiked);
    }

    createLikeAnimation(element) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'likeFloat 1s ease-out forwards';
        
        const rect = element.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

    updateLikeCount(post, increment) {
        const reactionsCount = post.querySelector('.reactions-count span');
        if (reactionsCount) {
            const currentText = reactionsCount.textContent;
            const currentCount = parseInt(currentText.match(/\d+/)?.[0] || 0);
            const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);
            reactionsCount.textContent = currentText.replace(/\d+/, newCount);
        }
    }

    focusCommentInput(post) {
        const commentInput = post.querySelector('.add-comment input');
        if (commentInput) {
            commentInput.focus();
            commentInput.style.transform = 'scale(1.02)';
            setTimeout(() => {
                commentInput.style.transform = '';
            }, 200);
        }
    }

    sharePost(post) {
        // Create share modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>مشاركة المنشور</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="share-options">
                        <div class="share-option" onclick="fb.shareToTimeline()">
                            <i class="fas fa-share"></i>
                            <span>مشاركة على الخط الزمني</span>
                        </div>
                        <div class="share-option" onclick="fb.shareToStory()">
                            <i class="fas fa-plus-circle"></i>
                            <span>مشاركة في القصة</span>
                        </div>
                        <div class="share-option" onclick="fb.sendMessage()">
                            <i class="fab fa-facebook-messenger"></i>
                            <span>إرسال في رسالة</span>
                        </div>
                        <div class="share-option" onclick="fb.copyLink()">
                            <i class="fas fa-link"></i>
                            <span>نسخ الرابط</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }

    // Story Handling
    handleStoryClick(e) {
        const story = e.currentTarget;
        const isCreateStory = story.classList.contains('create-story');
        
        if (isCreateStory) {
            this.openCreateStoryModal();
        } else {
            this.viewStory(story);
        }
    }

    viewStory(storyElement) {
        const storyModal = document.createElement('div');
        storyModal.className = 'story-modal';
        storyModal.innerHTML = `
            <div class="story-viewer">
                <div class="story-header">
                    <div class="story-user-info">
                        <img src="${storyElement.querySelector('img').src}" alt="User">
                        <span>${storyElement.querySelector('span').textContent}</span>
                        <span class="story-time">منذ 3 ساعات</span>
                    </div>
                    <button class="close-story" onclick="this.closest('.story-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="story-content">
                    <img src="${storyElement.querySelector('.story-image img').src}" alt="Story">
                </div>
                <div class="story-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(storyModal);
        this.animateStoryProgress();
    }

    animateStoryProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.style.animation = 'storyProgress 5s linear forwards';
            
            setTimeout(() => {
                const storyModal = document.querySelector('.story-modal');
                if (storyModal) {
                    storyModal.remove();
                }
            }, 5000);
        }
    }

    // Post Creation
    openCreatePostModal() {
        const modal = document.getElementById('createPostModal');
        if (modal) {
            modal.style.display = 'block';
            const textarea = modal.querySelector('textarea');
            if (textarea) {
                textarea.focus();
            }
        }
    }

    closeCreatePostModal() {
        const modal = document.getElementById('createPostModal');
        if (modal) {
            modal.style.display = 'none';
            // Clear form
            const textarea = modal.querySelector('textarea');
            if (textarea) {
                textarea.value = '';
            }
        }
    }

    createPost(content, privacy = 'public') {
        const newPost = {
            id: Date.now(),
            user: this.currentUser,
            content: content,
            privacy: privacy,
            timestamp: new Date(),
            likes: 0,
            comments: [],
            shares: 0
        };
        
        this.posts.unshift(newPost);
        this.renderPost(newPost);
        this.closeCreatePostModal();
        
        // Show success message
        this.showNotification('تم نشر المنشور بنجاح!', 'success');
    }

    renderPost(post) {
        const postHTML = `
            <article class="post" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-user-info">
                        <img src="${post.user.avatar}" alt="User">
                        <div class="user-details">
                            <h4>${post.user.name}</h4>
                            <div class="post-meta">
                                <span>الآن</span>
                                <i class="fas fa-globe-americas"></i>
                            </div>
                        </div>
                    </div>
                    <div class="post-options-btn">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                
                <div class="post-content">
                    <p>${post.content}</p>
                </div>

                <div class="post-stats">
                    <div class="reactions-count">
                        <div class="reaction-icons">
                            <span class="reaction like">👍</span>
                        </div>
                        <span>0 إعجاب</span>
                    </div>
                    <div class="comments-shares">
                        <span>0 تعليق</span>
                        <span>0 مشاركة</span>
                    </div>
                </div>

                <div class="post-actions">
                    <button class="action-btn like-btn">
                        <i class="fas fa-thumbs-up"></i>
                        <span>إعجاب</span>
                    </button>
                    <button class="action-btn comment-btn">
                        <i class="fas fa-comment"></i>
                        <span>تعليق</span>
                    </button>
                    <button class="action-btn share-btn">
                        <i class="fas fa-share"></i>
                        <span>مشاركة</span>
                    </button>
                </div>

                <div class="comments-section">
                    <div class="add-comment">
                        <img src="${this.currentUser.avatar}" alt="Your Profile">
                        <input type="text" placeholder="اكتب تعليقاً...">
                    </div>
                </div>
            </article>
        `;
        
        const postsContainer = document.querySelector('.posts-feed');
        if (postsContainer) {
            postsContainer.insertAdjacentHTML('afterbegin', postHTML);
            
            // Add entrance animation
            const newPostElement = postsContainer.firstElementChild;
            newPostElement.style.opacity = '0';
            newPostElement.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                newPostElement.style.transition = 'all 0.5s ease';
                newPostElement.style.opacity = '1';
                newPostElement.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Animations
    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe posts
        document.querySelectorAll('.post').forEach(post => {
            observer.observe(post);
        });

        // Add hover effects
        this.addHoverEffects();
    }

    addHoverEffects() {
        // Story hover effects
        document.querySelectorAll('.story').forEach(story => {
            story.addEventListener('mouseenter', () => {
                story.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            story.addEventListener('mouseleave', () => {
                story.style.transform = '';
            });
        });

        // Post hover effects
        document.querySelectorAll('.post').forEach(post => {
            post.addEventListener('mouseenter', () => {
                post.style.boxShadow = 'var(--shadow-hover)';
            });
            
            post.addEventListener('mouseleave', () => {
                post.style.boxShadow = 'var(--shadow)';
            });
        });
    }

    // Notifications
    initializeNotifications() {
        // Simulate real-time notifications
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 30 seconds
                this.showRandomNotification();
            }
        }, 30000);
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to page
        let container = document.querySelector('.notifications-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notifications-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }

    showRandomNotification() {
        const notifications = [
            'لديك إشعار جديد',
            'أعجب أحمد بمنشورك',
            'علق محمد على صورتك',
            'شاركت سارة منشورك'
        ];
        
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        this.showNotification(randomNotification);
        
        // Update notification badge
        this.updateNotificationBadge();
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.nav-icon .notification-badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent) || 0;
            badge.textContent = currentCount + 1;
            badge.style.animation = 'bounce 0.5s ease';
        }
    }

    // Infinite Scroll
    handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
            this.loadMorePosts();
        }
    }

    loadMorePosts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        
        // Show loading indicator
        this.showLoadingIndicator();
        
        // Simulate API call
        setTimeout(() => {
            this.generateRandomPosts(3);
            this.hideLoadingIndicator();
            this.isLoading = false;
        }, 1500);
    }

    showLoadingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'loading-indicator';
        indicator.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <span>جاري تحميل المزيد من المنشورات...</span>
            </div>
        `;
        
        document.querySelector('.posts-feed').appendChild(indicator);
    }

    hideLoadingIndicator() {
        const indicator = document.querySelector('.loading-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    generateRandomPosts(count) {
        const users = [
            { name: 'نور الدين', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face' },
            { name: 'ليلى أحمد', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
            { name: 'كريم محمد', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }
        ];
        
        const contents = [
            'يوم جميل ومليء بالإنجازات! 🌟',
            'تعلمت شيئاً جديداً اليوم في عالم التقنية 💻',
            'قضيت وقتاً رائعاً مع الأصدقاء ☕',
            'مشروع جديد ومثير قادم قريباً! 🚀',
            'الطبيعة تعطي دائماً طاقة إيجابية 🌿'
        ];
        
        for (let i = 0; i < count; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomContent = contents[Math.floor(Math.random() * contents.length)];
            
            const post = {
                id: Date.now() + i,
                user: randomUser,
                content: randomContent,
                timestamp: new Date(Date.now() - Math.random() * 86400000), // Random time in last 24h
                likes: Math.floor(Math.random() * 50),
                comments: Math.floor(Math.random() * 20),
                shares: Math.floor(Math.random() * 10)
            };
            
            this.renderGeneratedPost(post);
        }
    }

    renderGeneratedPost(post) {
        const timeAgo = this.getTimeAgo(post.timestamp);
        
        const postHTML = `
            <article class="post" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-user-info">
                        <img src="${post.user.avatar}" alt="User">
                        <div class="user-details">
                            <h4>${post.user.name}</h4>
                            <div class="post-meta">
                                <span>${timeAgo}</span>
                                <i class="fas fa-globe-americas"></i>
                            </div>
                        </div>
                    </div>
                    <div class="post-options-btn">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                
                <div class="post-content">
                    <p>${post.content}</p>
                </div>

                <div class="post-stats">
                    <div class="reactions-count">
                        <div class="reaction-icons">
                            <span class="reaction like">👍</span>
                            <span class="reaction love">❤️</span>
                        </div>
                        <span>${post.likes} إعجاب</span>
                    </div>
                    <div class="comments-shares">
                        <span>${post.comments} تعليق</span>
                        <span>${post.shares} مشاركة</span>
                    </div>
                </div>

                <div class="post-actions">
                    <button class="action-btn like-btn">
                        <i class="fas fa-thumbs-up"></i>
                        <span>إعجاب</span>
                    </button>
                    <button class="action-btn comment-btn">
                        <i class="fas fa-comment"></i>
                        <span>تعليق</span>
                    </button>
                    <button class="action-btn share-btn">
                        <i class="fas fa-share"></i>
                        <span>مشاركة</span>
                    </button>
                </div>
            </article>
        `;
        
        document.querySelector('.posts-feed').insertAdjacentHTML('beforeend', postHTML);
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        
        if (hours < 1) return 'منذ دقائق';
        if (hours < 24) return `منذ ${hours} ساعة`;
        return `منذ ${Math.floor(hours / 24)} يوم`;
    }

    // Keyboard Shortcuts
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.search-bar input').focus();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeModal();
        }
        
        // Ctrl/Cmd + Enter to post
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeTextarea = document.activeElement;
            if (activeTextarea.tagName === 'TEXTAREA') {
                const content = activeTextarea.value.trim();
                if (content) {
                    this.createPost(content);
                }
            }
        }
    }

    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
        
        this.closeCreatePostModal();
    }

    // Utility Methods
    loadPosts() {
        // Initial posts are already in HTML
        // This method can be used to load posts from API
    }

    // Share Methods
    shareToTimeline() {
        this.showNotification('تم مشاركة المنشور على الخط الزمني', 'success');
        this.closeModal();
    }

    shareToStory() {
        this.showNotification('تم مشاركة المنشور في القصة', 'success');
        this.closeModal();
    }

    sendMessage() {
        this.showNotification('تم فتح نافذة الرسائل', 'info');
        this.closeModal();
    }

    copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            this.showNotification('تم نسخ الرابط', 'success');
        });
        this.closeModal();
    }
}

// Global Functions
function openCreatePostModal() {
    fb.openCreatePostModal();
}

function closeCreatePostModal() {
    fb.closeCreatePostModal();
}

function toggleTheme() {
    fb.toggleTheme();
}

// Initialize Facebook Clone
const fb = new FacebookClone();

// Add CSS for new features
const additionalStyles = `
    <style>
        .search-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            border-radius: 8px;
            box-shadow: var(--shadow-hover);
            z-index: 1001;
            max-height: 300px;
            overflow-y: auto;
            display: none;
        }
        
        .search-result-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .search-result-item:hover {
            background: var(--hover-color);
        }
        
        .story-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .story-viewer {
            position: relative;
            max-width: 400px;
            width: 90%;
            height: 80%;
            background: var(--bg-secondary);
            border-radius: 12px;
            overflow: hidden;
        }
        
        .story-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }
        
        .story-user-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .story-user-info img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid white;
        }
        
        .story-content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .story-content img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
        }
        
        .story-progress {
            position: absolute;
            top: 8px;
            left: 16px;
            right: 16px;
            height: 3px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress-bar {
            height: 100%;
            background: white;
            border-radius: 2px;
            width: 0%;
        }
        
        @keyframes storyProgress {
            to { width: 100%; }
        }
        
        @keyframes likeFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(1.5);
            }
        }
        
        .notifications-container {
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 3000;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .notification {
            background: var(--bg-secondary);
            border-radius: 8px;
            padding: 16px;
            box-shadow: var(--shadow-hover);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            animation: slideIn 0.3s ease;
        }
        
        .notification.success {
            border-left: 4px solid var(--secondary-color);
        }
        
        .notification.error {
            border-left: 4px solid var(--accent-color);
        }
        
        .notification.info {
            border-left: 4px solid var(--primary-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-secondary);
            padding: 4px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .notification-close:hover {
            background: var(--hover-color);
            color: var(--text-primary);
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        .loading-indicator {
            display: flex;
            justify-content: center;
            padding: 40px;
        }
        
        .loading-spinner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            color: var(--text-secondary);
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .share-options {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .share-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .share-option:hover {
            background: var(--hover-color);
            transform: translateX(4px);
        }
        
        .share-option i {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--hover-color);
            border-radius: 50%;
            font-size: 16px;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);