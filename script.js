document.querySelectorAll(".sosmed i").forEach((sosmed) => {
  sosmed.addEventListener("mouseenter", () => {
    sosmed.classList.remove("ph");
    sosmed.classList.add("ph-fill");
  });

  sosmed.addEventListener("mouseleave", () => {
    sosmed.classList.remove("ph-fill");
    sosmed.classList.add("ph");
  });
});

class Particle {
    lifeSpan;
    initialLifeSpan;
    velocity;
    position;
    baseDimension;

    constructor(x, y) {
        this.initialLifeSpan = Math.floor(Math.random() * 30 + 30);
        this.lifeSpan = this.initialLifeSpan;
        this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10 + 0.05),
            y: -0.5 - Math.random() * 0.5,
        };
        this.position = { x, y };
        this.baseDimension = 4;
    }

    update(context) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 50;
        this.velocity.y -= Math.random() / 300;
        this.lifeSpan--;
        const scale = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;
        context.fillStyle = '#e6f1f7';
        context.strokeStyle = '#3a92c5';
        context.beginPath();
        context.arc(
            this.position.x,
            this.position.y,
            this.baseDimension * scale,
            0,
            2 * Math.PI
        );
        context.stroke();
        context.fill();
        context.closePath();
    }
}

function initBubbleCursor(wrapperElement) {
    const canvas = document.createElement('canvas');
    wrapperElement.appendChild(canvas);
    canvas.style.pointerEvents = 'none';
    const context = canvas.getContext('2d');
    let particles = [];
    const cursor = { x: 0, y: 0 };
    const previousCursor = { x: 0, y: 0 };
    let animationFrameId;
    const MAX_PARTICLES = 100;

    const onMouseMove = (e) => {
        cursor.x = e.clientX - wrapperElement.getBoundingClientRect().left;
        cursor.y = e.clientY - wrapperElement.getBoundingClientRect().top;

        const distance = Math.sqrt(
            Math.pow(cursor.x - previousCursor.x, 2) +
            Math.pow(cursor.y - previousCursor.y, 2)
        );

        const particlesToAdd = Math.max(1, Math.ceil(distance / 10));
        for (let i = 0; i < particlesToAdd; i++) {
            if (particles.length < MAX_PARTICLES) {
                addParticle(cursor.x, cursor.y);
            }
        }
        previousCursor.x = cursor.x;
        previousCursor.y = cursor.y;
    };
    const addParticle = (x, y) => {
        particles.push(new Particle(x, y));
    };
    const updateParticles = () => {
        if (!context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update(context);
            if (particles[i].lifeSpan <= 0) {
                particles.splice(i, 1);
            }
        }
    };
    const loop = (timestamp) => {
        updateParticles();
        animationFrameId = requestAnimationFrame(loop);
    };
    const resizeCanvas = () => {
        canvas.width = wrapperElement.clientWidth;
        canvas.height = wrapperElement.clientHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    wrapperElement.addEventListener('mousemove', onMouseMove);
    resizeCanvas();
    loop();
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
        wrapperElement.removeEventListener('mousemove', onMouseMove);
        canvas.remove();
    };
}

async function loadViews() {
  const response = await fetch('views.php');
  const data = await response.json();
  document.getElementById('view-count').innerText = data.views;
}

var texts = ['FiveM Developer', 'fazerp.eu on top'];
var currentTextIndex = 0;
var speed = 200; 
var eraseSpeed = 80;
var forward = true; 
function typeWriter() {
    var typewriter = document.getElementById("typewriter");
    var currentText = texts[currentTextIndex];
    var textLength = currentText.length;

    if (forward) {
        if (typewriter.innerHTML.length < textLength) {
            typewriter.innerHTML += currentText.charAt(typewriter.innerHTML.length);
            setTimeout(typeWriter, speed);
        } else {
            forward = false;
            setTimeout(typeWriter, speed * 3); 
        }
    } else {
        if (typewriter.innerHTML.length > 0) {
            typewriter.innerHTML = typewriter.innerHTML.slice(0, -1);
            setTimeout(typeWriter, eraseSpeed);
        } else {
            forward = true;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            setTimeout(typeWriter, speed * 3); 
        }
    }
}
typeWriter();

    let isMusicPlaying = false;
    var audio = document.getElementById("myAudio");
    var toggleButton = document.getElementById("toggleMusicButton");
    var musicIcon = document.getElementById("musicIcon");
    const video = document.getElementById('myVideo');

    function toggleAudio() {
        if (isMusicPlaying) {
            audio.pause();
            musicIcon.classList.remove("fa-pause");
            musicIcon.classList.add("fa-play");
            isMusicPlaying = false;
        } else {
            audio.play();
            musicIcon.classList.remove("fa-play");
            musicIcon.classList.add("fa-pause");
            isMusicPlaying = true;
        }
    }
    function startAudio() {
        if (audio && video) {
            audio.play();
            video.play();
            document.getElementById("startMusicButton").style.display = "none";
            toggleButton.style.display = "block";
            musicIcon.classList.remove("fa-play");
            musicIcon.classList.add("fa-pause");
            audio.volume = 0.2;
        } else {
            console.error("Audio or Video element not found.");
        }
    }