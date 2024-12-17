startLoading()
$(function reset() {
    if (!blulet) return setTimeout(reset, 1)
    stopLoading()

    function opencapsule(capsule) {
        if (localStorage.getItem("instantopen") === "true") {
            clickCount = 0;
            let bluefromcapsule;
            fetch('/api/open', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'authorization': blulet.tokenraw,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "capsule": `${capsule.name}`
                    })
                })
                .then(response => response.json())
                .then(response => bluefromcapsule = response)
                .then(bluefromcapsule => {
                    capsule = blulet.blues.find(array => {
                        return array.blues.find(blue => blue.name === bluefromcapsule.blue);
                    });
                    if (bluefromcapsule.error) {
                        $('body').append(`
<div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">Error: ${bluefromcapsule.message}</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 50, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 50, 150);">Okay</div></div></div></div></form></div>
`)
                        document.getElementById("okay").onclick = () => {
                            $('.arts__modal___VpEAD-camelCase').remove()
                        }
                    } else {
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
                            .then(response => document.getElementById("tokenbalance").innerText = response.tokens.toLocaleString("en-US"))
                        $('body').append(`
    <div id="capsuleContainer" class="capsuleContainer"><div id="overlay" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; z-index: 10; cursor: pointer;"></div><div id="background" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background: radial-gradient(circle, #${capsule.colors[0]}, #${capsule.colors[1]}); z-index: 8;"></div><div id="capsule" class="trianglecontainer"><img id="capsuletop"class="capsuletop" src="media/capsules/other/top.png"><img src="/media/capsules/${capsule.name}/bottom.png"></div></div>
    `)

                        let overlay = document.getElementById("overlay")
                        let capsuletop = document.getElementById("capsuletop")
                        overlay.addEventListener("click", function () {
                            if (clickCount === 0) {
                                capsuletop.style.cssText = "animation: opencapsule .8s forwards"
                                setTimeout(function () {
                                    let capsule2 = document.getElementById("capsule")
                                    capsule2.style.cssText = "animation: fade-out 0.2s forwards"
                                    let chanceandnew;
                                    if (bluefromcapsule.new === true) {
                                        chanceandnew = `${capsule.blues.find(item => item.name === bluefromcapsule.blue).chance}% - NEW!`
                                    } else {
                                        chanceandnew = `${capsule.blues.find(item => item.name === bluefromcapsule.blue).chance}%`
                                    }
                                    let color;
                                    let backgroundId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
                                    let background = document.getElementById("background")
                                    background.id = backgroundId
                                    let openanimation;
                                    let container = document.getElementById("capsuleContainer")
                                    let blue = capsule.blues.find(item => item.name === bluefromcapsule.blue)
                                    if (blue.rarity === "Uncommon") {
                                        color = "#4bc22e"
                                        openanimation = "styles__openingContainer___2OmG9-camelCase"
                                    } else if (blue.rarity === "Rare") {
                                        color = "#0a14fa"
                                        openanimation = "styles__openingContainer___2OmG9-camelCase"
                                    } else if (blue.rarity === "Epic") {
                                        color = "#be0000"
                                        openanimation = "styles__openingContainerEpic___3TzCR-camelCase"
                                    } else if (blue.rarity === "Legendary") {
                                        color = "#ff910f"
                                        openanimation = "styles__openingContainerLegendary___RbJZ_-camelCase"
                                    } else if (blue.rarity === "Chroma") {
                                        color = "#00ccff"
                                        openanimation = "styles__openingContainerChroma___3VBd5-camelCase"
                                    } else if (blue.rarity === "Mystical") {
                                        color = "#a335ee"
                                        openanimation = "styles__openingContainerChroma___3VBd5-camelCase"
                                    }
                                    $(".capsuleContainer").append(`
  <div class="styles__openContainer___3paFG-camelCase ${openanimation}"><img src="/media/capsules/${capsule.name}/background.png" alt="Background" class="styles__blookBackground___3rt4N-camelCase" draggable="false"><div class="styles__blookContainer___36LK2-camelCase styles__unlockedBlookImage___wC4gr-camelCase"><img src="/media/capsules/${capsule.name}/blues/${bluefromcapsule.blue}.png" draggable="false" class="styles__blook___1R6So-camelCase"></div><div class="styles__unlockedText___1diat-camelCase"><div class="styles__unlockedBlook___2pr1Z-camelCase" style="font-size: 40px;"><div style="font-family: Titan One,sans-serif;display: block; white-space: nowrap;color:#fff">${bluefromcapsule.blue}</div></div><div class="styles__rarityText___1PfSA-camelCase"style="font-family: Titan One,sans-serif;color:${color}">${bluefromcapsule.rarity}</div></div><div class="styles__bottomText___3_k10-camelCase">${chanceandnew}</div><div class="styles__bottomShadow___10ZLG-camelCase"></div></div>
  `)
                                    setTimeout(function () {
                                        if (blue.rarity === "Uncommon") {
                                            let config = {
                                                type: Phaser.WEBGL,
                                                width: window.innerWidth,
                                                height: window.innerHeight,
                                                parent: document.getElementById(backgroundId),
                                                render: {
                                                    transparent: true
                                                },
                                                scene: {
                                                    preload: preload,
                                                    create: create
                                                }
                                            };

                                            game = new Phaser.Game(config);

                                            function preload() {
                                                this.load.svg("1", "https://media.blooket.com/image/upload/v1658567787/Media/market/particles/square_green.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("2", "https://media.blooket.com/image/upload/v1658567787/Media/market/particles/square_light_green.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("3", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/circle_dark_green.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("4", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/serpentine_dark_green.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("5", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/triangle_light_green.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("6", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/serpentine_light_green.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("7", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/triangle_green.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                            }

                                            function create() {
                                                particle1 = this.add.particles('1');
                                                particle2 = this.add.particles('2');
                                                particle3 = this.add.particles('3');
                                                particle4 = this.add.particles('4');
                                                particle5 = this.add.particles('5');
                                                particle6 = this.add.particles('6');
                                                particle7 = this.add.particles('7');

                                                let emitter1 = particle1.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 800
                                                    },
                                                    angle: {
                                                        min: -115,
                                                        max: -65
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    velocityFromRotation: true,
                                                    gravityY: 700,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth / 2 - 25,
                                                        max: window.innerWidth / 2 + 25
                                                    },
                                                    y: window.innerHeight / 2 + 25,
                                                });

                                                let emitter2 = particle2.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 800
                                                    },
                                                    angle: {
                                                        min: -115,
                                                        max: -65
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    velocityFromRotation: true,
                                                    gravityY: 700,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth / 2 - 25,
                                                        max: window.innerWidth / 2 + 25
                                                    },
                                                    y: window.innerHeight / 2 + 25,
                                                });

                                                let emitter3 = particle3.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 800
                                                    },
                                                    angle: {
                                                        min: -115,
                                                        max: -65
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    velocityFromRotation: true,
                                                    gravityY: 700,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth / 2 - 25,
                                                        max: window.innerWidth / 2 + 25
                                                    },
                                                    y: window.innerHeight / 2 + 25,
                                                });

                                                let emitter4 = particle4.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 800
                                                    },
                                                    angle: {
                                                        min: -115,
                                                        max: -65
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },

                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    velocityFromRotation: true,
                                                    gravityY: 700,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth / 2 - 25,
                                                        max: window.innerWidth / 2 + 25
                                                    },
                                                    y: window.innerHeight / 2 + 25,
                                                });

                                                let emitter5 = particle5.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 800
                                                    },
                                                    angle: {
                                                        min: -115,
                                                        max: -65
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    velocityFromRotation: true,
                                                    gravityY: 700,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth / 2 - 25,
                                                        max: window.innerWidth / 2 + 25
                                                    },
                                                    y: window.innerHeight / 2 + 25,
                                                });

                                                let emitter6 = particle6.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 800
                                                    },
                                                    angle: {
                                                        min: -115,
                                                        max: -65
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    velocityFromRotation: true,
                                                    gravityY: 700,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth / 2 - 25,
                                                        max: window.innerWidth / 2 + 25
                                                    },
                                                    y: window.innerHeight / 2 + 25,
                                                });

                                                let emitter7 = particle7.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 800
                                                    },
                                                    angle: {
                                                        min: -115,
                                                        max: -65
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    velocityFromRotation: true,
                                                    gravityY: 700,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth / 2 - 25,
                                                        max: window.innerWidth / 2 + 25
                                                    },
                                                    y: window.innerHeight / 2 + 25,
                                                });

                                                setTimeout(() => {
                                                    emitter1.stop();
                                                    emitter2.stop();
                                                    emitter3.stop();
                                                    emitter4.stop();
                                                    emitter5.stop();
                                                    emitter6.stop();
                                                    emitter7.stop();
                                                }, 1500);
                                            }
                                        } else if (blue.rarity === "Rare") {
                                            let config = {
                                                type: Phaser.WEBGL,
                                                width: window.innerWidth,
                                                height: window.innerHeight,
                                                parent: document.getElementById(backgroundId),
                                                render: {
                                                    transparent: true
                                                },
                                                scene: {
                                                    preload: preload,
                                                    create: create
                                                }
                                            };

                                            game = new Phaser.Game(config);

                                            function preload() {
                                                this.load.svg("1", "https://media.blooket.com/image/upload/v1658567765/Media/market/particles/square_light_blue.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("2", "https://media.blooket.com/image/upload/v1658567765/Media/market/particles/square_dark_blue.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("3", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/triangle_blue.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("4", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/serpentine_blue.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("5", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/triangle_light_blue.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("6", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/serpentine_light_blue.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("7", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/circle_dark_blue.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                            }

                                            function create() {
                                                particle1 = this.add.particles('1');
                                                particle2 = this.add.particles('2');
                                                particle3 = this.add.particles('3');
                                                particle4 = this.add.particles('4');
                                                particle5 = this.add.particles('5');
                                                particle6 = this.add.particles('6');
                                                particle7 = this.add.particles('7');

                                                let emitter1 = particle1.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -70,
                                                        max: -20
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: -25,
                                                        max: 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter2 = particle2.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -70,
                                                        max: -20
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: -25,
                                                        max: 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter3 = particle3.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -70,
                                                        max: -20
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: -25,
                                                        max: 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter4 = particle4.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -70,
                                                        max: -20
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: -25,
                                                        max: 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter5 = particle5.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -70,
                                                        max: -20
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: -25,
                                                        max: 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter6 = particle6.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -70,
                                                        max: -20
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: -25,
                                                        max: 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter7 = particle7.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -70,
                                                        max: -20
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: -25,
                                                        max: 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter8 = particle1.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -160,
                                                        max: -110
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth - 25,
                                                        max: window.innerWidth + 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter9 = particle2.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -160,
                                                        max: -110
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth - 25,
                                                        max: window.innerWidth + 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter10 = particle3.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -160,
                                                        max: -110
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth - 25,
                                                        max: window.innerWidth + 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter11 = particle4.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -160,
                                                        max: -110
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth - 25,
                                                        max: window.innerWidth + 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter12 = particle5.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -160,
                                                        max: -110
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth - 25,
                                                        max: window.innerWidth + 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter13 = particle6.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -160,
                                                        max: -110
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth - 25,
                                                        max: window.innerWidth + 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                let emitter14 = particle7.createEmitter({

                                                    speed: {
                                                        min: 700,
                                                        max: 750
                                                    },
                                                    angle: {
                                                        min: -160,
                                                        max: -110
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    gravityY: 500,
                                                    frequency: 75,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: window.innerWidth - 25,
                                                        max: window.innerWidth + 25
                                                    },
                                                    y: window.innerHeight,
                                                });

                                                setTimeout(() => {
                                                    emitter1.stop();
                                                    emitter2.stop();
                                                    emitter3.stop();
                                                    emitter4.stop();
                                                    emitter5.stop();
                                                    emitter6.stop();
                                                    emitter7.stop();
                                                    emitter8.stop();
                                                    emitter9.stop();
                                                    emitter10.stop();
                                                    emitter11.stop();
                                                    emitter12.stop();
                                                    emitter13.stop();
                                                    emitter14.stop();
                                                }, 1500);
                                            }
                                        } else if (blue.rarity === "Epic") {
                                            let config = {
                                                type: Phaser.WEBGL,
                                                width: window.innerWidth,
                                                height: window.innerHeight,
                                                parent: document.getElementById(backgroundId),
                                                render: {
                                                    transparent: true
                                                },
                                                scene: {
                                                    preload: preload,
                                                    create: create
                                                }
                                            };

                                            game = new Phaser.Game(config);

                                            function preload() {
                                                this.load.svg("1", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/red.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("2", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/light_red.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("3", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/serpentine_red.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("4", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/serpentine_dark_red.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("5", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/triangle_red.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("6", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/triangle_light_red.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("7", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/circle_dark_red.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                            }

                                            function create() {
                                                particle1 = this.add.particles('1');
                                                particle2 = this.add.particles('2');
                                                particle3 = this.add.particles('3');
                                                particle4 = this.add.particles('4');
                                                particle5 = this.add.particles('5');
                                                particle6 = this.add.particles('6');
                                                particle7 = this.add.particles('7');

                                                particle1.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -50,
                                                        max: 0
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: 0,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle2.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -50,
                                                        max: 0
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: 0,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle3.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -50,
                                                        max: 0
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: 0,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle4.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -50,
                                                        max: 0
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: 0,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle5.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -50,
                                                        max: 0
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: 0,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle6.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -50,
                                                        max: 0
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: 0,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle7.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -50,
                                                        max: 0
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: 0,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle1.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -180,
                                                        max: -130
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: game.config.width,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle2.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -180,
                                                        max: -130
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: game.config.width,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle3.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -180,
                                                        max: -130
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: game.config.width,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle4.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -180,
                                                        max: -130
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: game.config.width,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle5.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -180,
                                                        max: -130
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: game.config.width,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle6.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -180,
                                                        max: -130
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: game.config.width,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });

                                                particle7.createEmitter({

                                                    speed: 650,
                                                    angle: {
                                                        min: -180,
                                                        max: -130
                                                    },
                                                    velocity: {
                                                        min: 600,
                                                        max: 750
                                                    },
                                                    gravityY: 400,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: game.config.width,
                                                    y: {
                                                        min: 0,
                                                        max: game.config.width
                                                    }
                                                });
                                            }
                                        } else if (blue.rarity === "Legendary") {
                                            let config = {
                                                type: Phaser.WEBGL,
                                                width: window.innerWidth,
                                                height: window.innerHeight,
                                                parent: document.getElementById(backgroundId),
                                                render: {
                                                    transparent: true
                                                },
                                                scene: {
                                                    preload: preload,
                                                    create: create
                                                }
                                            };

                                            game = new Phaser.Game(config);

                                            function preload() {
                                                this.load.svg("1", "https://media.blooket.com/image/upload/v1658567740/Media/market/particles/square_orange.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("2", "https://media.blooket.com/image/upload/v1658567740/Media/market/particles/square_light_orange.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("3", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/circle_orange.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("4", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/serpentine_orange.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("5", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/serpentine_light_orange.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("6", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/circle_dark_orange.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("7", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/triangle_dark_orange.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                            }

                                            function create() {
                                                particle1 = this.add.particles('1');
                                                particle2 = this.add.particles('2');
                                                particle3 = this.add.particles('3');
                                                particle4 = this.add.particles('4');
                                                particle5 = this.add.particles('5');
                                                particle6 = this.add.particles('6');
                                                particle7 = this.add.particles('7');

                                                particle1.createEmitter({

                                                    speed: 500,
                                                    angle: 90,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle2.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle3.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle4.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle5.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle6.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle7.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                            }
                                        } else if (blue.rarity === "Chroma") {
                                            let config = {
                                                type: Phaser.WEBGL,
                                                width: window.innerWidth,
                                                height: window.innerHeight,
                                                parent: document.getElementById(backgroundId),
                                                render: {
                                                    transparent: true
                                                },
                                                scene: {
                                                    preload: preload,
                                                    create: create
                                                }
                                            };

                                            game = new Phaser.Game(config);

                                            function preload() {
                                                this.load.svg("1", "https://media.blooket.com/image/upload/v1658790246/Media/market/particles/square_turquoise.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("2", "https://media.blooket.com/image/upload/v1658790246/Media/market/particles/square_light_turquoise.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("3", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/serpentine_dark_turquoise.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("4", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/serpentine_turquoise.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("5", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/triangle_turquoise.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("6", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/triangle_light_turquoise.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("7", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/circle_dark_turquoise.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                            }

                                            function create() {
                                                particle1 = this.add.particles('1');
                                                particle2 = this.add.particles('2');
                                                particle3 = this.add.particles('3');
                                                particle4 = this.add.particles('4');
                                                particle5 = this.add.particles('5');
                                                particle6 = this.add.particles('6');
                                                particle7 = this.add.particles('7');

                                                particle1.createEmitter({

                                                    speed: 500,
                                                    angle: 90,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle2.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle3.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle4.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle5.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle6.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });

                                                particle7.createEmitter({

                                                    angle: 90,
                                                    speed: 500,
                                                    velocity: 180,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                            }

                                        } else if (blue.rarity === "Mystical") {
                                            let config = {
                                                type: Phaser.WEBGL,
                                                width: window.innerWidth,
                                                height: window.innerHeight,
                                                parent: document.getElementById(backgroundId),
                                                render: {
                                                    transparent: true
                                                },
                                                scene: {
                                                    preload: preload,
                                                    create: create
                                                }
                                            };

                                            game = new Phaser.Game(config);

                                            function preload() {
                                                this.load.svg("1", "/media/capsules/other/1.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("2", "/media/capsules/other/2.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                                this.load.svg("3", "/media/capsules/other/3.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("4", "/media/capsules/other/4.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("5", "/media/capsules/other/5.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("6", "/media/capsules/other/6.svg", {
                                                    width: 30,
                                                    height: 30
                                                });
                                                this.load.svg("7", "/media/capsules/other/7.svg", {
                                                    width: 25,
                                                    height: 25
                                                });
                                            }

                                            function create() {
                                                particle1 = this.add.particles('1');
                                                particle2 = this.add.particles('2');
                                                particle3 = this.add.particles('3');
                                                particle4 = this.add.particles('4');
                                                particle5 = this.add.particles('5');
                                                particle6 = this.add.particles('6');
                                                particle7 = this.add.particles('7');

                                                particle1.createEmitter({

                                                    speed: 200,
                                                    angle: 180,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle2.createEmitter({

                                                    speed: 200,
                                                    angle: 180,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle3.createEmitter({

                                                    speed: 200,
                                                    angle: 180,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle4.createEmitter({

                                                    speed: 200,
                                                    angle: 180,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle5.createEmitter({

                                                    speed: 200,
                                                    angle: 180,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle6.createEmitter({

                                                    speed: 200,
                                                    angle: 180,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle7.createEmitter({

                                                    speed: 200,
                                                    angle: 180,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle1.createEmitter({

                                                    speed: 200,
                                                    angle: 360,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle2.createEmitter({

                                                    speed: 200,
                                                    angle: 360,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle3.createEmitter({

                                                    speed: 200,
                                                    angle: 360,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle4.createEmitter({

                                                    speed: 200,
                                                    angle: 360,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle5.createEmitter({

                                                    speed: 200,
                                                    angle: 360,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle6.createEmitter({

                                                    speed: 200,
                                                    angle: 360,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                                particle7.createEmitter({

                                                    speed: 200,
                                                    angle: 360,
                                                    velocity: 300,
                                                    gravityY: 300,
                                                    rotate: {
                                                        onEmit: (particle) => {
                                                            return 0
                                                        },
                                                        onUpdate: (particle) => {
                                                            return particle.angle + 1
                                                        },
                                                    },
                                                    frequency: 65,

                                                    lifespan: 5000,
                                                    x: {
                                                        min: 0,
                                                        max: game.config.width
                                                    },
                                                    y: -50
                                                });
                                            }
                                        }
                                    }, 320)
                                    let thisinterval;
                                    let clicked = clickCount;
                                    setTimeout(function () {
                                        thisinterval = setInterval(function () {
                                            if (clicked < clickCount) {
                                                clearInterval(thisinterval);
                                                clickCount = 0;
                                                game.destroy()
                                                document.body.removeChild(container);
                                            }
                                        }, 1)
                                    }, 1000)
                                }, 400)
                            }
                            clickCount++
                        })
                    }
                    //.
                })
        } else {
            const blueStrings = capsule.blues.map(({
                name,
                chance
            }) => `<div style="color:#fff">${name}: ${chance}%</div>`);
            const outputHtml = `<div><div style="color:#fff; opacity: 1;">Pack Rates:</div>${blueStrings.join('')}</div>`;
            let artsContainer = $('<div>').addClass('arts__modal___VpEAD-camelCase')
            let formContainer = $('<form>').addClass('styles__container___1BPm9-camelCase');
            let holderContainer = $('<div>').addClass('styles__holder___3CEfN-camelCase');
            let buttonContainer = $('<div>').addClass('styles__buttonContainer___2EaVD-camelCase');
            let yesButton = $('<div>').addClass('styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase').attr('id', 'marketyes').attr('role', 'button')
            let yesShadow = $('<div>').addClass('styles__shadow___3GMdH-camelCase');
            let yesEdge = $('<div>').addClass('styles__edge___3eWfq-camelCase').css('background-color', 'rgb(32, 50, 150)');
            let yesFront = $('<div>').addClass('styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase').css('background-color', 'rgb(32, 50, 150)').text('Yes');
            let noButton = $('<div>').addClass('styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase').attr('id', 'marketno').attr('role', 'button')
            let noShadow = $('<div>').addClass('styles__shadow___3GMdH-camelCase');
            let noEdge = $('<div>').addClass('styles__edge___3eWfq-camelCase').css('background-color', 'rgb(32, 50, 150)');
            let noFront = $('<div>').addClass('styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase').css('background-color', 'rgb(32, 50, 150)').text('No');
            yesButton.append(yesShadow);
            yesButton.append(yesEdge);
            yesButton.append(yesFront);
            noButton.append(noShadow);
            noButton.append(noEdge);
            noButton.append(noFront);
            buttonContainer.append(yesButton);
            buttonContainer.append(noButton);
            holderContainer.append(buttonContainer);
            formContainer.append(`<div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">Purchase the ${capsule.name} Capsule <i style="color:#fff" class="styles__rateIcon___11Qwv-camelCase far fa-question-circle" currentitem="false"></i> for ${capsule.value} tokens?<div class="whateverthisis alsothis">${outputHtml}</div></div></div>`)
            formContainer.append(holderContainer);
            artsContainer.append(formContainer)
            $('body').append(artsContainer);
            document.getElementById("marketno").onclick = () => {
                artsContainer.remove()
            }
            document.getElementById("marketyes").onclick = () => {
                document.getElementById("tokenbalance").innerText = blulet.userdata.tokens - capsule.value
                artsContainer.remove()
                clickCount = 0;
                let bluefromcapsule;
                fetch('/api/open', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'authorization': blulet.tokenraw,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "capsule": `${capsule.name}`
                        })
                    })
                    .then(response => response.json())
                    .then(response => bluefromcapsule = response)
                    .then(bluefromcapsule => {
                        capsule = blulet.blues.find(array => {
                            return array.blues.find(blue => blue.name === bluefromcapsule.blue);
                        });
                        if (bluefromcapsule.error) {
                            $('body').append(`
        <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">Error: ${bluefromcapsule.error}</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 50, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 50, 150);">Okay</div></div></div></div></form></div>
        `)
                            document.getElementById("okay").onclick = () => {
                                $('.arts__modal___VpEAD-camelCase').remove()
                            }
                        } else {
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
                                .then(response => document.getElementById("tokenbalance").innerText = response.tokens.toLocaleString("en-US"))
                            $('body').append(`
            <div id="capsuleContainer" class="capsuleContainer"><div id="overlay" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; z-index: 10; cursor: pointer;"></div><div id="background" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background: radial-gradient(circle, #${capsule.colors[0]}, #${capsule.colors[1]}); z-index: 8;"></div><div id="capsule" class="trianglecontainer"><img id="capsuletop"class="capsuletop" src="media/capsules/other/top.png"><img src="/media/capsules/${capsule.name}/bottom.png"></div></div>
            `)

                            let overlay = document.getElementById("overlay")
                            let capsuletop = document.getElementById("capsuletop")
                            overlay.addEventListener("click", function () {
                                if (clickCount === 0) {
                                    capsuletop.style.cssText = "animation: opencapsule .8s forwards"
                                    setTimeout(function () {
                                        let capsule2 = document.getElementById("capsule")
                                        capsule2.style.cssText = "animation: fade-out 0.2s forwards"
                                        let chanceandnew;
                                        if (bluefromcapsule.new === true) {
                                            chanceandnew = `${capsule.blues.find(item => item.name === bluefromcapsule.blue).chance}% - NEW!`
                                        } else {
                                            chanceandnew = `${capsule.blues.find(item => item.name === bluefromcapsule.blue).chance}%`
                                        }
                                        let color;
                                        let backgroundId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
                                        let background = document.getElementById("background")
                                        background.id = backgroundId
                                        let openanimation;
                                        let container = document.getElementById("capsuleContainer")
                                        let blue = capsule.blues.find(item => item.name === bluefromcapsule.blue)
                                        if (blue.rarity === "Uncommon") {
                                            color = "#4bc22e"
                                            openanimation = "styles__openingContainer___2OmG9-camelCase"
                                        } else if (blue.rarity === "Rare") {
                                            color = "#0a14fa"
                                            openanimation = "styles__openingContainer___2OmG9-camelCase"
                                        } else if (blue.rarity === "Epic") {
                                            color = "#be0000"
                                            openanimation = "styles__openingContainerEpic___3TzCR-camelCase"
                                        } else if (blue.rarity === "Legendary") {
                                            color = "#ff910f"
                                            openanimation = "styles__openingContainerLegendary___RbJZ_-camelCase"
                                        } else if (blue.rarity === "Chroma") {
                                            color = "#00ccff"
                                            openanimation = "styles__openingContainerChroma___3VBd5-camelCase"
                                        } else if (blue.rarity === "Mystical") {
                                            color = "#a335ee"
                                            openanimation = "styles__openingContainerChroma___3VBd5-camelCase"
                                        }
                                        $(".capsuleContainer").append(`
          <div class="styles__openContainer___3paFG-camelCase ${openanimation}"><img src="/media/capsules/${capsule.name}/background.png" alt="Background" class="styles__blookBackground___3rt4N-camelCase" draggable="false"><div class="styles__blookContainer___36LK2-camelCase styles__unlockedBlookImage___wC4gr-camelCase"><img src="/media/capsules/${capsule.name}/blues/${bluefromcapsule.blue}.png" draggable="false" class="styles__blook___1R6So-camelCase"></div><div class="styles__unlockedText___1diat-camelCase"><div class="styles__unlockedBlook___2pr1Z-camelCase" style="font-size: 40px;"><div style="font-family: Titan One,sans-serif;display: block; white-space: nowrap;color:#fff">${bluefromcapsule.blue}</div></div><div class="styles__rarityText___1PfSA-camelCase"style="font-family: Titan One,sans-serif;color:${color}">${bluefromcapsule.rarity}</div></div><div class="styles__bottomText___3_k10-camelCase">${chanceandnew}</div><div class="styles__bottomShadow___10ZLG-camelCase"></div></div>
          `)
                                        setTimeout(function () {
                                            if (blue.rarity === "Uncommon") {
                                                let config = {
                                                    type: Phaser.WEBGL,
                                                    width: window.innerWidth,
                                                    height: window.innerHeight,
                                                    parent: document.getElementById(backgroundId),
                                                    render: {
                                                        transparent: true
                                                    },
                                                    scene: {
                                                        preload: preload,
                                                        create: create
                                                    }
                                                };

                                                game = new Phaser.Game(config);

                                                function preload() {
                                                    this.load.svg("1", "https://media.blooket.com/image/upload/v1658567787/Media/market/particles/square_green.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("2", "https://media.blooket.com/image/upload/v1658567787/Media/market/particles/square_light_green.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("3", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/circle_dark_green.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("4", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/serpentine_dark_green.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("5", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/triangle_light_green.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("6", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/serpentine_light_green.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("7", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/triangle_green.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                }

                                                function create() {
                                                    particle1 = this.add.particles('1');
                                                    particle2 = this.add.particles('2');
                                                    particle3 = this.add.particles('3');
                                                    particle4 = this.add.particles('4');
                                                    particle5 = this.add.particles('5');
                                                    particle6 = this.add.particles('6');
                                                    particle7 = this.add.particles('7');

                                                    let emitter1 = particle1.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 800
                                                        },
                                                        angle: {
                                                            min: -115,
                                                            max: -65
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        velocityFromRotation: true,
                                                        gravityY: 700,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth / 2 - 25,
                                                            max: window.innerWidth / 2 + 25
                                                        },
                                                        y: window.innerHeight / 2 + 25,
                                                    });

                                                    let emitter2 = particle2.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 800
                                                        },
                                                        angle: {
                                                            min: -115,
                                                            max: -65
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        velocityFromRotation: true,
                                                        gravityY: 700,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth / 2 - 25,
                                                            max: window.innerWidth / 2 + 25
                                                        },
                                                        y: window.innerHeight / 2 + 25,
                                                    });

                                                    let emitter3 = particle3.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 800
                                                        },
                                                        angle: {
                                                            min: -115,
                                                            max: -65
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        velocityFromRotation: true,
                                                        gravityY: 700,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth / 2 - 25,
                                                            max: window.innerWidth / 2 + 25
                                                        },
                                                        y: window.innerHeight / 2 + 25,
                                                    });

                                                    let emitter4 = particle4.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 800
                                                        },
                                                        angle: {
                                                            min: -115,
                                                            max: -65
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        velocityFromRotation: true,
                                                        gravityY: 700,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth / 2 - 25,
                                                            max: window.innerWidth / 2 + 25
                                                        },
                                                        y: window.innerHeight / 2 + 25,
                                                    });

                                                    let emitter5 = particle5.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 800
                                                        },
                                                        angle: {
                                                            min: -115,
                                                            max: -65
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        velocityFromRotation: true,
                                                        gravityY: 700,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth / 2 - 25,
                                                            max: window.innerWidth / 2 + 25
                                                        },
                                                        y: window.innerHeight / 2 + 25,
                                                    });

                                                    let emitter6 = particle6.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 800
                                                        },
                                                        angle: {
                                                            min: -115,
                                                            max: -65
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        velocityFromRotation: true,
                                                        gravityY: 700,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth / 2 - 25,
                                                            max: window.innerWidth / 2 + 25
                                                        },
                                                        y: window.innerHeight / 2 + 25,
                                                    });

                                                    let emitter7 = particle7.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 800
                                                        },
                                                        angle: {
                                                            min: -115,
                                                            max: -65
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        velocityFromRotation: true,
                                                        gravityY: 700,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth / 2 - 25,
                                                            max: window.innerWidth / 2 + 25
                                                        },
                                                        y: window.innerHeight / 2 + 25,
                                                    });

                                                    setTimeout(() => {
                                                        emitter1.stop();
                                                        emitter2.stop();
                                                        emitter3.stop();
                                                        emitter4.stop();
                                                        emitter5.stop();
                                                        emitter6.stop();
                                                        emitter7.stop();
                                                    }, 1500);
                                                }
                                            } else if (blue.rarity === "Rare") {
                                                let config = {
                                                    type: Phaser.WEBGL,
                                                    width: window.innerWidth,
                                                    height: window.innerHeight,
                                                    parent: document.getElementById(backgroundId),
                                                    render: {
                                                        transparent: true
                                                    },
                                                    scene: {
                                                        preload: preload,
                                                        create: create
                                                    }
                                                };

                                                game = new Phaser.Game(config);

                                                function preload() {
                                                    this.load.svg("1", "https://media.blooket.com/image/upload/v1658567765/Media/market/particles/square_light_blue.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("2", "https://media.blooket.com/image/upload/v1658567765/Media/market/particles/square_dark_blue.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("3", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/triangle_blue.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("4", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/serpentine_blue.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("5", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/triangle_light_blue.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("6", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/serpentine_light_blue.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("7", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/circle_dark_blue.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                }

                                                function create() {
                                                    particle1 = this.add.particles('1');
                                                    particle2 = this.add.particles('2');
                                                    particle3 = this.add.particles('3');
                                                    particle4 = this.add.particles('4');
                                                    particle5 = this.add.particles('5');
                                                    particle6 = this.add.particles('6');
                                                    particle7 = this.add.particles('7');

                                                    let emitter1 = particle1.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -70,
                                                            max: -20
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: -25,
                                                            max: 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter2 = particle2.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -70,
                                                            max: -20
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: -25,
                                                            max: 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter3 = particle3.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -70,
                                                            max: -20
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: -25,
                                                            max: 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter4 = particle4.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -70,
                                                            max: -20
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: -25,
                                                            max: 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter5 = particle5.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -70,
                                                            max: -20
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: -25,
                                                            max: 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter6 = particle6.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -70,
                                                            max: -20
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: -25,
                                                            max: 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter7 = particle7.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -70,
                                                            max: -20
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: -25,
                                                            max: 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter8 = particle1.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -160,
                                                            max: -110
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth - 25,
                                                            max: window.innerWidth + 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter9 = particle2.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -160,
                                                            max: -110
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth - 25,
                                                            max: window.innerWidth + 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter10 = particle3.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -160,
                                                            max: -110
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth - 25,
                                                            max: window.innerWidth + 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter11 = particle4.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -160,
                                                            max: -110
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth - 25,
                                                            max: window.innerWidth + 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter12 = particle5.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -160,
                                                            max: -110
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth - 25,
                                                            max: window.innerWidth + 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter13 = particle6.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -160,
                                                            max: -110
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth - 25,
                                                            max: window.innerWidth + 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    let emitter14 = particle7.createEmitter({

                                                        speed: {
                                                            min: 700,
                                                            max: 750
                                                        },
                                                        angle: {
                                                            min: -160,
                                                            max: -110
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        gravityY: 500,
                                                        frequency: 75,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: window.innerWidth - 25,
                                                            max: window.innerWidth + 25
                                                        },
                                                        y: window.innerHeight,
                                                    });

                                                    setTimeout(() => {
                                                        emitter1.stop();
                                                        emitter2.stop();
                                                        emitter3.stop();
                                                        emitter4.stop();
                                                        emitter5.stop();
                                                        emitter6.stop();
                                                        emitter7.stop();
                                                        emitter8.stop();
                                                        emitter9.stop();
                                                        emitter10.stop();
                                                        emitter11.stop();
                                                        emitter12.stop();
                                                        emitter13.stop();
                                                        emitter14.stop();
                                                    }, 1500);
                                                }
                                            } else if (blue.rarity === "Epic") {
                                                let config = {
                                                    type: Phaser.WEBGL,
                                                    width: window.innerWidth,
                                                    height: window.innerHeight,
                                                    parent: document.getElementById(backgroundId),
                                                    render: {
                                                        transparent: true
                                                    },
                                                    scene: {
                                                        preload: preload,
                                                        create: create
                                                    }
                                                };

                                                game = new Phaser.Game(config);

                                                function preload() {
                                                    this.load.svg("1", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/red.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("2", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/light_red.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("3", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/serpentine_red.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("4", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/serpentine_dark_red.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("5", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/triangle_red.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("6", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/triangle_light_red.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("7", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/circle_dark_red.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                }

                                                function create() {
                                                    particle1 = this.add.particles('1');
                                                    particle2 = this.add.particles('2');
                                                    particle3 = this.add.particles('3');
                                                    particle4 = this.add.particles('4');
                                                    particle5 = this.add.particles('5');
                                                    particle6 = this.add.particles('6');
                                                    particle7 = this.add.particles('7');

                                                    particle1.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -50,
                                                            max: 0
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: 0,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle2.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -50,
                                                            max: 0
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: 0,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle3.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -50,
                                                            max: 0
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: 0,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle4.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -50,
                                                            max: 0
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: 0,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle5.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -50,
                                                            max: 0
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: 0,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle6.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -50,
                                                            max: 0
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: 0,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle7.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -50,
                                                            max: 0
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: 0,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle1.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -180,
                                                            max: -130
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: game.config.width,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle2.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -180,
                                                            max: -130
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: game.config.width,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle3.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -180,
                                                            max: -130
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: game.config.width,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle4.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -180,
                                                            max: -130
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: game.config.width,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle5.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -180,
                                                            max: -130
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: game.config.width,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle6.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -180,
                                                            max: -130
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: game.config.width,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });

                                                    particle7.createEmitter({

                                                        speed: 650,
                                                        angle: {
                                                            min: -180,
                                                            max: -130
                                                        },
                                                        velocity: {
                                                            min: 600,
                                                            max: 750
                                                        },
                                                        gravityY: 400,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: game.config.width,
                                                        y: {
                                                            min: 0,
                                                            max: game.config.width
                                                        }
                                                    });
                                                }
                                            } else if (blue.rarity === "Legendary") {
                                                let config = {
                                                    type: Phaser.WEBGL,
                                                    width: window.innerWidth,
                                                    height: window.innerHeight,
                                                    parent: document.getElementById(backgroundId),
                                                    render: {
                                                        transparent: true
                                                    },
                                                    scene: {
                                                        preload: preload,
                                                        create: create
                                                    }
                                                };

                                                game = new Phaser.Game(config);

                                                function preload() {
                                                    this.load.svg("1", "https://media.blooket.com/image/upload/v1658567740/Media/market/particles/square_orange.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("2", "https://media.blooket.com/image/upload/v1658567740/Media/market/particles/square_light_orange.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("3", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/circle_orange.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("4", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/serpentine_orange.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("5", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/serpentine_light_orange.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("6", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/circle_dark_orange.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("7", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/triangle_dark_orange.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                }

                                                function create() {
                                                    particle1 = this.add.particles('1');
                                                    particle2 = this.add.particles('2');
                                                    particle3 = this.add.particles('3');
                                                    particle4 = this.add.particles('4');
                                                    particle5 = this.add.particles('5');
                                                    particle6 = this.add.particles('6');
                                                    particle7 = this.add.particles('7');

                                                    particle1.createEmitter({

                                                        speed: 500,
                                                        angle: 90,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle2.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle3.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle4.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle5.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle6.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle7.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                }
                                            } else if (blue.rarity === "Chroma") {
                                                let config = {
                                                    type: Phaser.WEBGL,
                                                    width: window.innerWidth,
                                                    height: window.innerHeight,
                                                    parent: document.getElementById(backgroundId),
                                                    render: {
                                                        transparent: true
                                                    },
                                                    scene: {
                                                        preload: preload,
                                                        create: create
                                                    }
                                                };

                                                game = new Phaser.Game(config);

                                                function preload() {
                                                    this.load.svg("1", "https://media.blooket.com/image/upload/v1658790246/Media/market/particles/square_turquoise.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("2", "https://media.blooket.com/image/upload/v1658790246/Media/market/particles/square_light_turquoise.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("3", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/serpentine_dark_turquoise.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("4", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/serpentine_turquoise.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("5", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/triangle_turquoise.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("6", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/triangle_light_turquoise.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("7", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/circle_dark_turquoise.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                }

                                                function create() {
                                                    particle1 = this.add.particles('1');
                                                    particle2 = this.add.particles('2');
                                                    particle3 = this.add.particles('3');
                                                    particle4 = this.add.particles('4');
                                                    particle5 = this.add.particles('5');
                                                    particle6 = this.add.particles('6');
                                                    particle7 = this.add.particles('7');

                                                    particle1.createEmitter({

                                                        speed: 500,
                                                        angle: 90,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle2.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle3.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle4.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle5.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle6.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });

                                                    particle7.createEmitter({

                                                        angle: 90,
                                                        speed: 500,
                                                        velocity: 180,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                }
                                            } else if (blue.rarity === "Mystical") {
                                                let config = {
                                                    type: Phaser.WEBGL,
                                                    width: window.innerWidth,
                                                    height: window.innerHeight,
                                                    parent: document.getElementById(backgroundId),
                                                    render: {
                                                        transparent: true
                                                    },
                                                    scene: {
                                                        preload: preload,
                                                        create: create
                                                    }
                                                };

                                                game = new Phaser.Game(config);

                                                function preload() {
                                                    this.load.svg("1", "/media/capsules/other/1.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("2", "/media/capsules/other/2.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                    this.load.svg("3", "/media/capsules/other/3.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("4", "/media/capsules/other/4.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("5", "/media/capsules/other/5.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("6", "/media/capsules/other/6.svg", {
                                                        width: 30,
                                                        height: 30
                                                    });
                                                    this.load.svg("7", "/media/capsules/other/7.svg", {
                                                        width: 25,
                                                        height: 25
                                                    });
                                                }

                                                function create() {
                                                    particle1 = this.add.particles('1');
                                                    particle2 = this.add.particles('2');
                                                    particle3 = this.add.particles('3');
                                                    particle4 = this.add.particles('4');
                                                    particle5 = this.add.particles('5');
                                                    particle6 = this.add.particles('6');
                                                    particle7 = this.add.particles('7');

                                                    particle1.createEmitter({

                                                        speed: 200,
                                                        angle: 180,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle2.createEmitter({

                                                        speed: 200,
                                                        angle: 180,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle3.createEmitter({

                                                        speed: 200,
                                                        angle: 180,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle4.createEmitter({

                                                        speed: 200,
                                                        angle: 180,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle5.createEmitter({

                                                        speed: 200,
                                                        angle: 180,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle6.createEmitter({

                                                        speed: 200,
                                                        angle: 180,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle7.createEmitter({

                                                        speed: 200,
                                                        angle: 180,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle1.createEmitter({

                                                        speed: 200,
                                                        angle: 360,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle2.createEmitter({

                                                        speed: 200,
                                                        angle: 360,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle3.createEmitter({

                                                        speed: 200,
                                                        angle: 360,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle4.createEmitter({

                                                        speed: 200,
                                                        angle: 360,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle5.createEmitter({

                                                        speed: 200,
                                                        angle: 360,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle6.createEmitter({

                                                        speed: 200,
                                                        angle: 360,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                    particle7.createEmitter({

                                                        speed: 200,
                                                        angle: 360,
                                                        velocity: 300,
                                                        gravityY: 300,
                                                        rotate: {
                                                            onEmit: (particle) => {
                                                                return 0
                                                            },
                                                            onUpdate: (particle) => {
                                                                return particle.angle + 1
                                                            },
                                                        },
                                                        frequency: 65,

                                                        lifespan: 5000,
                                                        x: {
                                                            min: 0,
                                                            max: game.config.width
                                                        },
                                                        y: -50
                                                    });
                                                }
                                            }
                                        }, 320)
                                        let thisinterval;
                                        let clicked = clickCount;
                                        setTimeout(function () {
                                            thisinterval = setInterval(function () {
                                                if (clicked < clickCount) {
                                                    clearInterval(thisinterval);
                                                    clickCount = 0;
                                                    game.destroy()
                                                    document.body.removeChild(container);
                                                }
                                            }, 1)
                                        }, 1000)
                                    }, 400)
                                }
                                clickCount++
                            })
                        }
                    })
            }
        }
    }
    document.getElementById("instantOpen").onclick = () => {
        if (localStorage.getItem("instantopen") === "true") {
            localStorage.setItem("instantopen", "false")
            document.getElementById("instantOpen").innerText = "Instant Open: Off"
        } else {
            localStorage.setItem("instantopen", "true")
            document.getElementById("instantOpen").innerText = "Instant Open: On"
        }

    }
    if (localStorage.getItem("instantopen") === "true") {
        document.getElementById("instantOpen").innerText = "Instant Open: On"
    } else {
        document.getElementById("instantOpen").innerText = "Instant Open: Off"
    }
    document.getElementById("tokenbalance").innerText = blulet.userdata.tokens.toLocaleString("en-US")
    blulet.blues.forEach(Object => {
        if (Object.hidden === true) return;
        $('#packswrapper').append(`
    <div class="styles__packContainer___3RwSU-camelCase" id="${Object.name}" role="button" style="background: radial-gradient(circle, #${Object.colors[0]}, #${Object.colors[1]});"><div class="styles__packImgContainer___3NABW-camelCase"><img src="/media/capsules/${Object.name}/capsule.png" class="styles__packShadow___2TA17-camelCase"><img src="/media/capsules/${Object.name}/capsule.png" class="styles__packImg___3to1S-camelCase"></div><div class="styles__packBottom___37drt-camelCase"><img src="/media/misc/token.png" class="styles__packPriceImg___1FaDF-camelCase">${Object.value}</div></div>
    `)
        document.getElementById(`${Object.name}`).onclick = () => {
            opencapsule(Object)
        }
    })
})