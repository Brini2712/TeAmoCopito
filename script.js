const btnYes = document.getElementById('yes');
const btnNo = document.getElementById('no');
const message = document.getElementById('message');
const clickSound = document.getElementById('clickSound');
const successSound = document.getElementById('successSound');
const heartsContainer = document.querySelector('.hearts-container');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const backgroundMusic = document.getElementById('backgroundMusic');

let fontSize = 2;
let currentMessage = 'No';

let messages = [
  'Estas segurx?',
  'Piensalo bien',
  'Piensalo muy bien',
  'Piensalo',
  'Mira el otro botón'
]

// Crear corazones flotantes
function createFloatingHearts() {
  setInterval(() => {
    // Crear 3 corazones en cada intervalo
    for(let i = 0; i < 3; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      
      // Posición aleatoria en el eje X
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
      heart.style.opacity = (Math.random() * 0.3 + 0.5).toString();
      heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      
      heartsContainer.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 6000);
    }
  }, 200); // Intervalo más corto para más corazones
}

// Función para el confeti
function throwConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffffff']
  };

  confetti({
    ...defaults,
    particleCount: count/2
  });

  confetti({
    ...defaults,
    angle: 60,
    particleCount: count/4
  });

  confetti({
    ...defaults,
    angle: 120,
    particleCount: count/4
  });
}

// Función para mostrar el mensaje final
function typewriterEffect(text, element, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  const typing = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      element.classList.add('glow-effect');
    }
  }, speed);
}

