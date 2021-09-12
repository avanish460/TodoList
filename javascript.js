let a;
let date;
let time;
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

setInterval(() => {
  a = new Date();
  date = a.toLocaleString(undefined, options);
  time = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
  document.getElementById("time").innerHTML = time +" "+ date;
}, 1000);

function getAndUpdate() {
  var tit = document.getElementById("title").value;
  var desc = document.getElementById("description").value;
  var start = document.getElementById("starting").value;
  var end = document.getElementById("ending").value;
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc, start, end]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc, start, end]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
  location.reload();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  //populate the table
  let tableBody = document.getElementById("tablebody");
  let Str = "";

  itemJsonArray.forEach((element, index) => {
    Str += `
    <tr>
          <th scope="row">${index + 1}</th>
          <td>${element[0]}</td>
          <td>${element[1]}</td>
          <td>${element[2]} to ${element[3]}</td>
          <td><button id="btn" onclick="itemDeleted(${index})" style="background-color: rgba(0, 0, 255, 0.849); width:auto;">Completed</button></td>
        </tr>`;
  });

  tableBody.innerHTML = Str;
}
var add = document.getElementById("btn");
add.addEventListener("click", getAndUpdate);
var removeAll = document.getElementById("remove");
removeAll.addEventListener("click", clearStorage);
update();

function itemDeleted(itemIndex) {
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  //Delete itemIndex element from the Array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

function clearStorage() {
  if (confirm("Do you really want to clear you list?")) {
    console.log("Clearing the storage");
    localStorage.clear();
    update();
  }
}

var alarmSound = new Audio();
		alarmSound.src = 'alarm.mp3';
		var alarmTimer;

		function setAlarm(button) {
      document.getElementById('alarmicon').src = "alarm_on_black_24dp.svg";
			var ms = document.getElementById('alarmTime').valueAsNumber;

      if (localStorage.getItem("itemsJson2") == null) {
        itemJsonArray_2 = [];
        itemJsonArray_2.push(ms);
        localStorage.setItem("itemsJson2", JSON.stringify(itemJsonArray_2));
      } else {
        itemJsonArrayStr_2 = localStorage.getItem("itemsJson2");
        itemJsonArray_2 = JSON.parse(itemJsonArrayStr_2);
        itemJsonArray_2.push(ms);
        localStorage.setItem("itemsJson2", JSON.stringify(itemJsonArray_2));
      }
        
			if(isNaN(itemJsonArray_2[0])) {
				alert('Invalid Date');
				return;
			}
    
			var alarm = new Date(itemJsonArray_2[0]);
			var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(),  alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
			
			var differenceInMs = alarmTime.getTime() - (new Date()).getTime();

			if(differenceInMs < 0) {
				alert('Specified time is already passed');
				return;
			}

			alarmTimer = setTimeout(initAlarm, differenceInMs);
			button.innerText = 'Cancel Alarm';
			button.setAttribute('onclick', 'cancelAlarm(this);');

      location.reload();
		};

		function cancelAlarm(button) {
      document.getElementById('alarmicon').src ="";
			clearTimeout(alarmTimer);
			button.innerText = 'Set Alarm';
			button.setAttribute('onclick', 'setAlarm(this);');

		};

		function initAlarm() {
			alarmSound.play();
			document.getElementById('alarmOptions').style.display = '';
      itemDeletedalarm(0);
		};
    
    function itemDeletedalarm(itemIndex) {
      itemJsonArrayStr_2 = localStorage.getItem("itemsJson2");
      itemJsonArray_2 = JSON.parse(itemJsonArrayStr_2);
      //Delete itemIndex element from the Array
      itemJsonArray_2.splice(itemIndex, 1);
      localStorage.setItem("itemsJson2", JSON.stringify(itemJsonArray_2));
      
    };

		function stopAlarm() {
      document.getElementById('alarmicon').src ="";
			alarmSound.pause();
			alarmSound.currentTime = 0;
			document.getElementById('alarmOptions').style.display = 'none';
			cancelAlarm(document.getElementById('alarmButton'));
		};

		function snooze() {
			stopAlarm();
			alarmTimer = setTimeout(initAlarm, 300000); // 5 * 60 * 1000 = 5 Minutes
		};
