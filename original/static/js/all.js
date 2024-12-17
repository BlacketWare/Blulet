console.warn("%cHold Up!", "font-size: 50px; color: red; text-shadow: 0 0 10px red, 0 0 20px red, 0 0 40px red; font-weight: bold; -webkit-text-stroke: 1px black;");
console.warn("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or \"hack\" someone's account, it is a scam and will give them access to your account.", "font-size: 20px; color: black; font-weight: bold;");

function startLoading() {
  let artsbody = document.createElement("div")
  artsbody.classList.add("arts__modal___VpEAD-camelCase")
  artsbody.id = "loading"
  let favicon = document.createElement("img")
  favicon.style.cssText = "position:absolute;left:50%;top:45%;transform: translate(-50%,-50%);animation: loading 1s infinite;width:80px;"
  favicon.src = "/media/misc/favicon.png"
  artsbody.appendChild(favicon)
  document.body.appendChild(artsbody)
}

function stopLoading() {
  document.getElementById("loading").remove()
}

let blulet;
let cookie = document.cookie.match(new RegExp(
  "(?:^|; )" + "tokenraw".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
))
if (cookie) {
  tokenraw = cookie[1]
} else {
  tokenraw = undefined
}
let cookie2 = document.cookie.match(new RegExp(
  "(?:^|; )" + "token".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
))
if (cookie2) {
  token = cookie2[1]
} else {
  token = undefined
}

fetch('/api/check-login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": token
    })
  })
  .then(response => response.json())
  .then(response => continuestf(response))

function continuestf(response) {
  if (response.message === 'logged in') {
    fetch('/data/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'authorization': tokenraw,
          'Content-Type': 'application/json'
        },
        body: null
      })
      .then(response => response.json())
      .then(response => bluletafy(response))
    fetch('/config.json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: null
      })
      .then(response => response.json())
      .then(response => {
        let pagename = window.location.pathname.replace("/", "")
        document.title = `${pagename.charAt(0).toUpperCase() + pagename.slice(1)} | ${response.name}`;
        document.getElementsByClassName("styles__blooketText___1pMBG-camelCase")[0].innerText = response.name
      })


  } else {
    window.location.href = `${window.location.origin}/login`
  }
}

async function bluletafy(response) {
  blulet = {
    userdata: await response,
    token: token,
    tokenraw: tokenraw,
    blues: await fetch('/data/blues', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      })
      .then(response => response.json())
      .then((response) => {
        return response.ValuesnCapsules
      })
  }
  document.getElementById('usernamedrop').innerText = blulet.userdata.username;
  document.getElementById('pfpimg').src = blulet.userdata.pfp;
}
setTimeout(function () {

  if (blulet.userdata.banned === true) {
    document.cookie = 'token=;rawtoken='
    window.location.href = `${window.location.origin}/login`
  }
}, 3000)

$(function reset() {
  if (!blulet) return setTimeout(reset, 1)
  if (blulet.userdata.role === "Common" || blulet.userdata.role === "Artist" || blulet.userdata.role === "Booster" || blulet.userdata.role === "Tester") {
    return;
  } else {
    $('#buttons').append(`<a class="styles__pageButton___1wFuu-camelCase" href="/staff"><i class="styles__pageIcon___3OSy9-camelCase fas fa-terminal" aria-hidden="true"></i>
      <div class="styles__pageText___1eo7q-camelCase">Staff</div>
  </a>`)
  }

});