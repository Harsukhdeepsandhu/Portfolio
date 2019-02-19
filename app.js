var homePage, height, width, homeContainer, aboutPage, header, portfolioPage, contactPage, skillName;
var skillsContainer, skillNameLevel, projectContainer;
var skillStatus = ["80", "70", "65", "35", "70", "35", "30", "30", "40", "60", "70"];
var firstDisplay = true;

function varInit() {
    height = window.innerHeight;
    width = window.innerWidth;
    homePage = document.getElementById('home-page');
    homeContainer = document.getElementById('home-container');
    aboutPage = document.getElementById('about-page');
    header = document.getElementById('navbar');
    portfolioPage = document.getElementById('portfolio-page');
    contactPage = document.getElementById('contact-page');
    skillsContainer = document.getElementById('skills-container');
    skillName = document.getElementsByClassName('skill-name');
    skillNameLevel = document.getElementsByClassName('skill-name-level');
    projectContainer = document.getElementsByClassName('project');
    functionInit();
}

function functionInit() {
    divHeight();
    homeContainerPos();
    portfolioCenter();
}

function divHeight() {
    homePage.style.height = height + "px";
    homePage.style.width = width + "px";
}

function homeContainerPos() {
    var containerHeight = homeContainer.clientHeight;
    var paddingTop = (height - containerHeight) / 4;
    homeContainer.style.paddingTop = paddingTop + "px";
}

function skillNameHeight() {
    var containerHeight = skillsContainer.clientHeight;
    var containerWidth = skillsContainer.clientWidth;
    var skillHeight = containerHeight / skillName.length;
    // var skillShift = (containerWidth - skillName[0].clientWidth) / 2;
    var skillNameWidth;
    for (var i = 0; i < skillName.length; i++) {
        skillNameWidth = skillName[i].childNodes[1].clientWidth;
        skillNameWidth = (containerWidth - skillNameWidth) / 2;
        skillName[i].childNodes[1].style.marginLeft = skillNameWidth + "px";
        skillName[i].style.width = containerWidth + "px";
        skillName[i].style.marginLeft = "-15px";
        skillNameLevel[i].style.height = skillHeight + "px";
        if (firstDisplay) {
            skillProgress(skillNameLevel[i], skillStatus[i]);
        } else {
            skillNameLevel[i].style.width = skillStatus[i] + "%";
        }
    }
}

function skillProgress(skill, skillStatus) {
    var j = 0;
    var interval = setInterval(() => {
        if (j < skillStatus) {
            skill.style.width = j + "%";
        } else {
            clearInterval(interval);
        }
        j++;
    }, 10);
}

function portfolioCenter() {
    if (width < 991.8) {
        for (var i = 0; i < projectContainer.length; i++) {
            var marginLeft = (width - projectContainer[i].clientWidth) / 2;
            projectContainer[i].style.marginLeft = marginLeft + "px";
        }
    } else {
        for (var i = 0; i < projectContainer.length; i++) {
            projectContainer[i].style.marginLeft = 0 + "px";
        }
    }
}

window.addEventListener('scroll', scrollProgress);

function scrollProgress() {
    if (window.scrollY >= (elementSize(homePage) - elementSize(header) * 10)) {
        skillNameHeight();
        firstDisplay = false;
        window.removeEventListener('scroll', scrollProgress);
    }
}

function elementSize(element) {
    return element.clientHeight;
}

function redirectToDiv(page) {
    var pageY;
    if (page == "home-page") {
        pageY = homePage.offsetTop;
        var headerHeight = elementSize(header);
        window.scrollTo(0, pageY - headerHeight);
    } else if (page == "about-page") {
        pageY = aboutPage.offsetTop;
        var headerHeight = elementSize(header);
        window.scrollTo(0, pageY - headerHeight);
    } else if (page == "portfolio-page") {
        pageY = portfolioPage.offsetTop;
        var headerHeight = elementSize(header);
        window.scrollTo(0, pageY - headerHeight);
    } else if (page == "contact-page") {
        pageY = contactPage.offsetTop;
        var headerHeight = elementSize(header);
        window.scrollTo(0, pageY - headerHeight);
    }
}

window.onresize = () => {
    height = window.innerHeight;
    width = window.innerWidth;
    divHeight();
    homeContainerPos();
    skillNameHeight();
    portfolioCenter();
}

varInit();