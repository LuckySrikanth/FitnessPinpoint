class t{date=new Date;id=(Date.now()+"").slice(-10);clicks=0;constructor(t,e,s){this.coords=t,this.distance=e,this.duration=s}_setDescription(){this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on ${["January","February","March","April","May","June","July","August","September","October","November","December"][this.date.getMonth()]} ${this.date.getDate()}`}click(){this.clicks++}}class e extends t{type="running";constructor(t,e,s,o){super(t,e,s),this.cadence=o,this.calcPace(),this._setDescription()}calcPace(){return this.pace=this.duration/this.distance,this.pace}}class s extends t{type="cycling";constructor(t,e,s,o){super(t,e,s),this.elevationGain=o,this.calcSpeed(),this._setDescription()}calcSpeed(){return this.speed=this.distance/(this.duration/60),this.speed}}const o=document.querySelector(".form"),i=document.querySelector(".workouts"),a=document.querySelector(".form__input--type"),r=document.querySelector(".form__input--distance"),n=document.querySelector(".form__input--duration"),u=document.querySelector(".form__input--cadence"),c=document.querySelector(".form__input--elevation");new class{#t;#e=13;#s;#o=[];constructor(){this._getPosition(),this._getLocalStorage(),o.addEventListener("submit",this._newWorkout.bind(this)),a.addEventListener("change",this._toggleElevationField),i.addEventListener("click",this._moveToPopup.bind(this))}_getPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){alert("Could not get your position")})}_loadMap(t){let{latitude:e}=t.coords,{longitude:s}=t.coords;this.#t=L.map("map").setView([e,s],this.#e),L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.#t),this.#t.on("click",this._showForm.bind(this)),this.#o.forEach(t=>{this._renderWorkoutMarker(t)})}_showForm(t){this.#s=t,o.classList.remove("hidden"),r.focus()}_hideForm(){r.value=n.value=u.value=c.value="",o.style.display="none",o.classList.add("hidden"),setTimeout(()=>o.style.display="grid",1e3)}_toggleElevationField(){c.closest(".form__row").classList.toggle("form__row--hidden"),u.closest(".form__row").classList.toggle("form__row--hidden")}_newWorkout(t){let o;let i=(...t)=>t.every(t=>Number.isFinite(t)),l=(...t)=>t.every(t=>t>0);t.preventDefault();let p=a.value,d=+r.value,_=+n.value,{lat:h,lng:m}=this.#s.latlng;if("running"===p){let t=+u.value;if(!i(d,_,t)||!l(d,_,t))return alert("Inputs have to be positive numbers!");o=new e([h,m],d,_,t)}if("cycling"===p){let t=+c.value;if(!i(d,_,t)||!l(d,_))return alert("Inputs have to be positive numbers!");o=new s([h,m],d,_,t)}this.#o.push(o),this._renderWorkoutMarker(o),this._renderWorkout(o),this._hideForm(),this._setLocalStorage()}_renderWorkoutMarker(t){L.marker(t.coords).addTo(this.#t).bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:!1,closeOnClick:!1,className:`${t.type}-popup`})).setPopupContent(`${"running"===t.type?"\uD83C\uDFC3‍♂️":"\uD83D\uDEB4‍♀️"} ${t.description}`).openPopup()}_renderWorkout(t){let e=`
      <li class="workout workout--${t.type}" data-id="${t.id}">
        <h2 class="workout__title">${t.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${"running"===t.type?"\uD83C\uDFC3‍♂️":"\uD83D\uDEB4‍♀️"}</span>
          <span class="workout__value">${t.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">\u{23F1}</span>
          <span class="workout__value">${t.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;"running"===t.type&&(e+=`
        <div class="workout__details">
          <span class="workout__icon">\u{26A1}\u{FE0F}</span>
          <span class="workout__value">${t.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">\u{1F9B6}\u{1F3FC}</span>
          <span class="workout__value">${t.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `),"cycling"===t.type&&(e+=`
        <div class="workout__details">
          <span class="workout__icon">\u{26A1}\u{FE0F}</span>
          <span class="workout__value">${t.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">\u{26F0}</span>
          <span class="workout__value">${t.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `),o.insertAdjacentHTML("afterend",e)}_moveToPopup(t){if(!this.#t)return;let e=t.target.closest(".workout");if(!e)return;let s=this.#o.find(t=>t.id===e.dataset.id);this.#t.setView(s.coords,this.#e,{animate:!0,pan:{duration:1}})}_setLocalStorage(){localStorage.setItem("workouts",JSON.stringify(this.#o))}_getLocalStorage(){let t=JSON.parse(localStorage.getItem("workouts"));t&&(this.#o=t,this.#o.forEach(t=>{this._renderWorkout(t)}))}reset(){localStorage.removeItem("workouts"),location.reload()}};
//# sourceMappingURL=index.772afa3a.js.map
