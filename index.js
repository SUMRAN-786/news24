const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("newsIput");
const newsIputBtn = document.getElementById("search");
const newsTypeBtn = document.getElementById("newsType");
const newsDetailBtn = document.getElementById("newsDetails");

let newsDataArr=[];


 const api = "1fa47e60a3cc4a879a478f96e6d3031b";
 const headline_news = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
 const general_news = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=";
 const business_news = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
 const sports_news = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";
 const entertainment_news = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
 const technology_news ="https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=";
 const search_news ="https://newsapi.org/v2/everything?q=";



generalBtn.addEventListener("click", function(){
    newsTypeBtn.innerHTML="<h5>General</h5>";
    fetchGeneralNews();
    console.log("hello");


})

businessBtn.addEventListener("click", function(){
    newsTypeBtn.innerHTML="<h5>Business</h5>";
    fetchBusinessNews();
})

sportsBtn.addEventListener("click", function(){
    newsTypeBtn.innerHTML="<h5>Sports</h5>";
    fetchSportsNews();
})

technologyBtn.addEventListener("click", function(){
    newsTypeBtn.innerHTML="<h5>Technology </h5>";
    fetchTechnologyNews();
})

entertainmentBtn.addEventListener("click", function(){
    newsTypeBtn.innerHTML="<h5>Entertainment</h5>";
    fetchEntertainmentNews();
})

searchBtn.addEventListener("click", function(){
    newsTypeBtn.innerHTML="<h5>Searched: "+newsIputBtn.value+" </h5>";
    fetchQueryNews();
})

 const fetchGeneralNews = async ()=>{
    const response= await fetch(general_news+api);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr= myJson.articles;
    }else{
        console.log(response.status,response.statusText);
    }
     displayNews();
 }


 const fetchBusinessNews = async ()=>{
    const response= await fetch(business_news+api);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr= myJson.articles;
    }else{
        console.log(response.status,response.statusText);
    }
     displayNews();
 }

 const fetchSportsNews = async ()=>{
    const response= await fetch(sports_news+api);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr= myJson.articles;
    }else{
        console.log(response.status,response.statusText);
    }
     displayNews();
 }


 
 const fetchEntertainmentNews = async ()=>{
    const response= await fetch(entertainment_news+api);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr= myJson.articles;
    }else{
        console.log(response.status,response.statusText);
    }
     displayNews();
 }

 
 const fetchTechnologyNews = async ()=>{
    const response= await fetch(technology_news+api);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr= myJson.articles;
    }else{
        console.log(response.status,response.statusText);
    }
     displayNews();
 }


 const fetchQueryNews =async()=> {

    console.log("display function")
    if(newsIputBtn.value == null){
        return;
    }
    const response=await fetch(search_news+encodeURIComponent(newsIputBtn.value)+"&apikey="+api);
    newsDataArr=[];
    if(response.status>=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr=myJson.articles;
    }else{
        console.log(response.status,response.statusText);
        newsDetailBtn.innerHTML="<h5>no data found</h5>";
        return;
    }
    displayNews();
}

const fetchHeadline=async()=>{
    const response= await fetch(headline_news+api);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr= myJson.articles;
    }else{
        console.log(response.status,response.statusText);
    }
     displayNews();

}


window.onload=function(){
    newsTypeBtn.innerHTML="<h5>Headline</h5>";
    fetchHeadline();
 }

function displayNews(){
    newsDetailBtn.innerHTML="";
  

    // if(newsDataArr.length==0){
    //     newsDetailBtn.innerHTML="<h5>No data found</h5>";
    //     return;
    // }

    newsDataArr.forEach( news =>{

        let date=news.publishedAt.split("T");

        let col = document.createElement('div');
        col.className="col-sm-2 col-md-4 col-lg-3 p-2 card";

        let card=document.createElement('div');
        card.className="p-2";

        let image=document.createElement("img");
        image.setAttribute("height","matchparnt");
        image.setAttribute("width","100%");
        image.setAttribute("class","img-fluid");
        image.setAttribute("alt","Responsive image")
        image.src=news.urlToImage;

        let cardbody =document.createElement('div');

        let newsheading=document.createElement('h5');
        newsheading.className="card-title";
        newsheading.innerHTML= news.title;

        let dateHeading=document.createElement("h6");
        dateHeading.className="text-primary"
        dateHeading.innerHTML=date[0];

        let discription=document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML=news.description;

        let link =document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target","_blank")
        link.href=news.url;
        link.innerHTML="Read more";


        cardbody.appendChild(newsheading);
        cardbody.appendChild(dateHeading);
        cardbody.appendChild(discription);
        cardbody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardbody);

        col.appendChild(card);

        newsDetailBtn.appendChild(col);

     
    })


}