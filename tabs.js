const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

const changeTabFocus = (e) => {
    const keydownLeft = 37;
    const keydownRight = 39;

    // change the tabindex of the current tab to -1
    // if the right key is pushed, move to the next tab on the right
    // if the left key is pushed, move to the next tab on the left
    if (e.keyCode === keydownLeft || e.keyCode === keydownLeft) {
        tabs[tabFocus].setAttribute('tabindex', -1);
    }

    if (e === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) tabFocus = 0;
    }

    if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) tabFocus = tabs.length - 1;
    }

    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
}


const changeTabPanel = (e) => {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode; // div
    const mainContainer = tabContainer.parentNode; // main

    // set them all to hidden and then remove hidden from the corresponding panel
    mainContainer
        .querySelectorAll('[role="tabpanel"]')
        .forEach((panel) => panel.setAttribute("hidden", true));

    mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');

    mainContainer
        .querySelectorAll('picture')
        .forEach((picture) => picture.setAttribute("hidden", true));

    mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');

}

tabList.addEventListener('keydown', changeTabFocus);
tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});
