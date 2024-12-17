startLoading()
$(function reset() {
    if (!blulet) return setTimeout(reset, 1)
    if (blulet.userdata.role === "Common" || blulet.userdata.role === "Artist" || blulet.userdata.role === "Booster" || blulet.userdata.role === "Tester") {
        window.location.href = `${window.location.origin}/stats`
    } else {
        stopLoading()
    }
});



function getsearch() {
    let search = document.getElementById("search").value
    if (search === "") {

    } else {
        // get the username from the search bar
        fetch('/api/finduser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'authorization': blulet.tokenraw,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": search
                })
            })
            .then(response => response.json())
            .then(response => checkreq(response))

    }
}

function checkreq(response) {
    let role = response.role
    let pfp = response.pfp
    if (pfp === "") {
        pfp = "/media/misc/favicon.png"
    }

    document.getElementById("profile").innerHTML = `
<div class="styles__gameHolder___S1vDm-camelCase">
    <div class="styles__container___2WtUL-camelCase">
        <div class="styles__blookContainer___36LK2-camelCase styles__blook___2HjCj-camelCase"
            style="position: relative !important"><img src="${pfp}" draggable="false"
                class="styles__blook___1R6So-camelCase"></div>
        <div class="styles__textContainer___1TweY-camelCase">
            <div class="styles__setTitle___2SFni-camelCase">${response.username}</div>
            <div class="styles__infoRow___37zwL-camelCase">
                <div class="styles__info___3zsR3-camelCase"><i
                        class="fas fa-user-tag styles__infoIcon___hRB6L-camelCase"
                        aria-hidden="true"></i>${role}</div>

                <div class="styles__info___3zsR3-camelCase"><i
                        class="fas fa-coins styles__infoIcon___hRB6L-camelCase"
                        aria-hidden="true"></i>${response.tokens}  
                </div>
            </div>
        </div>
    </div>
    <div class="styles__deleteButton___2vDY2-camelCase" id="muteButton" role="button" tabindex="0"><i
            class="fas fa-microphone-slash styles__trashIcon___2Ap4H-camelCase" aria-hidden="true"></i>Mute
    </div>
    <div class="styles__deleteButton___2vDY2-camelCase" id="banButton" role="button" tabindex="0"><i
            class="fas fa-ban styles__trashIcon___2Ap4H-camelCase" aria-hidden="true"></i>Ban
    </div>
</div>`
}

document.getElementById("searchButton").onclick = (event) => {
    getsearch()
}



document.getElementById("search").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});

document.addEventListener("click", function (event) {
    if (event.target.id === "banButton") {
        $("body").append(`
        <div class="arts__modal___VpEAD-camelCase">
        <form class="styles__container___1BPm9-camelCase">
            <div class="styles__text___KSL4--camelCase">Banning username</div><br>
            <div class="styles__holder___3CEfN-camelCase">
                <div class="styles__numRow___xh98F-camelCase">
                    <div class="styles__banContainer___2Fn7J-camelCase styles__inputFilled___3AmpF-camelCase"
                        style="width: 305px; margin: 0px;"><input class="styles__input___2vJSW-camelCase" id="banReason"
                            style="width: 100%; text-align: center;" placeholder="Reason" fdprocessedid="gjud8"></div>
                </div>
            </div>
            <div class="styles__buttonContainer___2EaVD-camelCase">
                <div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="banUser" role="button">
                    <div class="styles__shadow___3GMdH-camelCase"></div>
                    <div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div>
                    <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase"
                        style="background-color: rgb(32, 39, 150);">Ban</div>
                </div>
                <div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="cancelBan" role="button">
                    <div class="styles__shadow___3GMdH-camelCase"></div>
                    <div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(38, 47, 175);"></div>
                    <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase"
                        style="background-color: rgb(38, 47, 175);">Cancel</div>
                </div>
            </div>  
        </form>
    </div>
        `)

        document.getElementById("banUser").onclick = (event) => {
            let reason = document.getElementById("banReason").value
            fetch('/api/staff', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'authorization': blulet.tokenraw,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": document.getElementById("search").value,
                        "reason": reason,
                        "action": "ban"
                    })
                })
                .then(response => response.json())
                .then(response => {
                    if (response.error) {
                        $('.arts__modal___VpEAD-camelCase').remove()
                        $("body").append(`
                <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">${response.error}</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 39, 150);">Okay</div></div></div></div></form></div>
                `)
                        document.getElementById("okay").onclick = () => {
                            $('.arts__modal___VpEAD-camelCase').remove()
                        }
                    } else {
                        $('.arts__modal___VpEAD-camelCase').remove()
                        $("body").append(`
                <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">Banned ${document.getElementById("search").value}</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 39, 150);">Okay</div></div></div></div></form></div>
                `)
                        document.getElementById("okay").onclick = () => {
                            $('.arts__modal___VpEAD-camelCase').remove()
                        }

                    }
                })
        }

        document.getElementById("cancelBan").onclick = (event) => {
            $(".arts__modal___VpEAD-camelCase").remove()
        }
    }
}, false);