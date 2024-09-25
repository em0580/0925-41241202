const cardContainer = document.getElementById('cardContainer');
const startButton = document.getElementById('startGame');
const flipAllFrontButton = document.getElementById('flipAllFront');
const flipAllBackButton = document.getElementById('flipAllBack');
const timerDisplay = document.getElementById('timerDisplay');
const themeSelect = document.getElementById('themeSelect');

// 定義兩個主題的背面圖片集
const purpleThemeBackImages = [
    'photo/food1.png',
    'photo/food2.png',
    'photo/food3.png',
    'photo/food4.png',
    'photo/food5.png',
    'photo/food6.png',
    'photo/food7.png',
    'photo/food8.png',
];

const blueThemeBackImages = [
    'photo/TNT1.jpg',  // 藍色主題背面圖片
    'photo/TNT2.jpg',
    'photo/TNT3.jpg',
    'photo/TNT4.jpg',
    'photo/TNT5.jpg',
    'photo/TNT6.jpg',
    'photo/TNT7.jpg',
    'photo/TNT8.jpg',
];

let cards = [];
let countdownInterval;
let cardsLocked = false; // 用來控制卡牌是否被鎖住

// 隨機打亂卡牌順序
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 根據當前選擇的主題獲取背面圖片集
function getBackImages() {
    const theme = themeSelect.value; // 根據下拉選單的選擇來確定主題
    return theme === 'blue' ? blueThemeBackImages : purpleThemeBackImages;
}

// 定義兩個主題的正面圖片
const purpleThemeFrontImage = 'photo/cover1.png'; // 紫色主題的正面圖片
const blueThemeFrontImage = 'photo/cover2.png'; // 偶像主題的正面圖片

// 創建卡牌
function createCards() {
    const backImages = getBackImages();
    cards = [];
    backImages.forEach((backImage) => {
        const frontImage = themeSelect.value === 'blue' ? blueThemeFrontImage : purpleThemeFrontImage;
        cards.push({ front: frontImage, back: backImage });
        cards.push({ front: frontImage, back: backImage });
    });

    shuffle(cards);
    cardContainer.innerHTML = ''; // 清除之前的卡牌
    cards.forEach((cardData) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const frontImg = document.createElement('img');
        frontImg.src = cardData.front;
        frontImg.alt = '卡牌正面';
        cardFront.appendChild(frontImg);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const backImg = document.createElement('img');
        backImg.src = cardData.back;
        backImg.alt = '卡牌背面';
        cardBack.appendChild(backImg);

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardContainer.appendChild(card);

        // 添加點擊事件以翻轉卡片
        card.onclick = () => {
            if (!cardsLocked) {
                card.classList.toggle('flipped'); // 切換翻轉狀態
            }
        };
    });
}


// 更新計時器顯示
function updateTimerDisplay(seconds) {
    timerDisplay.textContent = `剩餘時間: ${seconds}秒`;
}

// 禁用按鈕
function disableButtons() {
    startButton.disabled = true;
    flipAllFrontButton.disabled = true;
    flipAllBackButton.disabled = true;
}

// 啟用按鈕
function enableButtons() {
    startButton.disabled = false;
    flipAllFrontButton.disabled = false;
    flipAllBackButton.disabled = false;
}

// 翻轉所有卡牌到正面
flipAllFrontButton.onclick = () => {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped'); // 顯示正面
    });
};

// 翻轉所有卡牌到背面
flipAllBackButton.onclick = () => {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('flipped'); // 顯示背面
    });
};

// 在頁面加載時創建卡牌
window.onload = () => {
    createCards(); // 創建卡牌
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped'); // 顯示正面
    });
};

startButton.onclick = () => {
    // 鎖住所有卡牌，禁止翻轉
    cardsLocked = true;

    // 首先翻轉所有卡牌到背面
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('flipped'); // 顯示背面
    });

    disableButtons(); // 禁用按鈕

    let remainingTime = 10;
    updateTimerDisplay(remainingTime); // 初始化計時器顯示

    countdownInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay(remainingTime);
        
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('flipped'); // 10秒後翻轉到正面
            });
            enableButtons(); // 啟用按鈕
            cardsLocked = false; // 解除鎖定
        }
    }, 1000); // 每秒更新
};

// 當主題選擇改變時，重新設置卡片顏色及圖片
themeSelect.onchange = () => {
    createCards(); // 重新創建卡牌
};
