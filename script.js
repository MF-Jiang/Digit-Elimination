const gameContainer = document.getElementById('game-container');
let circles = [];

// 创建小圆片并填充随机数字
function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.textContent = Math.floor(Math.random() * 9) + 1;
    gameContainer.appendChild(circle);
    circles.push(circle);
}

// 创建17x10个小圆片
for (let i = 0; i < 17 * 10; i++) {
    createCircle();
}

// 监听鼠标事件，记录被框选的圆片
let isDrawing = false;
let selectedCircles = [];

gameContainer.addEventListener('mousedown', (e) => {
    isDrawing = true;
    selectedCircles = [];
    gameContainer.classList.add('drawing');
});

gameContainer.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    circles.forEach((circle) => {
        const circleRect = circle.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;

        if (
            mouseX >= circleRect.left - containerRect.left &&
            mouseX <= circleRect.right - containerRect.left &&
            mouseY >= circleRect.top - containerRect.top &&
            mouseY <= circleRect.bottom - containerRect.top
        ) {
            if (!selectedCircles.includes(circle)) {
                selectedCircles.push(circle);
                circle.classList.add('selected'); // 设置被框选时的颜色
            }
        } else {
            circle.classList.remove('selected'); // 移除未被框选的颜色
        }
    });
});

gameContainer.addEventListener('mouseup', () => {
    isDrawing = false;
    gameContainer.classList.remove('drawing');

    const sum = selectedCircles.reduce((total, circle) => {
        return total + (circle.textContent === '' ? 0 : parseInt(circle.textContent));
    }, 0);

    if (sum === 10) {
        selectedCircles.forEach((circle) => {
            circle.textContent = ''; // 隐藏数字
            circle.style.backgroundColor = 'white'; // 设置背景色为白色
        });
    }

    selectedCircles = [];
});
