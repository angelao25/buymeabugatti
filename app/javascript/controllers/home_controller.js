import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {
  static targets = ["mobileMenu"];
  connect() {
    console.log("Inside homesidenav controller")
  }

  openMenu(){
    this.mobileMenuTarget.classList.remove('hidden');


  }
  closeMenu(){
    this.mobileMenuTarget.classList.add('hidden');

  }
}
