// For side nav
class SpecialSidenav extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <aside id="sidebar">
            <div class="d-flex">
                <button id="toggle-btn" type="button">
                    <i class="lni lni-bar-chart-dollar"></i>
                </button>
                <div class="sidebar-logo">
                    <a href="/">INK.co</a>
                </div>
            </div>
            <ul class="sidebar-nav">
                <li class="sidebar-item">
                    <a href="/" class="sidebar-link">
                        <i class="lni lni-book-1"></i>
                        <span>Journal</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="/analytics" class="sidebar-link">
                        <i class="lni lni-trend-up-1"></i>
                        <span>Analytics</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="/calculator" class="sidebar-link">
                        <i class="lni lni-calculator-2"></i>
                        <span>Calculator</span>
                    </a>
                </li>
            </ul>
        </aside>
        `
    }
}

// for footer
class SpecialFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <footer class="footer">
            <div class="container-fluid">
                <div class="row text-body-secondary">
                    <div class="col-6 text-start">
                        <a href="#" class="text-body-secondary">
                            <strong>Johnny Senpaii</strong>
                        </a>
                    </div>
                    <div class="col-6 text-end text-body-secondary d-none d-md-block">
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item">
                                <a href="#" class="text-body-secondary">Contact</a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#" class="text-body-secondary">About Us</a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#" class="text-body-secondary">Terms & Conditions</a>
                            </li>
                        </ul>                        
                    </div>
                </div>
            </div>
        </footer>
        `
    }
}

// define Element
customElements.define('special-sidenav', SpecialSidenav)
customElements.define('special-footer', SpecialFooter)



// const hamburger = document.querySelector("#toggle-btn");

// hamburger.addEventListener("click",function(){
//     document.querySelector("#sidebar").classList.toggle("expand");
// });

document.body.classList.add("loading"); // Add 'loading' class at the start

// Apply the sidebar state before rendering
const sidebar = document.querySelector("#sidebar");
if (localStorage.getItem("sidebarExpanded") === "true") {
    sidebar.classList.add("expand");
} else {
    sidebar.classList.remove("expand");
}

// Toggle the sidebar and save the state to localStorage
const hamburger = document.querySelector("#toggle-btn");
hamburger.addEventListener("click", function () {
    sidebar.classList.toggle("expand");
    const isExpanded = sidebar.classList.contains("expand");
    localStorage.setItem("sidebarExpanded", isExpanded);
});

// Remove 'loading' class after the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded"); // Add 'loaded' class after page finishes loading
});

// Adjust the space below > this function will cut the side nav

window.addEventListener('resize', adjustSidebarHeight);
window.addEventListener('load', adjustSidebarHeight);

function adjustSidebarHeight() {
    let sidebar = document.querySelector('#sidebar');
    let windowWidth = window.innerWidth;

    // For desktop or larger screens
    if (windowWidth >= 992) { // Desktop breakpoint
        let contentHeight = document.body.scrollHeight;
        sidebar.style.height = contentHeight + 'px'; // Adjust height dynamically
    } else {
        // Reset the height for smaller screens (mobile/tablet)
        sidebar.style.height = 'auto';
    }
}

//this function will fill the sidenav but creates white space

window.addEventListener('resize', adjustSidebarHeight);
window.addEventListener('load', adjustSidebarHeight);

function adjustSidebarHeight() {
    let sidebar = document.querySelector('#sidebar');
    let contentHeight = document.body.scrollHeight;

    // Set the sidebar's height to match the content height
    sidebar.style.height = contentHeight + 'px';
}



