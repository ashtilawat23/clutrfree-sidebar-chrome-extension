let sidebarOpen = false;
let sidebar;

function createSidebar() {
  sidebar = document.createElement('div');
  sidebar.id = 'clutrfree-sidebar';
  sidebar.innerHTML = `
    <h2>clutrfree</h2>
    <p>Your clutter-free reading experience starts here.</p>
    <button id="clutrfree-close">Close</button>
  `;
  document.body.appendChild(sidebar);
  
  document.getElementById('clutrfree-close').addEventListener('click', toggleSidebar);
}

function toggleSidebar() {
  if (!sidebar) {
    createSidebar();
  }
  
  if (sidebarOpen) {
    sidebar.style.width = '0';
    sidebarOpen = false;
  } else {
    sidebar.style.width = '300px';
    sidebarOpen = true;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSidebar") {
    toggleSidebar();
  }
});

// Create the sidebar when the content script loads
createSidebar();