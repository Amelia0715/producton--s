document.addEventListener('DOMContentLoaded', () => {
    const workItems = document.querySelectorAll('.work-item');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const backButton = document.querySelector('.back-button');
    
    // 初始动画
    gsap.to('.work-content', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });

    // 使用 Intersection Observer 监听元素出现
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(workItems).indexOf(entry.target);
                scrollDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    workItems.forEach((item, index) => {
        observer.observe(item);

        // 为第一个作品添加点击事件
        if (index === 0) {
            item.addEventListener('click', () => {
                // 先添加淡出动画
                gsap.to(item, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        // 添加过渡动画
                        const transition = document.querySelector('.page-transition');
                        gsap.to(transition, {
                            height: '100%',
                            duration: 0.8,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                window.location.href = 'project-detail.html';
                            }
                        });
                    }
                });

                // 其他项目淡出
                workItems.forEach((otherItem, i) => {
                    if (i !== 0) {
                        gsap.to(otherItem, {
                            opacity: 0,
                            y: 50,
                            duration: 0.5,
                            ease: 'power2.inOut'
                        });
                    }
                });

                // 滚动指示器淡出
                gsap.to('.scroll-indicator', {
                    opacity: 0,
                    duration: 0.3
                });
            });
        }
    });

    // 点击滚动指示器
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            workItems[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });

    // 修改返回按钮事件处理
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 添加点击动画
        gsap.to(backButton, {
            scale: 0.9,
            duration: 0.1,
            onComplete: () => {
                gsap.to(backButton, {
                    scale: 1,
                    duration: 0.1
                });
            }
        });

        // 页面淡出动画
        gsap.to('.work-content', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.inOut',
            onComplete: () => {
                history.back();
            }
        });
    });

    // 添加悬停动画
    backButton.addEventListener('mouseenter', () => {
        gsap.to(backButton, {
            rotation: -90,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    backButton.addEventListener('mouseleave', () => {
        gsap.to(backButton, {
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}); 