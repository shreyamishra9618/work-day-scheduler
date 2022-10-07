var timeDisplay = $('#currentDay');
var $timeBlockEL=$(`.time-block`);
var $taskblock = $(".taskBlock");
function displayTime(){
    var now = moment().format('MMM, DD, YYYY hh:mm:ss')
    timeDisplay.text(now)
}
//  to set timer on below header
setInterval(displayTime, 1000)
var taskArry = [];
var currHr=moment().format("H");
//  to insert contents for each block element
function insertTasks(){

$timeBlockEL.each(function(){
    var $thiscurrBlock =$(this);
    console.log("Curr block=="+$thiscurrBlock)
    var currBlockHr=parseInt($thiscurrBlock.attr("data-hour"))

    var taskItems={
        hour: currBlockHr,
        text:"",
    }
    taskArry.push(taskItems)
    console.log(taskArry)
})


localStorage.setItem("task", JSON.stringify(taskArry))
// console.log(taskArry)

}



// timeblocks color scheme depending on time
function colorTimeBlocks(){
    $timeBlockEL.each(function(){
        var $thiscurrBlock=$(this);
        console.log("Cuur colo b "+$thiscurrBlock)
        var currBlockHr = parseInt($thiscurrBlock.attr("data-hour"))
        console.log("fetched hr "+ currBlockHr)

        if(currBlockHr == currHr){
            $thiscurrBlock.addClass("present").removeClass("past future");
           // currBlock.attr("backgroundColor","red")
        }
        if(currBlockHr < currHr){
            $thiscurrBlock.addClass("past").removeClass("present future");
        }
        if(currBlockHr > currHr){
            $thiscurrBlock.addClass("future").removeClass("past present");
        }
    });

}



function renderTasks(){
    taskArry=localStorage.getItem("task")
    taskArry=JSON.parse(taskArry)
    for( var i=0; i< taskArry.length; i++){
        var itemHour = taskArry[i].hour;
        var itemText= taskArry[i].text
        $("[data-hour=" + itemHour +"]").children("textarea").val(itemText)
    }
    console.log(taskArry)
}
// saving it in local storage
function saveArray(){
 
    var $thiscurrBlock =$(this).parent();
    var hrToUpdt =$(this).parent().attr("data-hour")
    var itemToAdd =(($(this).parent()).children("textarea")).val()
    for(var j=0; j < taskArry.length; j++){
        if(taskArry[j].hour == hrToUpdt){
            taskArry[j].text=itemToAdd;
        }
    }
   localStorage.setItem("task", JSON.stringify(taskArry))
   renderTasks()
}
//  Main Function
$(document).ready(function(){
   
    colorTimeBlocks()
    if(!localStorage.getItem("task")){
        insertTasks()
    }
    
   
    renderTasks()
$taskblock.on("click","button",saveArray)

})