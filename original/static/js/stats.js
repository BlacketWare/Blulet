startLoading()
$(function reset() {
    if (!blulet) return setTimeout(reset, 1)
    stopLoading()
    const urlParams = new URLSearchParams(window.location.search);
    const userValue = urlParams.get('user');
    const idValue = urlParams.get('id')

    if (userValue) {
        fetch('/api/finduser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'authorization': blulet.tokenraw,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": `${userValue}`
                })
            }).then(response => response.json())
            .then(response => {
                if (response.error) {
                    document.getElementById("profileblue").src = blulet.userdata.pfp
                    document.getElementById("profileuser").innerText = blulet.userdata.username
                    document.getElementById("role").innerText = blulet.userdata.role
                    document.getElementById('tokens').innerText = blulet.userdata.tokens.toLocaleString("en-US")
                    document.getElementById('opened').innerText = blulet.userdata.opened.toLocaleString("en-US")
                    // document.getElementById("id").innerText = blulet.userdata.id
                    $(".styles__headerBanner___3Uuuk-camelCase").click(() => {
                        $("#profileuser").html(`${blulet.userdata.id}`)
                        $("#profileuser").css("font-size", "18px")
                    });


                    document.getElementById('blues').innerText = blulet.userdata.blues.length.toLocaleString("en-US")
                    $('.arts__modal___VpEAD-camelCase').remove()
                    $("body").append(`
                <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">${response.error}</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 39, 150);">Okay</div></div></div></div></form></div>
                `)
                    document.getElementById("okay").onclick = () => {
                        $('.arts__modal___VpEAD-camelCase').remove()
                    }
                } else {
                    if (response.username) {
                        document.getElementById("profileblue").src = response.pfp
                        document.getElementById("profileuser").innerText = response.username
                        document.getElementById("role").innerText = response.role
                        document.getElementById('tokens').innerText = response.tokens.toLocaleString("en-US")
                        document.getElementById('opened').innerText = response.opened.toLocaleString("en-US")
                        $(".styles__headerBanner___3Uuuk-camelCase").click(() => {
                            $("#profileuser").html(`${response.id}`)
                            $("#profileuser").css("font-size", "18px")
                        });
                        document.getElementById('blues').innerText = response.blues.length.toLocaleString("en-US")
                        $('.arts__modal___VpEAD-camelCase').remove()
                    } else {
                        document.getElementById("profileblue").src = blulet.userdata.pfp
                        document.getElementById("profileuser").innerText = blulet.userdata.username
                        document.getElementById("role").innerText = blulet.userdata.role
                        $(".styles__headerBanner___3Uuuk-camelCase").click(() => {
                            $("#profileuser").html(`${response.id}`)
                            $("#profileuser").css("font-size", "18px")
                        });
                        document.getElementById('tokens').innerText = blulet.userdata.tokens.toLocaleString("en-US")
                        document.getElementById('opened').innerText = blulet.userdata.opened.toLocaleString("en-US")
                        document.getElementById('blues').innerText = blulet.userdata.blues.length.toLocaleString("en-US")
                        $('.arts__modal___VpEAD-camelCase').remove()
                        $("body").append(`
                    <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">An Unexpected Error Occurred</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 39, 150);">Okay</div></div></div></div></form></div>
                    `)
                        document.getElementById("okay").onclick = () => {
                            $('.arts__modal___VpEAD-camelCase').remove()
                        }
                    }
                }
            })
    } else if (idValue) {
        fetch('/api/finduser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'authorization': blulet.tokenraw,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": `${idValue}`
                })
            }).then(response => response.json())
            .then(response => {
                if (response.error) {
                    document.getElementById("profileblue").src = blulet.userdata.pfp
                    document.getElementById("profileuser").innerText = blulet.userdata.username
                    document.getElementById("role").innerText = blulet.userdata.role
                    document.getElementById('tokens').innerText = blulet.userdata.tokens.toLocaleString("en-US")
                    document.getElementById('opened').innerText = blulet.userdata.opened.toLocaleString("en-US")
                    $(".styles__headerBanner___3Uuuk-camelCase").click(() => {
                        $("#profileuser").html(`${blulet.userdata.id}`)
                        $("#profileuser").css("font-size", "18px");
                        $("#profileuser").css("cursor", "pointer");
                    });
                    document.getElementById('blues').innerText = blulet.userdata.blues.length.toLocaleString("en-US")
                    $('.arts__modal___VpEAD-camelCase').remove()
                    $("body").append(`
                <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">${response.error}</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 39, 150);">Okay</div></div></div></div></form></div>
                `)
                    document.getElementById("okay").onclick = () => {
                        $('.arts__modal___VpEAD-camelCase').remove()
                    }
                } else {
                    if (response.username) {
                        document.getElementById("profileblue").src = response.pfp
                        document.getElementById("profileuser").innerText = response.username
                        document.getElementById("role").innerText = response.role
                        document.getElementById('tokens').innerText = response.tokens.toLocaleString("en-US")
                        document.getElementById('opened').innerText = response.opened.toLocaleString("en-US")
                        $(".styles__headerBanner___3Uuuk-camelCase").click(() => {
                            $("#profileuser").html(`${response.id}`)
                            $("#profileuser").css("font-size", "18px")
                            $("#profileuser").css("cursor", "pointer");
                        });
                        document.getElementById('blues').innerText = response.blues.length.toLocaleString("en-US")
                        $('.arts__modal___VpEAD-camelCase').remove()
                    } else {
                        document.getElementById("profileblue").src = blulet.userdata.pfp
                        document.getElementById("profileuser").innerText = blulet.userdata.username
                        document.getElementById("role").innerText = blulet.userdata.role
                        $(".styles__headerBanner___3Uuuk-camelCase").click(() => {
                            $("#profileuser").html(`${response.id}`)
                            $("#profileuser").css("font-size", "18px")
                            $("#profileuser").css("cursor", "pointer");
                        });
                        document.getElementById('tokens').innerText = blulet.userdata.tokens.toLocaleString("en-US")
                        document.getElementById('opened').innerText = blulet.userdata.opened.toLocaleString("en-US")
                        document.getElementById('blues').innerText = blulet.userdata.blues.length.toLocaleString("en-US")
                        $('.arts__modal___VpEAD-camelCase').remove()
                        $("body").append(`
                    <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">An Unexpected Error Occurred</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 39, 150);">Okay</div></div></div></div></form></div>
                    `)
                        document.getElementById("okay").onclick = () => {
                            $('.arts__modal___VpEAD-camelCase').remove()
                        }
                    }
                }
            })
    } else {
        document.getElementById("profileblue").src = blulet.userdata.pfp
        document.getElementById("profileuser").innerText = blulet.userdata.username
        document.getElementById("role").innerText = blulet.userdata.role
        // document.getElementById("id").innerText = blulet.userdata.id
        $(".styles__headerBanner___3Uuuk-camelCase").click(() => {
            $("#profileuser").html(`${blulet.userdata.id}`)
            $("#profileuser").css("font-size", "18px")
            $("#profileuser").css("cursor", "pointer");
        });
        document.getElementById('tokens').innerText = blulet.userdata.tokens.toLocaleString("en-US")
        document.getElementById('opened').innerText = blulet.userdata.opened.toLocaleString("en-US")
        document.getElementById('blues').innerText = blulet.userdata.blues.length.toLocaleString("en-US")
    }
    document.getElementById("profileblue").onclick = () => {
        if (document.getElementById("profileuser").innerText === blulet.userdata.username) {
            let blues;
            let capsule;
            $('body').append(`<div class="arts__modal___VpEAD-camelCase"><div id="bigbutton" class="arts__modalButton___1y_HF-camelCase" role="button" tabindex="0"></div><div class="styles__container___3St5B-camelCase"><div class="styles__bluesHolder___1skET-camelCase"></div></div>`)
            document.getElementById("bigbutton").onclick = () => {
                $('.arts__modal___VpEAD-camelCase').remove()
            }
            blulet.userdata.blues.forEach(blue => {
                bluename = blue.blue
                capsule = blulet.blues.find(array => {
                    return array.blues.find(blue => blue.name === bluename);
                })
                $(".styles__bluesHolder___1skET-camelCase").append(`<div id="${blue.blue}" style="height: 69px;" class="styles__blookContainer___hvHJM-camelCase"  role="button"><div class="styles__blookContainer___36LK2-camelCase styles__blook___3FnM0-camelCase"><img src="/media/capsules/${capsule.name}/blues/${blue.blue}.png" alt="${blue.blue} blue" draggable="false" class="styles__blook___1R6So-camelCase"></div></div>`)
                document.getElementById(`${blue.blue}`).onclick = () => {

                    fetch('/api/setpfp', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'authorization': blulet.tokenraw,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "blue": `${blue.blue}`
                        })
                    })
                    bluename = blue.blue
                    capsule = blulet.blues.find(array => {
                        return array.blues.find(blue => blue.name === bluename);
                    })
                    let pfp = document.getElementById("profileblue")
                    pfp.src = `/media/capsules/${capsule.name}/blues/${blue.blue}.png`
                    document.getElementById('pfpimg').src = `/media/capsules/${capsule.name}/blues/${blue.blue}.png`
                    $('.arts__modal___VpEAD-camelCase').remove()
                }
            })
        } else {

        }
    }

    document.getElementById("view").onclick = () => {
        $('body').append(`
        <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase">Profile To View:</div><div class="styles__holder___3CEfN-camelCase"><div class="styles__numRow___xh98F-camelCase"><div class="styles__inputContainer___2Fn7J-camelCase styles__inputFilled___3AmpF-camelCase" style="width: 305px; margin: 0px;"><input class="styles__input___2vJSW-camelCase" id="input" style="width: 100%; text-align: center;" maxlength="16" placeholder="Username"></div></div></div><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="yes" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 39, 150);">View</div></div><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="no" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(38, 47, 175);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(38, 47, 175);">Cancel</div></div></div></form></div>
        `)
        document.getElementById("yes").onclick = () => {
            fetch('/api/finduser', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'authorization': blulet.tokenraw,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": `${document.getElementById("input").value}`
                    })
                }).then(response => response.json())
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
                        if (response.username) {
                            let pfp = document.getElementById("profileblue").src = response.pfp
                            document.getElementById("profileuser").innerText = response.username
                            document.getElementById("role").innerText = response.role
                            $(".styles__headerBanner___3Uuuk-camelCase").click(() => {
                                $("#profileuser").html(`${response.id}`)
                                $("#profileuser").css("font-size", "18px")
                                $("#profileuser").css("cursor", "pointer");
                            });
                            document.getElementById('tokens').innerText = response.tokens.toLocaleString("en-US")
                            document.getElementById('opened').innerText = response.opened.toLocaleString("en-US")
                            document.getElementById('blues').innerText = response.blues.length.toLocaleString("en-US")
                            $('.arts__modal___VpEAD-camelCase').remove()
                        } else {
                            $('.arts__modal___VpEAD-camelCase').remove()
                            $("body").append(`
                        <div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase" style="color:#fff"><div style="color:#fff">An Unexpected Error Occurred</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" id="okay" role="button"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: rgb(32, 39, 150);"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: rgb(32, 39, 150);">Okay</div></div></div></div></form></div>
                        `)
                            document.getElementById("okay").onclick = () => {
                                $('.arts__modal___VpEAD-camelCase').remove()
                            }
                        }
                    }
                })
        }
        document.getElementById("no").onclick = () => {
            $('.arts__modal___VpEAD-camelCase').remove()
        }
    }
})