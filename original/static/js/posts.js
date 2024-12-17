startLoading()
$(function reset() {
    if (!blulet) return setTimeout(reset, 1)

    htmlEncode = (s) => {
        let el = document.createElement("div");
        el.innerText = el.textContent = s;
        return el.innerHTML;
    }

    setTimeout(function () {
        fetch('/data/allposts', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: null
            })
            .then(response => response.json())
            .then(response => printres(response))
    }, 700)

    function printres(response) {
        let postarray = Object.entries(response.posts)
        for (let i = postarray.length - 1; i >= 0; i--) {
            const object = postarray[i][1];
            if (object.likes.includes(blulet.userdata.username)) {
                colorheart = "red"
            } else {
                colorheart = "white"
            }
            likecount = object.likes.length
            const element = document.createElement('div');
            element.innerHTML = `<h1>${htmlEncode(object.title)}</h1><text class="usertextpost">Author: <a href="/stats?user=${object.user}" class="styles__postLink___hU7nT-camelCase">${htmlEncode(object.user)}</a>

</text><br><i id="${postarray[i][0]}1" style="color: ${colorheart};font-size:25px" onclick="like('${postarray[i][0]}')" class="fas fa-heart"></i><text class="${postarray[i][0]}" style="font-size:25px"> ${likecount}</text><p>${htmlEncode(object.body)}</p>`;
            element.classList.add('styles__postbackground___2QwZS-camelCase')
            element.id = postarray[i][0]
            let explaination = document.getElementsByClassName("styles__postsHolder___1Z9ZS-camelCase")
            explaination[0].appendChild(element);
            if (i == 0) {
                stopLoading()
                start()
            }
        }
    }

    function updatechildren(response) {
        if ($('.arts__modal___VpEAD-camelCase')) {

        } else {

            let postarray = Object.entries(response.posts)
            for (let i = postarray.length - 1; i >= 0; i--) {
                if (document.getElementById(postarray[i][0]) !== null) {
                    const object = postarray[i][1];
                    if (object.likes.includes(blulet.userdata.username)) {
                        colorheart = "red"
                    } else {
                        colorheart = "white"
                    }
                    likecount = object.likes.length
                    document.getElementById(postarray[i][0]).innerHTML = `<h1>${htmlEncode(object.title)}</h1><text class="usertextpost">Author: ${htmlEncode(object.user)}</text><br><i id="${postarray[i][0]}1" style="color: ${colorheart};font-size:25px" onclick="like('${postarray[i][0]}')" class="fas fa-heart"></i><text class="${postarray[i][0]}" style="font-size:25px"> ${likecount}</text><p>${htmlEncode(object.body)}</p>`;
                } else if (document.getElementById(postarray[i][0]) == null) {
                    const object = postarray[i][1];
                    if (object.likes.includes(blulet.userdata.username)) {
                        colorheart = "red"
                    } else {
                        colorheart = "white"
                    }
                    likecount = object.likes.length
                    const element = document.createElement('div')
                    element.innerHTML = `<h1>${htmlEncode(object.title)}</h1><text class="usertextpost">Author: ${htmlEncode(object.user)}</text><br><i id="${postarray[i][0]}1" style="color: ${colorheart};font-size:25px" onclick="like('${postarray[i][0]}1')" class="fas fa-heart"></i><text class="${postarray[i][0]}" style="font-size:25px"> ${likecount}</text><p>${htmlEncode(object.body)}</p>`;
                    element.classList.add('styles__postbackground___2QwZS-camelCase')
                    element.id = postarray[i][0]
                    let explaination = document.getElementById("holder")
                    explaination.insertBefore(element, explaination.children[0]);
                }
            }
        }
    }

    function start() {
        setInterval(function () {
            fetch('/data/allposts', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: null
                })
                .then(response => response.json())
                .then(response => updatechildren(response))
        }, 5000)
    }
})

function like(postid) {
    fetch('/api/like', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "authorization": blulet.tokenraw
            },
            body: JSON.stringify({
                "postid": postid
            })
        }).then(response => response.json())
        .then(response => changecolor(response, postid))

}

function changecolor(response, postid) {
    if (response.error) {
        return;
    } else {
        if (document.getElementById(`${postid}1`).style.color == "white") {
            document.getElementById(`${postid}1`).style.color = "red"
            document.getElementsByClassName(postid)[0].innerText = ` ${Number(document.getElementsByClassName(postid)[0].innerText) + 1}`
        } else if (document.getElementById(`${postid}1`).style.color == "red") {
            document.getElementById(`${postid}1`).style.color = "white"
            document.getElementsByClassName(postid)[0].innerText = ` ${Number(document.getElementsByClassName(postid)[0].innerText) - 1}`
        }
    }
}