let projects = [
    new Project("Football Simulation Game", "I made this project the summer after high school. It attempts to simulate being a GM/coach in the NFL. Features include drafts, trades, games simulated play by play, playcalling, and plenty of stats. From this project, I've learned the importance of keeping projects maintainable.", "footballproject.html"),
    new Project("Foosball Data Collection", "I started this project my sophomore year of college. The program reads in a list of games and compiles stats including wins/loss records, goals scored, winning streaks, ELO, and game outcome probabilities. Some features include game filtering, tables of stats, score predictions and simulations, and calculations of records. This project helped me learn to make an interface with tkinter, create graphs in matplotlib, and to use dataframes in pandas.", "foosballproject.html"),
    new Project("Spotify API Project", "This is a current project. I am learning how to interact with Spotify's API and how to use Flask to build a website.", "not_implemented_yet.html"),
    new Project("Football Environment Reinforcement Learning", "After taking a reinforcement learning class, I was interested to dive deeper. I created a reinforcement learning environment modeled after a simple retro football game that I owned. I have not had much success yet with learning, so this is still a current project. From this project, I am gaining experience in tkinter, pytorch, and reinforcement learning techniques like Deep Q-Learning.", "not_implemented_yet.html"),
    new Project("Yahtzee", "Sometime during the covid lockdown in college, I created a command line yahtzee game. It lets you play standard yahtzee on the command line with multiple players. It also has some options to mess with parameters like how many dice there are and how many rolls there are per turn. This project gave me experience working with C++.", "not_implemented_yet.html")
]

function changeScreen(screen) {
    document.location.href = screen;
}

function loadNavbar(element='#topnav', html='../template/topnav.html') {
    $(element).load(html, function() {
        const dropDownElement = document.getElementById("drop-down-items");
        if (dropDownElement == null) {return;}
        let addHtml = "";
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
    let html = "";
    for (const project of projects) {
        html += "<div class='project'>" +
                    "<h3> <a href='" + project.link + "'>" + project.name + "</a> </h3>" +
                    "<p>" + project.description +  "</p>" + 
                "</div>";
    }
    projectElement.innerHTML = html;
}

function loadHtmlToElt(element, html) {
    const elt = document.getElementById(element);
    if (elt == null) { return; }
    elt.innerHTML = html;
}