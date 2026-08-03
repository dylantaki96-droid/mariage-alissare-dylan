const weddingDate = new Date("2027-05-21T14:45:00+02:00");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const distance = weddingDate.getTime() - now.getTime();

  if (distance <= 0) {
    daysElement.textContent = "000";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  const hourInMilliseconds = 1000 * 60 * 60;
  const minuteInMilliseconds = 1000 * 60;

  const days = Math.floor(
    distance / dayInMilliseconds
  );

  const hours = Math.floor(
    (distance % dayInMilliseconds) / hourInMilliseconds
  );

  const minutes = Math.floor(
    (distance % hourInMilliseconds) / minuteInMilliseconds
  );

  const seconds = Math.floor(
    (distance % minuteInMilliseconds) / 1000
  );

  daysElement.textContent = String(days).padStart(3, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}
