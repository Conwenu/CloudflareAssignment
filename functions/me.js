export function onRequest(context) {
    const entry = {
        "name": "Chigoziri Onwenu",
        "homepage": "None Available",
        "githubURL": "https://github.com/Conwenu",
        "interestingFact": "Soccer is my favorite sport.",
        "skills": ["Javascript", "Java", "SpringBoot", "React", "PostgreSQL", "MongoDB", "Express JS", "Node JS", "Docker", "Python", "Lua"],
    };
    return new Response(entry)
}