var ads__navControl = {
    Init: function() {
        this.DropdownContextFix();
    },
    DropdownContextFix: function() {
        document.querySelectorAll(".dropdown-pane, .dropdown-menu, .dropdown.menu .is-dropdown-submenu-parent, .card, .modal-dialog").forEach(function() {
            this.classList.add("ads__theme--light");
        });
    }
};