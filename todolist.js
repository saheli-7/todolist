var globalDB = [];
var allRecords = [];


function initializeDB(){
    loaddata();
}
function toggleArrowUp(event){
    console.log("Hello");
    $(event).removeClass('fa-chevron-up').addClass('fa-chevron-down');
    $(event).parent().next().hide();
    $(event).attr('onclick','toggleArrowDown(this)');
}
function toggleArrowDown(event){
    console.log("Hello");
    $(event).removeClass('fa-chevron-down').addClass('fa-chevron-up');
    $(event).parent().next().show();
    $(event).attr('onclick','toggleArrowUp(this)');
}

function textCount(event, totalCharacters){
    console.log("Checking");
    var remaining = totalCharacters-$(event).val().length;
    $(event).nextAll()[1].innerHTML = remaining + ' / ' + totalCharacters + ' Characters left';
}

function addData(event){
    var chooseDate = $(event).prevAll()[18].value;
    var eventName = $(event).prevAll()[15].value;
    var startdate = $(event).prevAll()[10].value;
    var enddate = $(event).prevAll()[7].value;
    var description = $(event).prevAll()[4].value;

    if(enddate<=startdate){
        alert('Select correct Start time and End time.');
        return;
    }

    var singleRecord = [];
    singleRecord.push(chooseDate);
    singleRecord.push(eventName);
    singleRecord.push(startdate);
    singleRecord.push(enddate);
    singleRecord.push(description);

    globalDB.push(singleRecord);

    // Session Storage
    var allRecord = [];  // Load Previous Data + Add New Data (singleRecord)
    try{
        var prevRecord = sessionStorage.getItem('Record').split(',');
        allRecord.push(prevRecord);
    }
    catch(err){

    }
    allRecord.push(singleRecord);
    sessionStorage.setItem("Record", allRecord);


    loaddata();

}

function loaddata(){
    var x = sessionStorage.getItem('Record').split(',');
    if(x.length % 5 !=0)
        x.splice(0,1);
    if(x.length==0){
            $('#boxContainer').html('No records found.');
            return;
        }
    allRecords = [];
    for( let i=0; i<x.length; i+=5){
        allRecords.push(x.slice(i, i+5));
    }
    console.log(allRecords);

    var boxValue='';
    

    for(let i=0; i<allRecords.length; i++){
        var eventDate     = allRecords[i][0];
        var eventName     = allRecords[i][1];
        var startDate     = allRecords[i][2];
        var endDate       = allRecords[i][3];
        var description   = allRecords[i][4];

        boxValue += '<div class="box"><div class="delete" onclick="deleteCard('+i+')"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" /></svg></div><div class="event-time"><h4>'+
        eventDate + ' | ' + startDate + '-' + endDate
        +'</h4></div><div class="eventname"><font>'+eventName+'</font></div><p class="downarrow"><i class=\'fas fa-chevron-up\' style=\'font-size:24px\' onclick="toggleArrowUp(this)"></i></p><p class="description">'+description+'</p></div>';
        console.log(boxValue);
        
        
        $('#boxContainer').html(boxValue);

    }
}


function deleteCard(index){
    allRecords.splice(index,1);
    $('#boxContainer').html('');
    sessionStorage.setItem("Record", allRecords);
    if(allRecords.length!=0)
        loaddata();
    else    
        $('#boxContainer').html('No records found.');
}

function dateFilter(dates) {
    var y = $(dates).prev().val(); // Getting the selected date
    var filteredRecords = allRecords.filter(record => record[0] == y); // Filtering records by selected date

    if (filteredRecords.length == 0) {
        $('#boxContainer').html('No records found for selected date.');
        return;
    }

    var boxValue = '';

    for (let i = 0; i < filteredRecords.length; i++) {
        var eventDate = filteredRecords[i][0];
        var eventName = filteredRecords[i][1];
        var startDate = filteredRecords[i][2];
        var endDate = filteredRecords[i][3];
        var description = filteredRecords[i][4];

        boxValue += '<div class="box"><div class="delete" onclick="deleteCard(' + i + ')"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" /></svg></div><div class="event-time"><h4>' +
            eventDate + ' | ' + startDate + '-' + endDate +
            '</h4></div><div class="eventname"><font>' + eventName + '</font></div><p class="downarrow"><i class=\'fas fa-chevron-up\' style=\'font-size:24px\' onclick="toggleArrowUp(this)"></i></p><p class="description">' + description + '</p></div>';
        console.log(boxValue);

        $('#boxContainer').html(boxValue);
    }
}
function refreshPage() {
    location.reload();
}