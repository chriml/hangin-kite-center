/* Local, silent hero playback. No remote player or tracking. */
const film=document.getElementById('film'),play=document.getElementById('play');play.hidden=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let userPaused=false;
function label(){play.textContent=film.paused?'Play video':'Pause video'}
function start(){if(!film.getAttribute('src'))film.src='./assets/shoreline-film.mp4';film.muted=true;return film.play().catch(label)}
film.addEventListener('play',label);film.addEventListener('pause',label);
play.addEventListener('click',()=>{if(film.paused){userPaused=false;start()}else{userPaused=true;film.pause()}});
if(!reduced.matches&&!navigator.connection?.saveData)start();
reduced.addEventListener('change',e=>{if(e.matches)film.pause()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause();else if(!userPaused&&!reduced.matches&&!navigator.connection?.saveData)start()});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)film.pause();else if(!userPaused&&!reduced.matches&&!navigator.connection?.saveData)start()},{threshold:.1}).observe(document.querySelector('.cinema'));
