
const apiKey = '9ac6834e315b4de4a2f03416250906';
const input = document.getElementById("locationInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("weatherResult");

button.addEventListener("click", () => {
  const location = input.value.trim();
  if (location !== "") {
    fetchWeather(location);
  }
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const location = input.value.trim();
    if (location !== "") {
      fetchWeather(location);
    }
  }
});

fetchWeather("Toronto");

async function fetchWeather(location) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
    const data = await response.json();

    const temp = data.current.temp_c;
    const description = data.current.condition.text.toLowerCase();
    const icon = data.current.condition.icon;

    result.innerHTML = `
      <h2>${location}</h2>
      <p>${temp}°C - ${description}</p>
      <img src="https:${icon}" alt="${description}" />
    `;

    updateBackground(description);
    updateEmojis(description);

  } catch (error) {
    result.innerHTML = `<p>Oops! Could not fetch weather for "${location}".</p>`;
  }
}

// Change Colors of the Baackground
function updateBackground(condition) {
  const body = document.body;

  if (condition.includes("sunny") || condition.includes("clear")) {
    body.style.background = "linear-gradient(to top, #fceabb, #f8b500)";
  } else if (condition.includes("cloud")) {
    body.style.background = "linear-gradient(to top, #d7d2cc, #304352)";
  } else if (condition.includes("rain")) {
    body.style.background = "linear-gradient(to top, #4e54c8, #8f94fb)";
  } else if (condition.includes("snow")) {
    body.style.background = "linear-gradient(to top, #e0eafc, #cfdef3)";
  } else {
    body.style.background = "linear-gradient(to top, #a1c4fd, #c2e9fb)";
  }
}

//  EMOJIS!! So it looks Funny
function updateEmojis(condition) {
  const container = document.getElementById("emojiBackground");
  container.innerHTML = "";

  let emojis = [];

  if (condition.includes("sunny") || condition.includes("clear")) {
    emojis = ["😎", "🌞", "🕶️"];
  } else if (condition.includes("cloud")) {
    emojis = ["🙄", "🌫️", "☁️"];
  } else if (condition.includes("rain")) {
    emojis = ["😩", "☔", "🌧️"];
  } else if (condition.includes("snow")) {
    emojis = ["🥶", "☃️", "❄️"];
  } else {
    emojis = ["🤔", "🌍", "📡"];
  }

  const columns = 8;
  const rows = 5;
  const total = columns * rows;

  for (let i = 0; i < total; i++) {
    const emoji = emojis[i % emojis.length];
    const span = document.createElement("span");
    span.textContent = emoji;

    const col = i % columns;
    const row = Math.floor(i / columns);

    const spacingX = 100 / columns;
    const spacingY = 100 / rows;

    span.style.top = `${row * spacingY + Math.random() * 5}%`;
    span.style.left = `${col * spacingX + Math.random() * 5}%`;
    span.style.position = "absolute";
    span.style.fontSize = `${Math.random() * 1.5 + 2.5}rem`;
    span.style.opacity = 0.2 + Math.random() * 0.3;
    span.style.animation = "floatEmoji 12s ease-in-out infinite";
    span.style.animationDelay = `${Math.random() * 4}s`;

    container.appendChild(span);
  }

}