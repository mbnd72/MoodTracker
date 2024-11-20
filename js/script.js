// Get today's day of the week
const today = new Date().getDay();
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Load the week's moods from local storage or initialize as empty
let weeklyMoods = JSON.parse(localStorage.getItem("weeklyMoods")) || Array(7).fill({ mood: "", note: "" });
displayWeek();

function saveMood() {
  const mood = document.getElementById("mood").value;
  const note = document.getElementById("note").value;

  // Update today's mood and note in the weekly moods array
  weeklyMoods[today] = { mood, note };
  localStorage.setItem("weeklyMoods", JSON.stringify(weeklyMoods));

  // Clear the input fields
  document.getElementById("note").value = "";
  
  displayWeek();
}

function displayWeek() {
  const weekDisplay = document.getElementById("week-display");
  weekDisplay.innerHTML = "";

  // Create each day's display in the week
  weekDays.forEach((day, index) => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    const mood = weeklyMoods[index].mood;
    const moodIcon = getMoodIcon(mood);

    dayDiv.innerHTML = `<strong>${day}</strong><br>${moodIcon}`;
    weekDisplay.appendChild(dayDiv);
  });
}

function getMoodIcon(mood) {
  switch (mood) {
    case "happy": return "😊";
    case "sad": return "😢";
    case "excited": return "🤩";
    case "stressed": return "😖";
    default: return "⬜"; // Blank for days with no mood saved
  }
}
