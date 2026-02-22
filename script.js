// ===================================
// SUPER PREMIUM SOIL MONITORING DASHBOARD
// Industrial IoT with Gauge & AI
// ===================================

var channelID = "3272999";
var readAPIKey = "F4XGBO1KHZ8KR6T4";

// ===== Uptime Counter =====
var uptimeSeconds = 0;
setInterval(function() {
  uptimeSeconds++;
  var hours = Math.floor(uptimeSeconds / 3600);
  var minutes = Math.floor((uptimeSeconds % 3600) / 60);
  var seconds = uptimeSeconds % 60;
  var el = document.getElementById('uptime');
  if(el){
    el.textContent = String(hours).padStart(2,'0') + ':' + String(minutes).padStart(2,'0') + ':' + String(seconds).padStart(2,'0');
  }
}, 1000);

// ===== Clock Function =====
function updateClock(){
  var now = new Date();
  var el = document.getElementById('clock');
  if(el){
    el.textContent = String(now.getHours()).padStart(2,'0') + ':' + 
                    String(now.getMinutes()).padStart(2,'0') + ':' + 
                    String(now.getSeconds()).padStart(2,'0');
  }
}
updateClock();
setInterval(updateClock, 1000);

// ===== Custom Gauge Display =====
var phCurrentValue = 7;

function initGauge(){
  updateGaugeDisplay(7);
}

function updateGaugeDisplay(val){
  phCurrentValue = val;
  var valEl = document.getElementById('phValue');
  if(valEl){
    valEl.textContent = val.toFixed(1);
  }
  
  var statusBadge = document.getElementById('phStatus');
  if(statusBadge){
    statusBadge.className = 'status-badge';
    if(val < 6){
      statusBadge.textContent = 'ASAM';
      statusBadge.classList.add('asam');
    }else if(val > 8){
      statusBadge.textContent = 'BASA';
      statusBadge.classList.add('basa');
    }else{
      statusBadge.textContent = 'NORMAL';
    }
  }
  
  // Update AI range marker
  var marker = document.querySelector('.range-marker');
  if(marker){
    var percent = Math.min(100, Math.max(0, (val / 14) * 100));
    marker.style.left = percent + '%';
  }
}

initGauge();

// ===== AI Recommendation System =====
function getAIRecommendation(ph){
  if(ph < 6){
    return {
      status: 'ASAM',
      recommendation: 'Tanah terlalu asam! Gunakan kapur pertanian (dolomit) untuk menetralisir pH.',
      fertilizers: ['Dolomit', 'Kapur Pertanian', 'Abu Kayu']
    };
  }else if(ph > 8){
    return {
      status: 'BASA',
      recommendation: 'Tanah terlalu basa! Tambahkan bahan organik seperti kompos untuk menurunkan pH.',
      fertilizers: ['Kompos', 'Gambut', 'Sulfur']
    };
  }else{
    return {
      status: 'NORMAL',
      recommendation: 'pH tanah ideal untuk pertumbuhan tanaman. Pertahankan dengan pemupukan rutin.',
      fertilizers: ['NPK', 'Urea', 'Ponska']
    };
  }
}

function updateAIRecommendation(ph){
  var ai = getAIRecommendation(ph);
  
  var recEl = document.getElementById('aiRecommendation');
  if(recEl){
    recEl.textContent = ai.recommendation;
  }
  
  var fert1 = document.getElementById('fert1');
  var fert2 = document.getElementById('fert2');
  var fert3 = document.getElementById('fert3');
  
  if(fert1) fert1.textContent = ai.fertilizers[0];
  if(fert2) fert2.textContent = ai.fertilizers[1];
  if(fert3) fert3.textContent = ai.fertilizers[2];
}

// ===== Pump Control =====
var pumpState = false;

function controlPump(turnOn){
  pumpState = turnOn;
  var now = new Date();
  var timeStr = now.toLocaleTimeString('id-ID');
  
  var pumpStatusEl = document.getElementById('pumpStatus');
  if(pumpStatusEl){
    pumpStatusEl.textContent = turnOn ? 'ON' : 'OFF';
    pumpStatusEl.className = 'status-value ' + (turnOn ? 'on' : '');
  }
  
  var powerEl = document.getElementById('pumpPower');
  if(powerEl){
    powerEl.className = 'power-indicator ' + (turnOn ? 'active' : '');
  }
  
  var lastUpdateEl = document.getElementById('pumpLastUpdate');
  if(lastUpdateEl){
    lastUpdateEl.textContent = timeStr;
  }
  
  console.log('Pump ' + (turnOn ? 'ON' : 'OFF') + ' at ' + timeStr);
}

// ===== Update Industrial Stats =====
function updateIndustrialStats(dataPoints){
  var dpEl = document.getElementById('dataPoints');
  if(dpEl){
    dpEl.textContent = dataPoints || Math.floor(Math.random() * 1000 + 100);
  }
  
  var pwrEl = document.getElementById('powerUsage');
  if(pwrEl){
    pwrEl.textContent = Math.floor(Math.random() * 50 + 10) + 'W';
  }
  
  var sigEl = document.getElementById('signalStrength');
  if(sigEl){
    sigEl.textContent = Math.floor(Math.random() * 20 - 80) + ' dBm';
  }
}

// ===== Load Data =====
function loadData(){
  // Use simulated data for demo
  simulateData();
}

function simulateData(){
  var ph = Math.random() * 4 + 5; // 5-9
  var moist = Math.floor(Math.random() * 60 + 30);
  var temp = Math.random() * 15 + 20;
  
  updateGaugeDisplay(ph);
  updateAIRecommendation(ph);
  
  var moistEl = document.getElementById('moist');
  var moistProg = document.getElementById('moistProgress');
  if(moistEl) moistEl.textContent = moist;
  if(moistProg) moistProg.style.width = moist + '%';
  
  var tempEl = document.getElementById('temp');
  var tempProg = document.getElementById('tempProgress');
  if(tempEl) tempEl.textContent = temp.toFixed(1);
  if(tempProg) tempProg.style.width = (temp / 50 * 100) + '%';
  
  updateIndustrialStats(Math.floor(Math.random() * 1000 + 100));
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function(){
  console.log('SoilNex Super Premium Dashboard Initialized');
  loadData();
  
  // Update every 5 seconds
  setInterval(loadData, 5000);
});

console.log('SoilNex Dashboard Ready');
