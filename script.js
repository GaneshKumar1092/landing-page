document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles = [];
    const colors = ["#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1"];

    class Circle {
        constructor(x, y, radius, color, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.speedX = -this.speedX;
            }

            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.speedY = -this.speedY;
            }

            this.draw();
        }
    }

    function init() {
        for (let i = 0; i < 50; i++) {
            const radius = Math.random() * 20 + 10;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const speedX = (Math.random() - 0.5) * 2;
            const speedY = (Math.random() - 0.5) * 2;

            circles.push(new Circle(x, y, radius, color, speedX, speedY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles.forEach(circle => {
            circle.update();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        circles.length = 0;
        init();
    });

    init();
    animate();
});
