// Snow effect
class Snowflake {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -10;
        this.size = Math.random() * 3 + 2;
        this.speed = Math.random() * 1 + 0.5;
        this.swing = Math.random() * 3;
        this.swingSpeed = Math.random() * 0.02;
        this.angle = 0;
    }

    update() {
        this.y += this.speed;
        this.angle += this.swingSpeed;
        this.x += Math.sin(this.angle) * this.swing;

        if (this.y > window.innerHeight) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }
}

// Create snow canvas
function createSnowCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    document.body.prepend(canvas);
    return canvas;
}

// Initialize snow
function initSnow() {
    const canvas = createSnowCanvas();
    const ctx = canvas.getContext('2d');
    const snowflakes = Array(100).fill().map(() => new Snowflake());

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw(ctx);
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
}

// Start snow effect when the document is loaded
document.addEventListener('DOMContentLoaded', initSnow);
