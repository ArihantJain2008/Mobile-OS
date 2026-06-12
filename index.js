
// ==========================
// SMALL TIME (status bar)
// ==========================

function updateTime() {
  const now = new Date();
  const timestring = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  document.getElementById('time').innerText = timestring;
}
updateTime();
setInterval(updateTime, 1000);

// ==========================
// BATTERY
// ==========================

function updateStatus(battery) {
  const statusLevel = Math.round(battery.level * 100);
  const chargingStatus = battery.charging ? "⚡" : "🔋";

  const levelbar = document.getElementById("level");
  levelbar.style.width = statusLevel + "%";

  if (statusLevel > 60) {
    levelbar.style.background = "limegreen";
  } else if (statusLevel > 40) {
    levelbar.style.background = "gold";
  } else {
    levelbar.style.background = "red";
  }

  document.getElementById("status").innerText = `${statusLevel}% ${chargingStatus}`;
}

navigator.getBattery().then(function (battery) {
  updateStatus(battery);
  battery.addEventListener("levelchange", () => updateStatus(battery));
  battery.addEventListener("chargingchange", () => updateStatus(battery));
});

// ==========================
// WIFI (simulate)
// ==========================

function updateWifi(strength) {
  const arcs = document.querySelectorAll(".wifi .arc");
  arcs.forEach((arc, index) => {
    arc.style.opacity = index < strength ? 1 : 0.2;
  });
}
let strength = 1;
setInterval(() => {
  updateWifi(strength);
  strength = strength % 3 + 1;
}, 2000);
updateWifi(3);

// ==========================
// BIG CLOCK + DATE
// ==========================

function updateBigTime() {
  const now = new Date();

  // Big time with seconds
  const timestring = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('big_time').innerText = timestring;

  // Date + Day
  const datestring = now.toLocaleDateString([], {
    weekday: 'long',   // e.g. Monday
    month: 'short',    // e.g. Sep
    day: 'numeric'     // e.g. 9
  });
  document.getElementById('date').innerText = datestring;
}
updateBigTime();
setInterval(updateBigTime, 1000);

// ==========================
// PHONE APP
// ==========================

function typeValue(value) {
  document.getElementById("number").value += value;
}
function clearValue() {
  document.getElementById("number").value = "";
}
function backspace() {
  let input = document.getElementById("number");
  input.value = input.value.slice(0, -1); 
}