// Configuration des horaires
const schedules = {
  cimetiereToHippolyte: {
    schoolPeriod: ['06:19', '06:45', '07:18', '07:48'],
    vacation: ['06:19', '06:45', '07:18', '07:46']
  },
  hippolyteToCimetiere: {
    schoolPeriod: ['06:20', '06:53', '07:01', '07:21', '07:29', '08:01', '08:30', '09:12', '10:12', '10:43', '11:11', '11:39', '12:09', '12:30', '13:13', '13:38', '14:13', '14:42', '15:12', '15:42', '16:12', '16:29', '17:02', '17:35', '18:20', '18:46', '19:08', '19:35', '20:08', '20:35', '20:58'],
    vacation: ['06:20', '06:53', '07:29', '08:01', '08:30', '09:12', '10:12', '10:45', '11:11', '11:39', '12:09', '12:30', '13:13', '13:38', '14:13', '14:42', '15:12', '15:42', '16:12', '16:29', '17:02', '17:35', '18:20', '18:46', '19:08', '19:35', '20:08', '20:35', '20:58']
  }
};

// Périodes de vacances scolaires zone B
const vacationPeriods = [
  // 2024-2025
  { name: "Toussaint", start: new Date(2024, 9, 19), end: new Date(2024, 10, 3) },
  { name: "Noël", start: new Date(2024, 11, 21), end: new Date(2025, 0, 5) },
  { name: "Hiver", start: new Date(2025, 1, 8), end: new Date(2025, 1, 23) },
  { name: "Printemps", start: new Date(2025, 3, 5), end: new Date(2025, 3, 21) },
  { name: "Pont Ascension", start: new Date(2025, 4, 28), end: new Date(2025, 5, 1) },
  { name: "Été", start: new Date(2025, 6, 5), end: new Date(2025, 8, 1) },
  
  // 2025-2026
  { name: "Toussaint", start: new Date(2025, 9, 18), end: new Date(2025, 10, 2) },
  { name: "Noël", start: new Date(2025, 11, 20), end: new Date(2026, 0, 4) },
  { name: "Hiver", start: new Date(2026, 1, 7), end: new Date(2026, 1, 22) },
  { name: "Printemps", start: new Date(2026, 3, 4), end: new Date(2026, 3, 19) },
  { name: "Pont Ascension", start: new Date(2026, 4, 13), end: new Date(2026, 4, 17) },
  { name: "Été", start: new Date(2026, 6, 4), end: new Date(2026, 8, 1) }
];

// Jours fériés
const holidays = [
  // 2024-2025
  { name: "Toussaint", date: new Date(2024, 10, 1) },
  { name: "Armistice", date: new Date(2024, 10, 11) },
  { name: "Noël", date: new Date(2024, 11, 25) },
  { name: "Jour de l'An", date: new Date(2025, 0, 1) },
  { name: "Lundi de Pâques", date: new Date(2025, 3, 21) },
  { name: "Fête du Travail", date: new Date(2025, 4, 1) },
  { name: "Victoire 1945", date: new Date(2025, 4, 8) },
  { name: "Ascension", date: new Date(2025, 4, 29) },
  { name: "Pont de l'Ascension", date: new Date(2025, 4, 30) },
  { name: "Lundi de Pentecôte", date: new Date(2025, 5, 9) },
  { name: "Fête Nationale", date: new Date(2025, 6, 14) },
  { name: "Assomption", date: new Date(2025, 7, 15) },
  
  // 2025-2026
  { name: "Toussaint", date: new Date(2025, 10, 1) },
  { name: "Armistice", date: new Date(2025, 10, 11) },
  { name: "Noël", date: new Date(2025, 11, 25) },
  { name: "Jour de l'An", date: new Date(2026, 0, 1) },
  { name: "Lundi de Pâques", date: new Date(2026, 3, 6) },
  { name: "Fête du Travail", date: new Date(2026, 4, 1) },
  { name: "Victoire 1945", date: new Date(2026, 4, 8) },
  { name: "Ascension", date: new Date(2026, 4, 14) },
  { name: "Pont de l'Ascension", date: new Date(2026, 4, 15) },
  { name: "Lundi de Pentecôte", date: new Date(2026, 4, 25) },
  { name: "Fête Nationale", date: new Date(2026, 6, 14) },
  { name: "Assomption", date: new Date(2026, 7, 15) }
];

