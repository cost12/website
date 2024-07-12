var projects = [new Project("Football Simulation Game", "Football game description", "footballproject.html"),
                new Project("Foosball Data Collection", "Foosball project description", "foosballproject.html"),
                new Project("Spotify API Project", "Spotify project description", "spotifyproject.html"),
                new Project("Football Environment Reinforcement Learning", "Reinforcement learning project description", "fbrlproject.html")
               ]

function changeScreen(screen) {
    document.location.href = screen;
}

function loadNavbar(element='#topnav', html='../template/topnav.html') {
    $(element).load(html, function() {
        const dropDownElement = document.getElementById("drop-down-items");
        if (dropDownElement == null) {return;}
        var addHtml = "";
        for (const project of projects) {
            addHtml +=  "<div class='drop-down-item'>" +
                            "<button onclick='changeScreen(\"" + project.link + "\")'>" + project.name + "</a>" +
                        "</div>";
        }
        dropDownElement.innerHTML = addHtml;
    });
}

function loadProjectDescs(element) {
    const projectElement = document.getElementById(element);
    if (projectElement == null) { return; }
    var html = "";
    for (const project of projects) {
        html += "<div class='project'>" +
                    "<h3> <a href='" + project.link + "'>" + project.name + "</a> </h3>" +
                    "<p>" + project.description +  "</p>" + 
                "</div>";
    }
    projectElement.innerHTML = html;
}