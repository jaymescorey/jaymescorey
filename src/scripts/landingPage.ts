function scrambleElement(element: Element, finalText: string, delay: number): void {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ?!#$%*>';
  let progress = 0;

  window.setTimeout(() => {
    const intervalId = window.setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((character: string, index: number) => {
          if (character === ' ' || character === '.') {
            return character;
          }

          return index < Math.floor(progress)
            ? finalText[index]
            : chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      progress += 0.5;

      if (progress >= finalText.length) {
        element.textContent = finalText;
        window.clearInterval(intervalId);
      }
    }, 40);
  }, delay);
}

export default function initLandingPage(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  document.querySelectorAll('.hero .reveal').forEach((element) => {
    window.setTimeout(() => element.classList.add('visible'), 80);
  });

  window.addEventListener('load', () => {
    const lineOne = document.querySelector('h1 .line-1');
    const lineTwo = document.querySelector('h1 .line-2');

    if (lineOne) {
      scrambleElement(lineOne, 'Big Ideas.', 300);
    }

    if (lineTwo) {
      scrambleElement(lineTwo, 'Built Ugly.', 800);
    }
  });

  document.getElementById('offer-capture')?.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = '/thank-you';
  });
}