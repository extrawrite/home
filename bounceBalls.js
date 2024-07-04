const balls = document.querySelectorAll(".blurball");
// const header = document.querySelector('main');

class Ball {
  constructor(element, speedX, speedY) {
    this.element = element;

    this.posX = Math.random() * (window.innerWidth - this.element.clientWidth);
    this.posY =
      Math.random() * (window.innerHeight - this.element.clientHeight);

    this.velocityX = speedX || 2.5; // Default speedX
    this.velocityY = speedY || 2.5; // Default speedY
  }

  move() {
    this.posX += this.velocityX;
    this.posY += this.velocityY;

    // Bounce off the left or right edge
    if (
      this.posX + this.element.clientWidth >= window.innerWidth ||
      this.posX <= 0
    ) {
      this.velocityX = -this.velocityX;
    }

    // Bounce off the top or bottom edge
    if (
      this.posY + this.element.clientHeight >= window.innerHeight ||
      this.posY <= 0
    ) {
      this.velocityY = -this.velocityY;
    }

    this.element.style.left = this.posX + "px";
    this.element.style.top = this.posY + "px";
  }
}

// Define speeds and spawn bias for each ball
const ballData = [
  { speedX: 10, speedY: 2.5 },
  { speedX: 2.5, speedY: 10 }, 
  { speedX: 5, speedY: 1.5 },
  { speedX: 1.5, speedY: 5 }, 
  // Rest will have default speedX and speedY
];

const ballObjects = Array.from(balls).map((ball, index) => {
  const { speedX, speedY } = ballData[index] || {};
  return new Ball(ball, speedX, speedY);
});

function animate() {
  ballObjects.forEach((ball) => ball.move());
  requestAnimationFrame(animate);
}

animate();

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

// const balls = document.querySelectorAll('.blurball');
// const header = document.querySelector('header');

// class Ball {
//     constructor(element, speedX, speedY, spawnBias) {
//         this.element = element;
//         this.radius = this.element.clientWidth / 2;

//         // Determine the spawn position based on the bias
//         this.spawn(spawnBias);

//         this.velocityX = speedX || 2; // Default speedX
//         this.velocityY = speedY || 1; // Default speedY
//     }

//     spawn(spawnBias) {
//         let overlap;
//         do {
//             switch (spawnBias) {
//                 case 'left':
//                     this.posX = Math.random() * (window.innerWidth / 2);
//                     this.posY = Math.random() * window.innerHeight;
//                     break;
//                 case 'right':
//                     this.posX = window.innerWidth / 2 + Math.random() * (window.innerWidth / 2 - this.element.clientWidth);
//                     this.posY = Math.random() * window.innerHeight;
//                     break;
//                 case 'top':
//                     this.posX = Math.random() * window.innerWidth;
//                     this.posY = Math.random() * (window.innerHeight / 2);
//                     break;
//                 case 'bottom':
//                     this.posX = Math.random() * window.innerWidth;
//                     this.posY = window.innerHeight / 2 + Math.random() * (window.innerHeight / 2 - this.element.clientHeight);
//                     break;
//                 default:
//                     this.posX = Math.random() * (window.innerWidth - this.element.clientWidth);
//                     this.posY = Math.random() * (window.innerHeight - this.element.clientHeight);
//                     break;
//             }

//             overlap = ballObjects.some(ball => this.isOverlapping(ball));
//         } while (overlap);

//         this.element.style.left = this.posX + 'px';
//         this.element.style.top = this.posY + 'px';
//     }

//     isOverlapping(otherBall) {
//         const dx = this.posX - otherBall.posX;
//         const dy = this.posY - otherBall.posY;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         return distance < this.radius + otherBall.radius;
//     }

//     move() {
//         this.posX += this.velocityX;
//         this.posY += this.velocityY;

//         // Bounce off the left or right edge
//         if (this.posX + this.element.clientWidth >= window.innerWidth || this.posX <= 0) {
//             this.velocityX = -this.velocityX;
//         }

