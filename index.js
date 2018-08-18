function TickMark() {
    this.div = document.createElement("div");
    this.div.classList.add("tick-mark");
}

function Tick(degrees) {
    this.div = document.createElement("div");
    this.div.classList.add("tick");
    this.div.style.transform = "rotate(" + degrees + "deg) " + "translate(0px, -1px)";
    this.div.appendChild(new TickMark().div);
}

function Hand(widthPercent, heightPx) {
    this.div = document.createElement("div");
    this.div.classList.add("hand");
    this.div.style.width = widthPercent;
    this.div.style.height = heightPx + "px";
    this.halfHeight = heightPx/2 + "px";
}

Hand.prototype.setAngle = function(degrees) {
    this.div.style.transform = "rotate(" + degrees + "deg) " + "translate(0px, -" + this.halfHeight + ")";
}

function Clock() {
    this.div = document.createElement("div");
    this.div.className = "clock";
    this.hourHand = new Hand("30%", 6);
    this.minHand = new Hand("40%", 4);
    this.secHand = new Hand("45%", 2);

    for(let deg = 0; deg < 360; deg += (360/12)) {
        this.div.appendChild(new Tick(deg).div);
    }

    this.div.appendChild(this.hourHand.div);
    this.div.appendChild(this.minHand.div);
    this.div.appendChild(this.secHand.div);

    this.tick();
    setInterval(this.tick.bind(this), 1000);
}

Clock.prototype.tick = function() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    this.hourHand.setAngle(this.calcHourAngle(h, m, s));
    this.minHand.setAngle(this.calcMinAngle(m, s));
    this.secHand.setAngle(this.calcSecAngle(s)); 
}

Clock.prototype.calcHourAngle = function(hours, minutes, seconds) {
    let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    let degPerSec = 360 / (12 * 60 * 60);
    return -90 + (degPerSec * totalSeconds);
}

Clock.prototype.calcMinAngle = function(minutes, seconds) {
    let totalSeconds = minutes * 60 + seconds;
    let degPerSec = (360/(60 * 60));
    return -90 + (degPerSec * totalSeconds);
}

Clock.prototype.calcSecAngle = function(seconds) {
    let degPerSec = 360/60;
    return -90 + (degPerSec * seconds);
}

window.onload = () => {
    let clock = new Clock();
    document.body.appendChild(clock.div);
}