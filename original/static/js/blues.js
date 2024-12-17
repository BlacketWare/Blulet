startLoading()
$(function reset() {
    if (!blulet) return setTimeout(reset, 1)
    stopLoading()
    blulet.blues.forEach(Object => {
        const parentDiv = document.createElement("div");
        parentDiv.className = "styles__setHolder___rVq3Z-camelCase";
        const topDiv = document.createElement("div");
        topDiv.className = "styles__setTop___wIaVS-camelCase";
        parentDiv.appendChild(topDiv);
        const textDiv = document.createElement("div");
        textDiv.className = "styles__setText___1PQLQ-camelCase";
        textDiv.innerHTML = Object.name + " Capsule";
        topDiv.appendChild(textDiv);
        const dividerDiv = document.createElement('div')
        dividerDiv.className = "styles__setDivider___3da0c-camelCase";
        topDiv.appendChild(dividerDiv);
        const bluesDiv = document.createElement("div");
        bluesDiv.className = "styles__setBlooks___3xamH-camelCase";
        parentDiv.appendChild(bluesDiv);
        Object.blues.forEach((blue) => {
            const blueContainer = document.createElement("div");
            blueContainer.className = "styles__blookContainer___3JrKb-camelCase";
            blueContainer.setAttribute("role", "button");
            blueContainer.onclick = function () {
                writeBlue(blue.name, Object.name)
            }
            blueContainer.setAttribute("tabindex", "0");
            bluesDiv.appendChild(blueContainer);
            const Blue = document.createElement("div");
            if (blulet.userdata.blues.find(train => train.blue === blue.name)) {
                Blue.className = "styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase";
                Blue.id = blue.name
                blueContainer.appendChild(Blue);
                const bluenumcircle = document.createElement("div")
                bluenumcircle.classList.add("styles__blookText___3AMdK-camelCase")
                bluenumcircle.id = `bluenumcircle${blue.name}`
                bluenumcircle.innerText = blulet.userdata.blues.find(train => train.blue === blue.name).quantity
                if (blue.rarity === "Uncommon") {
                    bluenumcircle.style.backgroundColor = "#4bc22e"
                } else if (blue.rarity === "Rare") {
                    bluenumcircle.style.backgroundColor = "#0a14fa"
                } else if (blue.rarity === "Epic") {
                    bluenumcircle.style.backgroundColor = "#be0000"
                } else if (blue.rarity === "Legendary") {
                    bluenumcircle.style.backgroundColor = "#ff910f"
                } else if (blue.rarity === "Chroma") {
                    bluenumcircle.style.backgroundColor = "#00ccff"
                } else if (blue.rarity === "Mystical") {
                    bluenumcircle.style.backgroundColor = "#a335ee"
                }
                blueContainer.appendChild(bluenumcircle);
            } else {
                Blue.className = "styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase styles__lockedBlook___3oGaX-camelCase"
                blueContainer.appendChild(Blue)
                const lockIcon = document.createElement("i")
                lockIcon.className = "fas fa-lock styles__blookLock___3Kgua-camelCase"
                blueContainer.style.cursor = "auto"
                blueContainer.appendChild(lockIcon)
            }
            const blueImg = document.createElement("img")
            blueImg.draggable = false
            blueImg.src = `/media/capsules/${Object.name}/blues/${blue.name}.png`
            blueImg.className = "styles__blook___1R6So-camelCase"
            Blue.appendChild(blueImg)

        })
        const bluesHolder = document.getElementById("bluescontainer")
        bluesHolder.appendChild(parentDiv)
    });

    let randomblue = blulet.userdata.blues[Math.floor(Math.random() * blulet.userdata.blues.length)]
    writeBlue(randomblue.blue, blulet.blues.find(obj => obj.blues.find(item => item.name === randomblue.blue)).name)
});

