import json
import dominate
import dominate.tags as tags
import dominate.util as util

def create_index(projects, topnav, bottomnav):
    doc = dominate.document(title="Miles Harrison")
    with doc.head:
        tags.link(rel='stylesheet', href='static/styles/app.css')
        tags.script(src="http://code.jquery.com/jquery-1.11.0.min.js")

    doc += topnav

    with open("templates/indexbody.html",'r') as f:
        doc += util.raw(f.read())
    with doc:
        with tags.section(_class="projects"):
            tags.h1("My projects")
            tags.p("These are some projects I've worked on.")
            for project in projects:
                with tags.div(_class="project"):
                    tags.h3(tags.a(project["short_name"], href=project["link"]))
                    tags.p(project["description_preview"])
    doc += bottomnav
    doc += tags.script(src="scripts/app.js")
    return doc

def create_resume(topnav, bottomnav):
    doc = dominate.document(title="Miles Harrison")
    with doc.head:
        tags.link(rel='stylesheet', href='static/styles/app.css')
        tags.script(src="http://code.jquery.com/jquery-1.11.0.min.js")

    doc += topnav
    with open("templates/resumebody.html",'r') as f:
        doc += util.raw(f.read())
    doc += bottomnav
    doc += tags.script(src="scripts/app.js")
    return doc

def create_topnav(projects):
    navbar = tags.nav(_class="navbar")
    with navbar:
        with tags.div(_class="menu"):
            with tags.div(_class="menu-item"):
                tags.button("Home", onclick="changeScreen('index.html')")
            with tags.div(_class="menu-item"):
                tags.button("Resume", onclick="changeScreen('resume.html')")
            with tags.div(_class="menu-item"):
                with tags.div(_class="drop-down"):
                    tags.button("Projects")
                    with tags.div(_class="drop-down-content"):
                        for project in projects:
                            with tags.div(_class="drop-down-item"):
                                tags.button(project["short_name"], onclick=f"changeScreen('{project['''link''']}')")
    return navbar

def get_bottomnav():
    with open("templates/bottomnav.html",'r') as f:
        return util.raw(f.read())

def generate_html(project:dict[str,any], topnav, bottomnav):
    doc = dominate.document(title="Miles Harrison")

    with doc.head:
        tags.link(rel='stylesheet', href='static/styles/app.css')
        tags.script(src="http://code.jquery.com/jquery-1.11.0.min.js")

    doc += topnav
    with doc:
        #tags.section(_class="nav", id="topnav")
        with tags.div(_class="overview"):
            tags.h1(project["long_name"])
            lang_text = "Language" + ("s: " if len(project["languages"]) > 1 else ": ") + ", ".join(project["languages"])
            tags.p(lang_text)
            env_text = "Environment/Libraries: " + ", ".join(project["environment"])
            tags.p(env_text)
            learned_text = "Things I Learned: " + ", ".join(project["learned"])
            tags.p(learned_text)
            tags.p("GitHub: ", tags.a(project['github'], href=project['github']))
        with tags.div(_class="description"):
            tags.p(project["description_onpage"])
    #with tags.div(_class="project"):
    with open(project["bodyhtml"],'r') as f:
        doc += util.raw(f.read())
                
    doc += bottomnav
    doc += tags.script(src="scripts/app.js")

    return doc

def main():
    with open('data/projects.json') as file:
        data = json.load(file)
        topnav = create_topnav(data['projects'])
        bottomnav = get_bottomnav()
        for project in data['projects']:
            doc = generate_html(project, topnav, bottomnav)
            with open(project["link"], 'w') as f:
                f.write(doc.render())
        
        index = create_index(data["projects"], topnav, bottomnav)
        with open("index.html", 'w') as f:
            f.write(index.render())

        resume = create_resume(topnav,bottomnav)
        with open("resume.html", "w") as f:
            f.write(resume.render())

def test():
    with open('data/projects.json') as file:
        data = json.load(file)
        topnav = create_topnav(data['projects'])
        bottomnav = get_bottomnav()
        index = create_index(data["projects"], topnav, bottomnav)
        print(index.render())
        return
        for project in data['projects']:
            if project["short_name"] == "":
                continue
            doc = generate_html(project, topnav, bottomnav)
            print(doc.render())

if __name__=="__main__":
    if 1:
        main()
    else:
        test()