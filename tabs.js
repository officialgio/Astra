const tabList = document.querySelector('[role="tablist"]'); // div for btns
const tabs = tabList.querySelectorAll('[role="tab"]'); // btn

let tabFocus = 0;

// Accessibility stuff
const changeTabFocus = (e) => {
    const keydownLeft = 37;
    const keydownRight = 39;

    // change the tabindex of the current tab to -1
    // if the right key is pushed, move to the next tab on the right
    // if the left key is pushed, move to the next tab on the left
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

const changeTabPanel = (e) => {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode; // div
    const mainContainer = tabContainer.parentNode; // main

    // remove the aria-selected (T) to false when choosing a new tab
    // Set the corresponding pressed tab to True.
    // This will allow to change border colors
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

    // Initially set them to hidden state, then,
    // Get it's attribute and remove hidden
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`])

    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
}

// This allows to hide the content that corresponds to the linked id attribute through aria-controls
const hideContent = (parent, content) => {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

const showContent = (parent, content) => {
    parent.querySelector(content).removeAttribute('hidden');
}

// Invoke 
tabList.addEventListener('keydown', changeTabFocus);
tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});
