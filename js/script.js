document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    // 为每个按钮添加点击事件
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 获取当前按钮对应的tabId
            const tabId = this.getAttribute('data-tab');
            // 移除所有按钮的active类
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            // 移除所有内容面板的active类
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            // 为当前按钮添加active类
            this.classList.add('active');
            // 显示对应的内容面板
            document.getElementById(tabId).classList.add('active');
        });
    });
    // 增强版季节配置
    const seasonsConfig = {
        spring: {
            symbol: '❀',// 使用花朵emoji作为元素
            className: 'petal',// CSS类名，用于样式控制
            count: 15,  // 增加花朵数量
            sizeRange: [15, 32],// 花朵大小范围12-28px
            durationRange: [2, 12],  // 延长持续时间
            swayRange: [60, 180],// 左右摇摆幅度60-180px
            color: '#FF3366',// 花朵颜色（粉红色）
            opacityRange: [0.7, 1],// 透明度范围70%-100%
            rotationRange: [0, 720],// 旋转角度0-720度（2圈）
            zIndex: -1,// 层级置于背景层
            shadow: '0 0 10px rgba(255, 51, 102, 0.8)',// 粉红色阴影效果
            continuous: true,// 持续生成新元素
            spawnArea: 1.4// 生成区域扩展1.4倍
        },
        summer: {
            symbol: '|',// 使用竖线模拟雨滴
            className: 'rain', // CSS类名
            count: 100,  // 大幅增加雨滴数量
            lengthRange: [25, 50],  // 更长的雨滴
            widthRange: [1, 3],  // 更粗的雨滴
            durationRange: [0.8, 1.5],  // 更长的下落时间
            color: '#3399FF',// 天蓝色雨滴
            opacityRange: [0.6, 0.95],// 透明度60%-95%
            zIndex: -1,// 背景层
            blur: 3,  // 更强的模糊效果
            spawnArea: 1.8,  // 更宽的生成区域
            continuous: true,
            turbulence: 0.3  // 雨滴湍流效果
        },
        autumn: {
            symbol: '🍂', // 使用落叶emoji
            className: 'leaf',  // CSS类名
            count: 10, // 落叶数量20片
            sizeRange: [18, 40],// 大小18-40px（更大）
            durationRange: [2, 15],  // 延长持续时间
            swayRange: [100, 250],// 摇摆幅度100-250px（更大幅度）
            color: '#CC7722',// 黄褐色落叶
            opacityRange: [0.8, 1], // 透明度80%-100%
            rotationRange: [0, 1080],// 旋转0-1080度（3圈）
            zIndex: -1,// 背景层
            shadow: '0 0 8px rgba(204, 119, 34, 0.7)', // 褐色阴影
            continuous: true,    // 持续生成
            spawnArea: 1.5 // 生成区域扩展1.5倍
        },
        winter: {
            symbol: '❄',// 雪花emoji
            className: 'snow', // CSS类名
            count: 80,  // 增加雪花数量
            sizeRange: [25, 40], // 大小20-35px（更大）
            durationRange: [2, 15],  // 延长持续时间
            swayRange: [30, 120],  // 摇摆幅度30-120px
            color: '#B0E0E6',   // 淡蓝色雪花
            opacityRange: [0.5, 0.95],   // 透明度50%-95%
            rotationRange: [0, 1440],// 旋转0-1440度（4圈）
            zIndex: -1, // 背景层
            shadow: '0 0 15px rgba(176, 224, 230, 0.9)',// 亮蓝色阴影（更明显）
            continuous: true, // 持续生成
            spawnArea: 1.4   // 生成区域扩展1.4倍
        }
    };

    // 检测当前季节
    const currentSeason = detectSeason();
    if (currentSeason && seasonsConfig[currentSeason]) {
        createSeasonAnimation(seasonsConfig[currentSeason]);
    }

    // 创建季节动画
    function createSeasonAnimation(config) {
        // 初始批量创建
        for (let i = 0; i < config.count; i++) {
            setTimeout(() => {
                if (config.className === 'rain') {
                    createRain(config);
                } else {
                    createFallingElement(config);
                }
            }, Math.random() * 8000);  // 更长的创建时间范围
        }

        // 持续添加新元素保持动画连续性
        if (config.continuous !== false) {
            setInterval(() => {
                const shouldCreate = Math.random() > (config.turbulence || 0.2);
                if (shouldCreate) {
                    if (config.className === 'rain') {
                        createRain(config);
                    } else {
                        createFallingElement(config);
                    }
                }
            }, 250);  // 更频繁的创建间隔
        }
    }

    // 创建飘落元素
    function createFallingElement(config) {
        const element = document.createElement('div');
        element.className = config.className;

        // 设置元素内容
        if (config.symbol) {
            element.innerHTML = config.symbol;
            element.style.fontSize = `${randomInRange(config.sizeRange)}px`;
            element.style.color = config.color;
        }

        // 随机位置
        const spawnArea = config.spawnArea || 1;
        element.style.left = `${(Math.random() * 100 * spawnArea) - (spawnArea > 1 ? 50 : 0)}vw`;
        element.style.top = `-${randomInRange([30, 70])}px`;  // 从更高处开始

        // 动画参数
        const duration = randomInRange(config.durationRange);
        const delay = Math.random() * 6;  // 更长的随机延迟
        const sway = randomInRange(config.swayRange);

        // 旋转动画
        const rotation = randomInRange(config.rotationRange);
        const rotationAnimation = config.rotationRange ?
            `, rotate ${duration * 0.8}s linear ${delay}s infinite` : '';

        element.style.animation =
            `fall ${duration}s linear ${delay}s infinite${rotationAnimation}`;
        element.style.setProperty('--sway', `${sway}px`);
        element.style.setProperty('--rotation', `${rotation}deg`);

        // 视觉效果
        if (config.opacityRange) {
            element.style.opacity = randomInRange(config.opacityRange);
        }
        if (config.shadow) {
            element.style.textShadow = config.shadow;
        }
        element.style.zIndex = config.zIndex;

        document.body.appendChild(element);

        // 动画结束后移除元素
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, (duration + delay) * 1000 + 5000);  // 更长的保留时间
    }

    // 创建雨滴元素（增强版）
    function createRain(config) {
        const rain = document.createElement('div');
        rain.className = config.className;

        // 雨滴样式
        rain.style.background = config.color;
        rain.style.width = `${randomInRange(config.widthRange)}px`;
        rain.style.height = `${randomInRange(config.lengthRange)}px`;
        rain.style.opacity = randomInRange(config.opacityRange);

        // 随机位置（更宽的生成区域）
        rain.style.left = `${(Math.random() * 140) - 20}vw`;
        rain.style.top = `-${randomInRange([20, 50])}px`;

        // 动画参数
        const duration = randomInRange(config.durationRange);
        const delay = Math.random() * 3;

        // 雨滴倾斜角度和湍流效果
        const baseTilt = randomInRange([-20, 20]);
        const turbulence = config.turbulence ? randomInRange([-30, 30]) * config.turbulence : 0;
        const tilt = baseTilt + turbulence;
        rain.style.transform = `rotate(${tilt}deg)`;

        // 模糊效果
        if (config.blur) {
            rain.style.filter = `blur(${config.blur}px)`;
        }

        // 雨滴动画
        rain.style.animation = `
            rainFall ${duration}s linear ${delay}s infinite,
            rainSway ${duration * 2}s ease-in-out ${delay}s infinite
        `;
        rain.style.setProperty('--turbulence', `${turbulence * 2}px`);

        rain.style.zIndex = config.zIndex;

        document.body.appendChild(rain);

        // 动画结束后移除元素
        setTimeout(() => {
            if (rain.parentNode) {
                rain.remove();
            }
        }, (duration + delay) * 1000 + 3000);
    }

    // 检测当前季节
    function detectSeason() {
        if (document.body.classList.contains('spring-bg')) return 'spring';
        if (document.body.classList.contains('summer-bg')) return 'summer';
        if (document.body.classList.contains('autumn-bg')) return 'autumn';
        if (document.body.classList.contains('winter-bg')) return 'winter';
        return null;
    }

    // 辅助函数
    function randomInRange(range) {
        return Math.random() * (range[1] - range[0]) + range[0];
    }

    // 动态添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        /* 飘落动画 */
        @keyframes fall {
            to {
                top: 120vh;  /* 更长的下落路径 */
                transform: translateX(var(--sway)) rotate(var(--rotation));
            }
        }
        
        /* 旋转动画 */
        @keyframes rotate {
            to {
                transform: translateX(var(--sway)) rotate(var(--rotation));
            }
        }
        
        /* 雨滴下落动画 */
        @keyframes rainFall {
            to {
                top: 120vh;
                opacity: 0.1;
            }
        }
        
        /* 雨滴摇摆动画 */
        @keyframes rainSway {
            0%, 100% {
                transform: translateX(0) rotate(calc(var(--tilt) * 1deg));
            }
            50% {
                transform: translateX(var(--turbulence)) rotate(calc(var(--tilt) * 1.2deg));
            }
        }
        
        /* 通用元素样式 */
        .petal, .leaf, .snow, .rain {
            position: fixed;
            pointer-events: none;
            animation-timing-function: linear;
            animation-fill-mode: both;
            will-change: transform, opacity;
        }
        
        /* 小红花样式 */
        .petal {
            z-index: -1;
            text-shadow: var(--shadow);
        }
        
        /* 落叶样式 */
        .leaf {
            z-index: -1;
            text-shadow: var(--shadow);
        }
        
        /* 雪花样式 */
        .snow {
            z-index: -1;
            text-shadow: var(--shadow);
        }
        
        /* 雨滴样式 */
        .rain {
            z-index: -1;
            box-shadow: 0 0 8px rgba(51, 153, 255, 0.6);
        }
    `;
    document.head.appendChild(style);
});