//         // Bounce off the top or bottom edge
//         if (this.posY + this.element.clientHeight >= window.innerHeight || this.posY <= 0) {
//             this.velocityY = -this.velocityY;
//         }

//         this.element.style.left = this.posX + 'px';
//         this.element.style.top = this.posY + 'px';
//     }

//     checkCollision(otherBall) {
//         if (this.isOverlapping(otherBall)) {
//             this.resolveCollision(otherBall);
//         }
//     }

//     resolveCollision(otherBall) {
//         const dx = this.posX - otherBall.posX;
//         const dy = this.posY - otherBall.posY;
//         const distance = Math.sqrt(dx * dx + dy * dy);

//         if (distance === 0) return; // Prevent division by zero

//         const overlap = (this.radius + otherBall.radius) - distance;
//         const smallerBall = this.radius < otherBall.radius ? this : otherBall;
//         const largerBall = this === smallerBall ? otherBall : this;

//         // Separate the overlapping balls by pushing the smaller ball away
//         const separationX = overlap * (dx / distance) / 2;
//         const separationY = overlap * (dy / distance) / 2;

//         smallerBall.posX -= separationX;
//         smallerBall.posY -= separationY;
//         largerBall.posX += separationX;
//         largerBall.posY += separationY;

//         // Calculate normal and tangent vectors
//         const normalX = dx / distance;
//         const normalY = dy / distance;

//         const tangentX = -normalY;
//         const tangentY = normalX;

//         // Calculate relative velocity
//         const relativeVelocityX = this.velocityX - otherBall.velocityX;
//         const relativeVelocityY = this.velocityY - otherBall.velocityY;

//         // Calculate velocity components along the normal and tangent directions
//         const normalVelocity = relativeVelocityX * normalX + relativeVelocityY * normalY;
//         const tangentVelocity = relativeVelocityX * tangentX + relativeVelocityY * tangentY;

//         // Perform collision response along the normal direction
//         if (normalVelocity > 0) return; // Prevent balls from sticking together

//         const combinedMass = 1; // Assuming equal mass for simplicity
//         const impulse = 2 * normalVelocity / combinedMass;

//         this.velocityX -= impulse * normalX;
//         this.velocityY -= impulse * normalY;

//         otherBall.velocityX += impulse * normalX;
//         otherBall.velocityY += impulse * normalY;
//     }
// }

// // Define speeds and spawn bias for each ball
// const ballData = [
//     { speedX: 5, speedY: 2.5, spawnBias: 'left' },    // Ball 1
//     { speedX: 4, speedY: 2, spawnBias: 'right' },     // Ball 2
//     { speedX: 3, speedY: 1.5, spawnBias: 'top' },     // Ball 3
//     { speedX: 2, speedY: 1, spawnBias: 'bottom' },    // Ball 4
//     // Add more balls as needed
// ];

// // Create Ball objects with random positions, assigned speeds, and spawn bias
// const ballObjects = Array.from(balls).map((ball, index) => {
//     const { speedX, speedY, spawnBias } = ballData[index] || {};
//     return new Ball(ball, speedX, speedY, spawnBias);
// });

// function animate() {
//     ballObjects.forEach(ball => {
//         ball.move();
//         ballObjects.forEach(otherBall => {
//             if (ball !== otherBall) {
//                 ball.checkCollision(otherBall);
//             }
//         });
//     });
//     requestAnimationFrame(animate);
// }

// function startAnimation() {
//     animate();
// }

// // Check if header is in view and start animation
// function checkHeaderInView() {
//     const headerRect = header.getBoundingClientRect();
//     const windowHeight = window.innerHeight;

//     // If header is in view, start animation
//     if (headerRect.bottom >= 0 && headerRect.top <= windowHeight) {
//         startAnimation();
//         // Remove scroll event listener once animation starts
//         window.removeEventListener('scroll', checkHeaderInView);
//     }
// }

// // Listen for scroll event to check when header is in view
// window.addEventListener('scroll', checkHeaderInView);

// // Initially check if header is already in view on page load
// checkHeaderInView();
