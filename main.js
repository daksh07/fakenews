var fake = 0;
var real = 0;
var randomNum = 0;
var newsTitles=[];
var newsDescriptions=[];
var images = [];
var check=[];
var type=[];
var pent=0;
var ppol=0;
var psports=0;
var psci=0;
var pcrime=0;
var nent=0;
var npol=0;
var nsports=0;
var nsci=0;
var ncrime=0;
var lastNumber = 0;
var norep = [];
var count = 0;
var avg = 0;
$(document).ready(function() {
    getNews(returnRandom());
    $("#start").on('click',function(){
        randomNum= returnRandom();
        $(".begin").css('visibility', 'hidden');
        $(".container-main").css('visibility', 'visible');
        displayNews(randomNum); 
    });
    $("#real").on('click',function(){
        console.log("checking...");
        if(check[randomNum]=="true"){
            $("#ptext").text("Great Job!");
            $("#popup").css('visibility', 'visible');
            console.log("true");
            addCrime();
            addEnt();
            addPol();
            addSci();
            addSports();
        }
        else{
            $("#ptext").text("FAKEEE!");
            $("#popup").css('visibility', 'visible');
            console.log("false");
            negCrime();
            negEnt();
            negPol();
            negSci();
            negSports();
        }
    });
    $("#fake").on('click',function(){
        console.log("checking...");
        if(check[randomNum]=="false"){
            $("#ptext").text("Great work!");
            $("#popup").css('visibility', 'visible');
            console.log("true");
            addCrime();
            addEnt();
            addPol();
            addSci();
            addSports();
        }
        else{
            $("#ptext").text("Trust me it's REAL!");
            $("#popup").css('visibility', 'visible');
            console.log("false");
            negCrime();
            negEnt();
            negPol();
            negSci();
            negSports();
        }
    });
    $("#cont").on('click',function(){
       $("#popup").css('visibility','hidden');
        //randomNum = Math.floor(Math.random() * 10);
        randomNum= returnRandom();
        displayNews(randomNum);
        console.log(ppol);
        console.log(npol);
        console.log(randomNum);
    });
    $("#gen").on('click',function(){
        //link.href="#plotter";
        average();
        $(".more").css('visibility','visible');
        plot();
    });
});
function getNews(num){
    $.ajaxSetup({cache:false});
//        $.getJSON("https://newsapi.org/v1/articles?source=the-lad-bible&sortBy=latest&apiKey=8cf98117c49c42e7bbc75eddcc0bdfdb", function(json) {
//            for (var i=0 ; i< 2 ; i++){
//                newsTitles.push(json.articles[i].title);
//                newsDescriptions.push(json.articles[i].description);
//                images.push(json.articles[i].urlToImage);
//            }
//        });
//        $.getJSON("https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=8cf98117c49c42e7bbc75eddcc0bdfdb", function(json) {
//            for (var j=2 ; j< 4 ; j++){
//                newsTitles.push(json.articles[j].title);
//                newsDescriptions.push(json.articles[j].description);
//                images.push(json.articles[j].urlToImage);
//            }
//        });
        $.getJSON("/fake-news.json", function(json) {
            for (var k=0 ; k< 15 ; k++){
                newsTitles.push(json[k].title);
                newsDescriptions.push(json[k].description);
                images.push(json[k].urlToImage);
                check.push(json[k].check);
                type.push(json[k].type);
            }
        });
        console.log(newsTitles);
        console.log(newsDescriptions);
        console.log(check);
        console.log(type);
        $("#title").text(newsTitles[num]); $("#description").text(newsDescriptions[num]);
        $(".image").html("<img src=\""+images[num]+"\" style= \"width: 100%; height: 100%;\">");
}
function displayNews(num){
        $("#title").text(newsTitles[num]); $("#description").text(newsDescriptions[num]);
        $(".image").html("<img src=\""+images[num]+"\" style= \"width: 100%; height: 100%;\">");
}
function addEnt(){
    if(type[randomNum]=="Entertainment"){
        pent++;
    }
}
function addPol(){
    if(type[randomNum]=="Politics"){
        ppol++;
    }
}
function addCrime(){
    if(type[randomNum]=="Crime"){
        pcrime++;
    }
}
function addSci(){
    if(type[randomNum]=="Sci & tech"){
        psci++;
    }
}
function addSports(){
    if(type[randomNum]=="Sports"){
        psports++;
    }
}
function negEnt(){
    if(type[randomNum]=="Entertainment"){
        nent++;
    }
}
function negPol(){
    if(type[randomNum]=="Politics"){
        npol++;
    }
}
function negCrime(){
    if(type[randomNum]=="Crime"){
        ncrime++;
    }
}
function negSci(){
    if(type[randomNum]=="Sci & tech"){
        nsci++;
    }
}
function negSports(){
    if(type[randomNum]=="Sports"){
        nsports++;
    }
}

function plot(){
    console.log(ppol);
              var trace1 = {
              x: ['Politics', 'Entertainment', 'Sports', 'Crime', 'Science'],
              y: [ppol, pent, psports, pcrime, psci],
              name: 'Correct',
              type: 'bar'
            };

            var trace2 = {
              x: ['Politics', 'Entertainment', 'Sports', 'Crime', 'Science'],
              y: [npol,nent, nsports, ncrime, nsci],
              name: 'Wrong',
              type: 'bar'
            };

            var data = [trace1, trace2];

            var layout = {barmode: 'stack'};

            Plotly.newPlot('graph', data, layout);
}

function randomNumberGen(){
    var randomNum = 0;
    count = 0;
    var getRandomNumber = Math.floor(Math.random() * 15);
    lastNumber = getRandomNumber;
    for(var l=0; l<norep.length; l++){
        if(lastNumber != norep[l]){
            count++;
        }
    }
}

function returnRandom(){
    var a = 0;
    randomNumberGen();
    while(count != norep.length && a<100){
        randomNumberGen();
        a++;
        console.log(a);
    }
    if(a>100){
        return 4;
    }
    else{
        norep.push(lastNumber);
        return norep[norep.length-1];
    } 
}

function average(){
    avg = ((pcrime+pent+ppol+psports+psci)/(pcrime+pent+ppol+psports+psci+ncrime+nent+npol+nsports+nsci))*100;
    $("#score").html("Average: "+Math.floor(avg));
}