const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score-value');

let playerX = window.innerWidth / 2;
let score = 0;

function movePlayer(e) {
    if (e.key === 'ArrowLeft' && playerX > 0) {
        playerX -= 10;
    } else if (e.key === 'ArrowRight' && playerX < window.innerWidth - 50) {
        playerX += 10;
    }
    player.style.left = `${playerX}px`;
}

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
    enemy.style.top = '0px';
    gameContainer.appendChild(enemy);

    function moveEnemy() {
        let enemyTop = parseInt(enemy.style.top);
        if (enemyTop > window.innerHeight) {
            enemy.remove();
        } else {
            enemyTop += 2;
            enemy.style.top = `${enemyTop}px`;
            requestAnimationFrame(moveEnemy);
        }
    }

    moveEnemy();
}

function shoot() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${playerX + 22.5}px`;
    bullet.style.bottom = '70px';
    gameContainer.appendChild(bullet);

    function moveBullet() {
        let bulletBottom = parseInt(bullet.style.bottom);
        if (bulletBottom > window.innerHeight) {
            bullet.remove();
        } else {
            bulletBottom += 5;
            bullet.style.bottom = `${bulletBottom}px`;
            checkCollision(bullet);
            requestAnimationFrame(moveBullet);
        }
    }

    moveBullet();
}

function checkCollision(bullet) {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        const bulletRect = bullet.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        if (
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top
        ) {
            enemy.remove();
            bullet.remove();
            score += 10;
            scoreElement.textContent = score;
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        movePlayer(e);
    } else if (e.key === ' ') {
        shoot();
    }
});

setInterval(createEnemy, 2000);