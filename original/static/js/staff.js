startLoading()
$(function reset() {
  if (!blulet) return setTimeout(reset, 1)
  stopLoading()

  if (blulet.userdata.role === "Common" || blulet.userdata.role === "Artist" || blulet.userdata.role === "Booster" || blulet.userdata.role === "Tester") {
    window.location.href = `${window.location.origin}/stats`
  } else {
    if (blulet.userdata.role === "Helper") {
      $(".arts__profileBody___eNPbH-camelCase").append(`
        ben
        `)
    } else if (blulet.userdata.role === "Mod") {

    } else if (blulet.userdata.role === "Admin") {

    } else if (blulet.userdata.role === "Owner") {

    }
  }
})