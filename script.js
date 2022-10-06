
var timeDisplay = $('#currentDay');
var timeBlockEL=$(`.time-block`);
var taskblock = $(".taskBlock");


function displayTime(){
    var now = moment().format('MMM, DD, YYYY hh:mm:ss')
    timeDisplay.text(now)
}
setInterval(displayTime, 1000)


var taskArry = [];
var currHr=moment().format("H");
// timeblocks color scheme depending on time
function colorTimeBlocks(){
    timeBlockEL.each(function(){
        var currBlock=$(this);
        console.log(currBlock)
        var currBlockHr=parseInt(currBlock.attr("data-hour"))
        if(currBlockHr == currHr){
            currBlock.addClass("present").removeClass("past future")
        }
        if(currBlockHr< currHr){
            currBlock.addClass("past").removeClass("present future")
        }
        if(currBlock > currHr){
            currBlock.addClass("future").removeClass("past present")
        }
    })

}

colorTimeBlocks()





