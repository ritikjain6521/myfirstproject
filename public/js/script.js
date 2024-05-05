console.log('lets write javascript');
let currentsong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
console.log(secondsToMinutesSeconds(123)); // Output: "02:03"
console.log(secondsToMinutesSeconds(-5)); // Output: "Invalid input"



async function getSongs(folder){
   currFolder = folder;
   let a = await fetch(`http://127.0.0.1:5500/public/${folder}/`)
    let response = await a.text();
    console.log(response) 
    let div = document.createElement("div")
    div.innerHTML=response;
  let as = div.getElementsByTagName("a")
      songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
    if (element.href.endsWith(".mp3")) {
        songs.push(element.href.split(`/${folder}/`)[1])

        
    }
        
    }


    let songUL= document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML=""
    for (const song of songs) 
    {
       songUL.innerHTML = songUL.innerHTML + `<li>
       <img class="invert"src="img/music.svg" alt="">
       <div class="info">
      <div> ${song.replaceAll("%20","")}</div>
      <div> Ritik jain</div>
 
 
       </div>
        <div class="playnow">
           <span>playnow</span>
           <img class="invert" src="img/play.svg" alt="">
        </div>      
      </li>`;
 
    }
   Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
     e.addEventListener("click",element=>{
       console.log(e.querySelector(".info").firstElementChild.innerHTML)
       playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
     })
   })
   return songs
}


 const playMusic =(track, pause=false)=>{
   currentsong.src = `/${currFolder}/` + track
   if(!pause){
    currentsong.play()
    play.src="img/pause.svg"
   }
  document.querySelector(".songinfo").innerHTML= decodeURI (track)
  document.querySelector(".songtime").innerHTML= "00:00 / 00:00"
 }

  // Display the allbums

   async function displayallbums(){
  
    let a = await fetch(`http://127.0.0.1:5500/public/jainsongs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
  let array = Array.from(anchors)
      for (let index = 0; index < array.length; index++) {
        const e = array[index];    
    if(e.href.includes("/jainsongs/") && !e.href.includes(".htaccess")){
 
    let folder= e.href.split("/").slice(-1)[0]
     let a = await fetch(`/jainsongs/${folder}/info.json`)
    let response = await a.json();
    console.log(response)

     cardContainer.innerHTML =cardContainer.innerHTML + `<div data-floder="${folder}" class="card ">
     <div class="play">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" color="Black" fill="#1fdf64">
             <circle cx="12" cy="12" r="10" stroke="#1fdf64" stroke-width="1.5" />
             <path d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z" stroke="currentColor" fill="#000"stroke-width="1.5" stroke-linejoin="round" />
         </svg>
 </div>
     <img src="/jainsongs/${folder}/cover.jpg" alt="">
     <h2>${response.title}</h2>
     <p> ${response.description}</p>             
</div>    
     
     `
    }


    }

  }
  
 
     
 async function main(){
 
      await getSongs("jainsongs/ncs")
    playMusic(songs[0],true)

    await displayallbums()

    // Attach an event listener to play next and previous
    play.addEventListener("click",()=>{
       if(currentsong.paused){
        currentsong.play()
        play.src="img/pause.svg"

       }
       else{
        currentsong.pause()
        play.src="img/play.svg"

       }


    }
    )

   // listen for timeupdate event
   currentsong.addEventListener("timeupdate",()=>{


    document.querySelector(".songtime").innerHTML=
    `${secondsToMinutesSeconds(currentsong.currentTime)}
    /${secondsToMinutesSeconds(currentsong.duration)}`

    document.querySelector(".circle").style.left =(currentsong.currentTime/currentsong.duration)* 100 + "%";
  })
  document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
});

  document.querySelector(".hamburger").addEventListener("click",()=>{
     document.querySelector(".left").style.left="0"
    
  })

  document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left= "-120%"
   
 })


 previous.addEventListener("click",()=>{

  currentsong.pause()
  console.log("Previous clicked")
  let index= songs.indexOf( currentsong.src.split("/").slice(-1)[0])
if((index-1)>=0){
  playMusic(songs[index-1])
}



})

next.addEventListener("click",()=>{
currentsong.pause()
console.log("Next clicked")
let index= songs.indexOf( currentsong.src.split("/").slice(-1)[0])
if((index+1)< songs.length){
  playMusic(songs[index+1])
}



})
// add an event to volume

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{

console.log(e,e.target, e.target.value)
currentsong.volume = parseInt(e.target.value)/100
})

// add an event to mute  
document.querySelector(".volume>img").addEventListener("click", e=>{ 
  if(e.target.src.includes("volume.svg")){
      e.target.src = e.target.src.replace("volume.svg", "mute.svg")
      currentsong.volume = 0;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
  }
  else{
      e.target.src = e.target.src.replace("mute.svg", "volume.svg")
      currentsong.volume = .10;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
  }

})

   //load the playlist whenever load playlist

   Array.from (document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener("click", async item=>{

        songs = await getSongs(`jainsongs/${item.currentTarget.dataset.floder}`)

        playMusic(songs[0])
        



    })








})


 }
 main()

