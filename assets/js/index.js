var AdminClicks = 0;
var AdminPassword = null;

UpdateActiveTimer();
document.getElementById("AdminPanel").style.display = 'none';
document.getElementById("AdminPanelSettings").style.display = 'none';

setInterval(function () {AdminClicks = 0;}, 2500);
setInterval(function () {UpdateActiveTimer();}, 10000);

function UpdateActiveTimer()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       //alert(xhttp.responseText);

       var Active = Number(xhttp.responseText) > 0;
       var ActiveTime = Math.round(Number(xhttp.responseText) / 60);

if(ActiveTime == 0){
    ActiveTime = 1;
}

       if(Active)
       {
           document.getElementById("PrcingElement").style.display = 'none';
           document.getElementById("ActiveDisplayTime").style.display = 'block';
           document.getElementById("ActiveTimeText").innerText = ActiveTime+" MIN";
       }else
       {
           document.getElementById("PrcingElement").style.display = 'block';
           document.getElementById("ActiveDisplayTime").style.display = 'none';
       }

       }
    };
     
    xhttp.open("GET", "https://bz44r2sjlxgzp2mav3shgjojq40invjx.lambda-url.eu-north-1.on.aws", true);
    xhttp.send();

   
}

function AdminSetActiveTime(AdminPass, Time) {
  alert(AdminPass+":"+Time);
  //Req_>
  UpdateActiveTimer();
}

const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

//alert(cyrb53("test"));

document.getElementById("MainHeading").addEventListener("click", (event) => {
    AdminClicks++;

    if(AdminClicks==5 && AdminPassword == null)
    {
        AdminClicks = 0;
        document.getElementById("AdminPanel").style.display = 'block';
    }
});

document.getElementById("AdminButtonSetTime").addEventListener("click", (event) => {
    var TimeInput = document.getElementById("AdminTimeSetInput").value.match(/\d+/)[0];

    AdminSetActiveTime(AdminPassword,TimeInput);
});

document.getElementById("AdminButton").addEventListener("click", (event) => {
    AdminPassword = document.getElementById("PasswordInput").value;
    if(cyrb53(AdminPassword) == 8713769735217609)
    {
        document.getElementById("MainHeading").innerText = "Administrator";
        document.getElementById("AdminPanel").style.display = 'none';
        document.getElementById("AdminPanelSettings").style.display = 'block';
    }else
    {
        alert("Hasło nieprawidłowe");
        AdminPassword = null;
    }
});