function writeBlue(bluename, Objectname) {
    if (blulet.userdata.blues.find(train => train.blue === bluename)) {
        let blue = blulet.userdata.blues.find(train => train.blue === bluename)
        document.getElementById("bluename").innerText = bluename;
        document.getElementById("bluequantity").innerText = `${blue.quantity} Owned`
        document.getElementById("bluebackground").src = `/media/capsules/${Objectname}/background.png`
        document.getElementById("blueimg").src = `/media/capsules/${Objectname}/blues/${bluename}.png`
        let capsule = blulet.blues.find(obj => obj.name === Objectname);
        let blueincapsule = capsule.blues.find(item => item.name === bluename)
        document.getElementById("bluerarity").innerText = blueincapsule.rarity
        if (blueincapsule.rarity === "Uncommon") {
            document.getElementById("bluerarity").style.color = "#4bc22e"
        } else if (blueincapsule.rarity === "Rare") {
            document.getElementById("bluerarity").style.color = "#0a14fa"
        } else if (blueincapsule.rarity === "Epic") {
            document.getElementById("bluerarity").style.color = "#be0000"
        } else if (blueincapsule.rarity === "Legendary") {
            document.getElementById("bluerarity").style.color = "#ff910f"
        } else if (blueincapsule.rarity === "Chroma") {
            document.getElementById("bluerarity").style.color = "#00ccff"
        } else if (blueincapsule.rarity === "Mystical") {
            document.getElementById("bluerarity").style.color = "#a335ee"
        }
        document.getElementById("sellblue").onclick = () => {
            let artsContainer = $('<div>').addClass('arts__modal___VpEAD-camelCase')
            let formContainer = $('<form>').addClass('styles__container___1BPm9-camelCase');
            let textContainer = $('<div>').addClass('styles__text___KSL4--camelCase').text(`Sell ${bluename} Blues for ${blueincapsule.sell} tokens each:`);
            let holderContainer = $('<div>').addClass('styles__holder___3CEfN-camelCase');
            let numRowContainer = $('<div>').addClass('styles__numRow___xh98F-camelCase');
            let inputContainer = $('<div>').addClass('styles__inputContainer___2Fn7J-camelCase styles__inputFilled___3AmpF-camelCase').css('width', '80px').css('margin', '0px');
            let input = $('<input>').addClass('styles__input___2vJSW-camelCase').attr('type', 'number').attr("id", "sellinput").attr('oninput', 'checksellinput(this)').css('width', '60px');
            let numTotalContainer = $('<div>').addClass('styles__numTotal___3LQaw-camelCase').text(`/ ${blue.quantity}`);
            let buttonContainer = $('<div>').addClass('styles__buttonContainer___2EaVD-camelCase');
            let yesButton = $('<div>').addClass('styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase').attr('id', 'sellyes').attr('role', 'button')
            let yesShadow = $('<div>').addClass('styles__shadow___3GMdH-camelCase');
            let yesEdge = $('<div>').addClass('styles__edge___3eWfq-camelCase').css('background-color', 'rgb(32, 39, 150)');
            let yesFront = $('<div>').addClass('styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase').css('background-color', 'rgb(32, 39, 150)').text('Sell');
            let noButton = $('<div>').addClass('styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase').attr('id', 'sellno').attr('role', 'button')
            let noShadow = $('<div>').addClass('styles__shadow___3GMdH-camelCase');
            let noEdge = $('<div>').addClass('styles__edge___3eWfq-camelCase').css('background-color', 'rgb(32, 39, 150)');
            let noFront = $('<div>').addClass('styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase').css('background-color', 'rgb(32, 39, 150)').text('Cancel');

            inputContainer.append(input);
            yesButton.append(yesShadow);
            yesButton.append(yesEdge);
            yesButton.append(yesFront);
            noButton.append(noShadow);
            noButton.append(noEdge);
            noButton.append(noFront);
            numRowContainer.append(inputContainer);
            numRowContainer.append(numTotalContainer);
            buttonContainer.append(yesButton);
            buttonContainer.append(noButton);
            holderContainer.append(numRowContainer);
            holderContainer.append(buttonContainer);
            formContainer.append(textContainer);
            formContainer.append(holderContainer);
            artsContainer.append(formContainer)
            $('body').append(artsContainer);
            document.getElementById("sellno").onclick = () => {
                artsContainer.remove()
            }
            document.getElementById("sellyes").onclick = () => {
                let amount = Number(document.getElementById("sellinput").value)
                fetch('/api/sell', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'authorization': blulet.tokenraw,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "blue": bluename,
                        "quantity": amount
                    })
                })
                if (blue.quantity - amount === 0) {
                    let blueDiv = document.getElementById(`${bluename}`)
                    blueDiv.innerHTML += `<i class="fas fa-lock styles__blookLock___3Kgua-camelCase"></i>`
                    blueDiv.classList.add("styles__lockedBlook___3oGaX-camelCase")
                    
                }
                let bluesamount = blue.quantity - amount
                document.getElementById("bluequantity").innerText = `${bluesamount} Owned`
                document.getElementById(`bluenumcircle${bluename}`).innerText = bluesamount

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
                artsContainer.remove()
            }
        }
    } else {
        return;
    }
}

function checksellinput(sender) {
    if (sender.value > blulet.userdata.blues.find(train => train.blue === document.getElementById("bluename").innerText).quantity) {
        sender.value = blulet.userdata.blues.find(train => train.blue === document.getElementById("bluename").innerText).quantity
    } else if (sender.value < 0) {
        sender.value = 0
    } else if (Number.isInteger(sender.value) === false) {
        sender.value = Math.round(sender.value)
    } else {
        return;
    }
}