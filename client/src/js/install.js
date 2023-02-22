const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    // store the triggered events
    window.deferredPrompt = event;
    // remove the hidden clas from button
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.defferedPrompt;

    if (!promptEvent) {
        return;
    };

    // show the prompt
    promptEvent.prompt();

    // reset the prompt var as it can only be used once
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});


window.addEventListener('appinstalled', (event) => {
    // clear the prompt
    window.deferredPrompt = null;
});
