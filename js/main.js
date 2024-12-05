document.addEventListener('DOMContentLoaded', () => {
    // 背景图动态效果
    const banner = document.querySelector('.banner img');
    
    // 鼠标移动视差效果
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(banner, {
            duration: 1,
            x: mouseX,
            y: mouseY,
            scale: 1.1,
            ease: "power2.out"
        });
    });

    // 初始动画效果
    gsap.from(banner, {
        duration: 2,
        scale: 1.2,
        opacity: 0,
        ease: "power2.out"
    });

    // 文字悬停特效
    const title = document.querySelector('.glitch');
    const description = document.querySelector('.description');
    const roleText = document.querySelector('.intro-text p:first-child');

    // 标题悬停效果
    title.addEventListener('mouseenter', () => {
        // 暂停故障效果
        title.style.animation = 'none';
        
        gsap.to(title, {
            duration: 0.3,
            scale: 1.1,
            textShadow: '0 0 20px rgba(255,255,255,0.8)',
            ease: 'power2.out'
        });
    });

    title.addEventListener('mouseleave', () => {
        gsap.to(title, {
            duration: 0.3,
            scale: 1,
            textShadow: 'none',
            ease: 'power2.out',
            onComplete: () => {
                // 恢复故障效果
                title.style.animation = 'glitch 725ms infinite';
            }
        });
    });

    // 角色文本悬停效果
    roleText.addEventListener('mouseenter', () => {
        gsap.to(roleText, {
            duration: 0.3,
            letterSpacing: '3px',
            color: '#00fffc',
            ease: 'power2.out'
        });
    });

    roleText.addEventListener('mouseleave', () => {
        gsap.to(roleText, {
            duration: 0.3,
            letterSpacing: '0px',
            color: '#ffffff',
            ease: 'power2.out'
        });
    });

    // 描述文本悬停效果
    description.addEventListener('mouseenter', () => {
        gsap.to(description, {
            duration: 0.3,
            y: -5,
            opacity: 1,
            ease: 'power2.out'
        });
    });

    description.addEventListener('mouseleave', () => {
        gsap.to(description, {
            duration: 0.3,
            y: 0,
            opacity: 0.8,
            ease: 'power2.out'
        });
    });

    // 添加菜单点击效果
    const menuWrapper = document.querySelector('.menu-wrapper');
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    // 创建菜单内容
    const menuContent = document.createElement('div');
    menuContent.className = 'menu-content';
    menuContent.innerHTML = `
        <div class="menu-items">
            <div class="menu-item" data-page="work">
                <span class="menu-item-text">Work</span>
                <span class="menu-item-bg"></span>
            </div>
            <div class="menu-item" data-page="about-me">
                <span class="menu-item-text">About Me</span>
                <span class="menu-item-bg"></span>
            </div>
            <div class="menu-item" data-page="contact">
                <span class="menu-item-text">Contact</span>
                <span class="menu-item-bg"></span>
            </div>
        </div>
    `;
    menuOverlay.appendChild(menuContent);

    let isMenuOpen = false;

    // 菜单点击事件
    menuWrapper.addEventListener('click', () => {
        if (!isMenuOpen) {
            // 打开菜单
            gsap.to(menuOverlay, {
                clipPath: 'circle(150% at 95% 5%)',
                duration: 1,
                ease: 'power4.inOut'
            });

            // 菜单项动画
            gsap.from('.menu-item', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.3
            });

            menuWrapper.classList.add('active');
        } else {
            // 关闭菜单
            gsap.to(menuOverlay, {
                clipPath: 'circle(0% at 95% 5%)',
                duration: 0.8,
                ease: 'power4.inOut'
            });

            menuWrapper.classList.remove('active');
        }
        isMenuOpen = !isMenuOpen;
    });

    // 菜单项点击事件
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            
            if (page === 'work') {
                // 关闭菜单
                gsap.to(menuOverlay, {
                    clipPath: 'circle(0% at 95% 5%)',
                    duration: 0.8,
                    ease: 'power4.inOut'
                });
                menuWrapper.classList.remove('active');
                isMenuOpen = false;

                // 添加过渡动画
                const transition = document.createElement('div');
                transition.className = 'page-transition';
                document.body.appendChild(transition);

                // 执行过渡动画后跳转
                gsap.to(transition, {
                    height: '100%',
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        window.location.href = 'works.html';
                    }
                });
            }
        });
    });

    // 获取滚动箭头容器
    const scrollArrow = document.querySelector('.scroll-arrow-container');
    // 获取项目展示区域
    const projectShowcase = document.querySelector('.project-showcase');
    
    // 添加点击事件
    scrollArrow.addEventListener('click', () => {
        // 平滑滚动到项目展示区域
        projectShowcase.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    // 添加项目点击跳转
    const robotProject = document.querySelector('.project-section:first-child');
    if (robotProject) {
        const robotImage = robotProject.querySelector('.section-image');
        const robotContent = robotProject.querySelector('.section-content');

        const handleClick = () => {
            // 添加过渡动画
            const transition = document.createElement('div');
            transition.className = 'page-transition';
            document.body.appendChild(transition);

            // 执行过渡动画
            gsap.to(transition, {
                height: '100%',
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    window.location.href = 'project-detail.html';
                }
            });
        };

        // 为图片和内容区域添加点击事件
        robotImage.addEventListener('click', handleClick);
        robotContent.addEventListener('click', handleClick);
    }
}); 