function showFinalMessage() {
  document.querySelector('main > img').style.display = 'none';
  document.querySelector('main > h1').style.display = 'none';
  document.querySelector('.options').style.display = 'none';
  
  // Mostrar la imagen de fondo
  const backgroundImage = document.getElementById('background-image');
  backgroundImage.style.display = 'block';
  
  message.style.display = 'flex';
  message.classList.add('show');
  message.style.background = 'none';
  
  // Crear contenedor para el mensaje final
  const messageContent = `
    <div class="final-message-container" style="
      background: linear-gradient(45deg, #ff1493, #ff69b4); 
      padding: 1.8rem; 
      border-radius: 30px; 
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
      border: 6px solid white;
      position: relative;
      overflow: hidden;
      max-width: 85%;
      margin: 0 auto;
      animation: borderGlow 2s infinite alternate;">
      <div class="heart-icon" style="font-size: 2.5rem;">💝</div>
      <h1 style="
        font-family: 'Fredoka One', sans-serif; 
        font-size: 2.5em; 
        color: white; 
        text-shadow: 3px 3px 0px rgba(0,0,0,0.2);
        letter-spacing: 1px;
        margin: 8px 0;
        text-transform: uppercase;"></h1>
      <div class="love-message" style="
        font-family: 'Poppins', sans-serif; 
        font-size: 1.4em; 
        text-align: center; 
        color: white;
        font-weight: 600;
        letter-spacing: 0.5px;">
        <p style="margin: 12px 0;">✨ Gracias por hacer mis días más felices ✨</p>
        <p style="margin: 12px 0;">💫 Eres lo mejor que me ha pasado 💫</p>
        <p style="margin: 12px 0; font-size: 1.2em; font-weight: 800; font-family: 'Lilita One', cursive;">Te quiero mucho 💖</p>
      </div>
      <div class="heart-icon" style="font-size: 2.5rem;">💝</div>
    </div>
  `;
  
  message.innerHTML = messageContent;
  
  // Agregar animación del borde brillante con colores más intensos
  const style = document.createElement('style');
  style.textContent = `
    @keyframes borderGlow {
      0% {
        box-shadow: 0 0 20px rgba(0,0,0,0.2),
                    0 0 15px #ff1493,
                    inset 0 0 30px rgba(255,255,255,0.3);
        transform: scale(1);
      }
      100% {
        box-shadow: 0 0 30px rgba(0,0,0,0.3),
                    0 0 25px #ff69b4,
                    inset 0 0 40px rgba(255,255,255,0.5);
        transform: scale(1.01);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Texto con efecto máquina de escribir y emojis
  const finalText = "Siempre supe que dirías que sí 💝";
  typewriterEffect(finalText, message.querySelector('h1'));
  
  successSound.play();
  throwConfetti();
  
  // Agregar más corazones flotantes
  const extraHeartsInterval = setInterval(() => {
    for(let i = 0; i < 5; i++) { // Crear 5 corazones cada vez
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '❤️';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
      heart.style.opacity = (Math.random() * 0.7 + 0.3).toString();
      heart.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
      heart.style.color = ['#ff69b4', '#ff1493', '#ff6b6b'][Math.floor(Math.random() * 3)];
      
      heartsContainer.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 5000);
    }
  }, 300);
  
  // Crear corazones que flotan hacia arriba desde abajo
  const upHeartsInterval = setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart-up');
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.position = 'fixed';
    heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 400);
  
  // Detener los intervalos después de 10 segundos
  setTimeout(() => {
    clearInterval(extraHeartsInterval);
    clearInterval(upHeartsInterval);
  }, 10000);
}

// Función para crear estrellas brillantes
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars-container';
  document.body.appendChild(starsContainer);

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    starsContainer.appendChild(star);
  }
}

// Función para el efecto de explosión de corazones
function heartBurst(x, y) {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.className = 'burst-heart';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const velocity = 5 + Math.random() * 5;
    heart.style.setProperty('--angle', `${angle}rad`);
    heart.style.setProperty('--velocity', `${velocity}`);
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
  }
}

// Eventos
createFloatingHearts();

btnYes.addEventListener('click', () => {
  showFinalMessage();
  throwConfetti();
  
  // Efecto de explosión de fuegos artificiales
  const colors = ['#ff69b4', '#ff1493', '#ff6b6b', '#ffffff'];
  const fireworks = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      },
      colors: colors,
      disableForReducedMotion: true
    });
  }, 500);

  // Detener los fuegos artificiales después de 3 segundos
  setTimeout(() => clearInterval(fireworks), 3000);
});

btnNo.addEventListener('mouseover', (e) => {
  const x = Math.random() * (window.innerWidth - e.target.offsetWidth);
  const y = Math.random() * (window.innerHeight - e.target.offsetHeight);
  
  currentMessage = e.target.textContent;
  clickSound.play();
  
  e.target.style.position = 'absolute';
  e.target.style.left = x + 'px';
  e.target.style.top = y + 'px';
  
  e.target.textContent = currentMessage;
});

btnNo.addEventListener('click', () => {
  fontSize = fontSize + .5;
  btnYes.style.fontSize = `${fontSize}rem`;
  clickSound.play();

  const indexRandom = Math.floor(Math.random() * messages.length);
  currentMessage = messages[indexRandom];
  btnNo.textContent = currentMessage;
});

// Seguimiento del cursor con mini corazones
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.9) { // 10% de probabilidad de crear un corazón
    heartBurst(e.clientX, e.clientY);
  }
});

// Iniciar efectos
createStars();

function createEmojiRain() {
  const emojis = ['❤️', '💖', '💝', '💕', '💓', '💗', '💞'];
  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.className = 'falling-emoji';
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(emoji);
    
    setTimeout(() => emoji.remove(), 6000);
  }, 300);
}

function createFloatingParticles() {
  const colors = ['#ff69b4', '#ff1493', '#ff6b6b', '#ffffff'];
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = -Math.random() * 20 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Evento para el botón de inicio
startButton.addEventListener('click', () => {
  backgroundMusic.play();
  
  // Agregar clase para la transición suave
  startScreen.classList.add('hide');
  
  // Esperar a que termine la transición antes de ocultar
  setTimeout(() => {
    startScreen.style.display = 'none';
    document.querySelector('main').style.display = 'flex';
  }, 800);
  
  // Iniciar todos los efectos
  createFloatingHearts();
  createStars();
  createEmojiRain();
  createFloatingParticles();
});

// Ocultar el contenido principal inicialmente
document.querySelector('main').style.display = 'none';

// Modificar el estilo del botón de inicio
const startButtonStyle = `
  background: linear-gradient(45deg, #ff1493, #ff69b4);
  padding: 1.8rem 3rem;
  border-radius: 30px;
  border: 6px solid white;
  font-family: 'Fredoka One', sans-serif;
  font-size: 2rem;
  color: white;
  text-shadow: 3px 3px 0px rgba(0,0,0,0.2);
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: borderGlow 2s infinite alternate;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
`;

startButton.style.cssText = startButtonStyle;

// Agregar el estilo de la animación del borde brillante
const startButtonAnimation = document.createElement('style');
startButtonAnimation.textContent = `
  @keyframes borderGlow {
    0% {
      box-shadow: 0 0 20px rgba(0,0,0,0.2),
                  0 0 15px #ff1493,
                  inset 0 0 30px rgba(255,255,255,0.3);
      transform: scale(1);
    }
    100% {
      box-shadow: 0 0 30px rgba(0,0,0,0.3),
                  0 0 25px #ff69b4,
                  inset 0 0 40px rgba(255,255,255,0.5);
      transform: scale(1.01);
    }
  }
`;
document.head.appendChild(startButtonAnimation);

// Modificar el contenido del botón
startButton.innerHTML = `
  <span style="
    font-family: 'Fredoka One', sans-serif;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    gap: 10px;">
    <span style="font-size: 1.2em;">💝</span>
    Toca para comenzar
    <span style="font-size: 1.2em;">💝</span>
  </span>
`;

// Función para crear elementos decorativos en la pantalla de inicio
function createStartScreenDecorations() {
  const startScreen = document.getElementById('start-screen');
  
  // Crear contenedor para el botón y decoraciones
  const container = document.createElement('div');
  container.style.cssText = `
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
    padding: 2rem;
  `;
  
  // Agregar corazones giratorios alrededor del botón
  const positions = [
    { top: '-40px', left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', right: '-40px', transform: 'translateY(-50%)' },
    { bottom: '-40px', left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', left: '-40px', transform: 'translateY(-50%)' }
  ];
  
  const hearts = ['💝', '💖', '💗', '💓'];
  hearts.forEach((heart, index) => {
    const heartEl = document.createElement('div');
    heartEl.textContent = heart;
    heartEl.style.cssText = `
      position: absolute;
      font-size: 2.5rem;
      animation: rotateHeart 4s linear infinite;
      animation-delay: ${index * 0.5}s;
      ${Object.entries(positions[index]).map(([key, value]) => `${key}: ${value}`).join(';')};
      z-index: 1;
    `;
    container.appendChild(heartEl);
  });
  
  // Mover el botón existente al nuevo contenedor
  container.appendChild(startButton);
  
  // Agregar elementos al start screen
  startScreen.innerHTML = '';
  startScreen.appendChild(container);
  
  // Agregar fondo animado
  startScreen.style.background = 'linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4)';
  startScreen.style.backgroundSize = '200% 200%';
  startScreen.style.animation = 'gradientBG 10s ease infinite';
  
  // Crear estrellas brillantes
  for(let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation: twinkle ${Math.random() * 2 + 1}s ease-in-out infinite;
      opacity: ${Math.random() * 0.7 + 0.3};
      z-index: 0;
    `;
    startScreen.appendChild(star);
  }
  
  // Crear corazones flotantes con menor frecuencia
  setInterval(() => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 15 + 10}px;
      left: ${Math.random() * 100}vw;
      bottom: -20px;
      opacity: 0.4;
      animation: floatUp ${Math.random() * 3 + 4}s linear forwards;
      z-index: 0;
    `;
    startScreen.appendChild(heart);
    
    setTimeout(() => heart.remove(), 7000);
  }, 500);
}

// Llamar a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', createStartScreenDecorations);
