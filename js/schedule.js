/* global CONFIG */
// https://developers.google.com/calendar/api/v3/reference/events/list
!function(){
// Initialization
const e={orderBy:"startTime",showLocation:!1,offsetMax:72,offsetMin:4,showDeleted:!1,singleEvents:!0,maxResults:250};
// Read config form theme config file
Object.assign(e,CONFIG.calendar);const t=new Date,n=new Date,s=new Date;n.setHours(t.getHours()+e.offsetMax),s.setHours(t.getHours()-e.offsetMin);
// Build URL
const a={key:e.api_key,orderBy:e.orderBy,timeMax:n.toISOString(),timeMin:s.toISOString(),showDeleted:e.showDeleted,singleEvents:e.singleEvents,maxResults:e.maxResults},o=new URL(`https://www.googleapis.com/calendar/v3/calendars/${e.calendar_id}/events`);function r(n,s,a,o){const r={weekday:"short",hour:"2-digit",minute:"2-digit"},i="now"===n?"NOW":function(e,t){const n=36e5,s=864e5,a=2592e6,o=31536e6;let r=e-t;const i=r>0?" ago":" later";return r=Math.abs(r),r<n?Math.round(r/6e4)+" minutes"+i:r<s?Math.round(r/n)+" hours"+i:r<a?"about "+Math.round(r/s)+" days"+i:r<o?"about "+Math.round(r/a)+" months"+i:"about "+Math.round(r/o)+" years"+i}(t,a),c=a.toLocaleTimeString([],r)+" - "+o.toLocaleTimeString([],r);let d="";e.showLocation&&s.location&&(d=`<span class="event-location event-details">${s.location}</span>`);let l="";s.description&&(l=`<span class="event-description event-details">${s.description}</span>`);return`<section class="event event-${n}">\n        <h2 class="event-summary">\n          ${s.summary}\n          <span class="event-relative-time">${i}</span>\n        </h2>\n        ${d}\n        <span class="event-duration event-details">${c}</span>\n        ${l}\n      </section>`}function i(){const e=document.querySelector(".event-list");e&&fetch(o.href).then(e=>e.json()).then(n=>{if(0===n.items.length)return void(e.innerHTML="<hr>");
// Clean the event list
e.innerHTML="";let s=0;// used to decide where to insert an <hr>
const a=6e4*(new Date).getTimezoneOffset();n.items.forEach(n=>{
// Parse data
const o=new Date(n.start.dateTime||new Date(n.start.date).getTime()+a),i=new Date(n.end.dateTime||new Date(n.end.date).getTime()+a);let c="now";i<t?c="past":o>t&&(c="future"),"future"===c&&s<t&&e.insertAdjacentHTML("beforeend","<hr>"),e.insertAdjacentHTML("beforeend",r(c,n,o,i)),s=i})})}Object.entries(a).forEach(e=>o.searchParams.append(...e)),i();const c=setInterval(i,6e4);document.addEventListener("pjax:send",()=>{clearInterval(c)})}();