// Initialisation des variables d'état
let currentDirection = 'cimetiereToHippolyte';
let isSchoolPeriod = true;
let currentTime = new Date();

// Éléments DOM
const currentTimeElement = document.getElementById('current-time');
const periodDisplayElement = document.getElementById('period-display');
const togglePeriodButton = document.getElementById('toggle-period');
const directionDisplayElement = document.getElementById('direction-display');
const toggleDirectionButton = document.getElementById('toggle-direction');
const departureDisplayElement = document.getElementById('departure-display');
const nextBusElement = document.getElementById('next-bus');
const waitTimeElement = document.getElementById('wait-time');
const adjustedTimeElement = document.getElementById('adjusted-time');
const delayInfoElement = document.getElementById('delay-info');
const statusIndicatorElement = document.getElementById('status-indicator');
const schedulesContainerElement = document.getElementById('schedules-container');
const lineInfoElement = document.getElementById('line-info');

// Mettre à jour l'heure actuelle
function updateCurrentTime() {
  currentTime = new Date();
  currentTimeElement.textContent = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Vérifier si c'est une période de vacances ou un jour férié
function checkIfVacation() {
  const today = new Date();
  
  // Vérifier si nous sommes dans une période de vacances
  for (const period of vacationPeriods) {
    if (today >= period.start && today <= period.end) {
      isSchoolPeriod = false;
      periodDisplayElement.textContent = `Vacances de ${period.name}`;
      return;
    }
  }
  
  // Vérifier si nous sommes un jour férié
  for (const holiday of holidays) {
    if (holiday.date.getDate() === today.getDate() && 
        holiday.date.getMonth() === today.getMonth() && 
        holiday.date.getFullYear() === today.getFullYear()) {
      isSchoolPeriod = false;
      periodDisplayElement.textContent = `Jour férié: ${holiday.name}`;
      return;
    }
  }
  
  // Vérifier si c'est le weekend
  const dayOfWeek = today.getDay();
  if (dayOfWeek === 0) {
    isSchoolPeriod = false;
    periodDisplayElement.textContent = "Dimanche";
    return;
  }
  if (dayOfWeek === 6) {
    isSchoolPeriod = false;
    periodDisplayElement.textContent = "Samedi";
    return;
  }
  
  // Si aucune des conditions ci-dessus n'est remplie, c'est une période scolaire
  isSchoolPeriod = true;
  periodDisplayElement.textContent = "Période scolaire";
}

// Simulation de données en temps réel
function simulateRealTimeData(direction) {
  // Retarder les bus depuis Cimetière Nord, avancer ceux depuis Hippolyte Bottier
  let delay;
  if (direction === 'cimetiereToHippolyte') {
    delay = Math.floor(Math.random() * 6); // 0 à 5 minutes de retard
  } else {
    delay = Math.floor(Math.random() * 5) - 2; // -2 à +2 minutes
  }
  
  let status, statusColor;
  
  if (delay === 0) {
    status = "À l'heure";
    statusColor = "status-green";
  } else if (delay < 0) {
    status = "En avance";
    statusColor = "status-blue";
  } else if (delay <= 3) {
    status = "Léger retard";
    statusColor = "status-yellow";
  } else {
    status = "Retard";
    statusColor = "status-red";
  }
  
  return { 
    delay, 
    status, 
    statusColor,
    delayText: delay === 0 ? "" : delay < 0 ? `${Math.abs(delay)} min` : `+${delay} min`
  };
}

// Obtenir le prochain bus
function getNextBus() {
  const currentSchedules = isSchoolPeriod 
    ? schedules[currentDirection].schoolPeriod 
    : schedules[currentDirection].vacation;
  
  const now = currentTime;
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeValue = currentHour * 60 + currentMinute;
  
  let nextBusTime = null;
  let waitTime = Infinity;
  let waitTimeInMinutes = 0;
  
  // Rechercher le prochain bus
  for (const time of currentSchedules) {
    const [hours, minutes] = time.split(':').map(Number);
    const busTimeValue = hours * 60 + minutes;
    
    if (busTimeValue >= currentTimeValue && busTimeValue - currentTimeValue < waitTime) {
      nextBusTime = time;
      waitTime = busTimeValue - currentTimeValue;
      waitTimeInMinutes = waitTime;
    }
  }
  
  if (nextBusTime === null) {
    nextBusElement.textContent = "Plus de bus aujourd'hui";
    waitTimeElement.textContent = "-";
    adjustedTimeElement.textContent = "-";
    delayInfoElement.textContent = "";
    statusIndicatorElement.className = "status-indicator";
    
    // Mettre à jour les horaires de la journée
    updateSchedules(currentSchedules, null);
    return;
  }
  
  // Obtenir les données en temps réel
  const realTimeInfo = simulateRealTimeData(currentDirection);
  
  // Ajuster le temps d'attente en fonction du délai
  let adjustedWaitTimeInMinutes = waitTimeInMinutes + realTimeInfo.delay;
  if (adjustedWaitTimeInMinutes < 0) adjustedWaitTimeInMinutes = 0;
  
  // Mettre à jour l'interface
  nextBusElement.textContent = nextBusTime;
  waitTimeElement.textContent = `${waitTimeInMinutes} min`;
  adjustedTimeElement.textContent = `${adjustedWaitTimeInMinutes} min`;
  delayInfoElement.textContent = realTimeInfo.delayText;
  statusIndicatorElement.className = `status-indicator ${realTimeInfo.statusColor}`;
  
  // Mettre à jour les horaires de la journée
  updateSchedules(currentSchedules, nextBusTime);
}

// Mettre à jour l'affichage des horaires
function updateSchedules(schedules, nextBusTime) {
  schedulesContainerElement.innerHTML = '';
  
  schedules.forEach(time => {
    const scheduleItem = document.createElement('div');
    scheduleItem.className = `schedule-item ${time === nextBusTime ? 'active' : ''}`;
    scheduleItem.textContent = time;
    schedulesContainerElement.appendChild(scheduleItem);
  });
}

// Changer la direction
function toggleDirection() {
  currentDirection = currentDirection === 'cimetiereToHippolyte' ? 'hippolyteToCimetiere' : 'cimetiereToHippolyte';
  
  if (currentDirection === 'cimetiereToHippolyte') {
    directionDisplayElement.textContent = 'Cimetière Nord → Hippolyte Bottier';
    departureDisplayElement.textContent = 'Départ: Arrêt Cimetière Nord';
    lineInfoElement.textContent = 'Ligne 3 - Cimetière Nord → Hippolyte Bottier';
  } else {
    directionDisplayElement.textContent = 'Hippolyte Bottier → Cimetière Nord';
    departureDisplayElement.textContent = 'Départ: Arrêt Hippolyte Bottier';
    lineInfoElement.textContent = 'Ligne 3 - Hippolyte Bottier → Cimetière Nord';
  }
  
  // Mettre à jour les informations
  getNextBus();
}

// Changer la période (scolaire/vacances)
function togglePeriod() {
  isSchoolPeriod = !isSchoolPeriod;
  periodDisplayElement.textContent = isSchoolPeriod ? 'Période scolaire' : 'Vacances / Samedi';
  getNextBus();
}

// Initialisation
function init() {
  // Mettre à jour l'heure
  updateCurrentTime();
  setInterval(updateCurrentTime, 60000); // Mettre à jour toutes les minutes
  
  // Vérifier le type de période
  checkIfVacation();
  
  // Configurer les événements
  toggleDirectionButton.addEventListener('click', toggleDirection);
  togglePeriodButton.addEventListener('click', togglePeriod);
  
  // Obtenir les horaires des bus
  getNextBus();
  
  // Mettre à jour les horaires régulièrement
  setInterval(getNextBus, 30000); // Mettre à jour toutes les 30 secondes
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', init);