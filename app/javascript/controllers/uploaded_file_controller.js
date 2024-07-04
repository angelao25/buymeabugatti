import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="uploaded-file"
export default class extends Controller {
  static targets = ["open", "close", "form"];

  open(e){
    e.preventDefault();
    this.openTarget.classList.add("hidden");
    this.closeTarget.classList.remove('hidden');
    this.formTarget.classList.remove("hidden");
  }

  close(e){
    e.preventDefault();
    this.openTarget.classList.remove("hidden");
    this.closeTarget.classList.add("hidden");
    this.formTarget.classList.add("hidden");

  }

  delete(e) {
    e.preventDefault();
    this.element.remove();

  }
}
