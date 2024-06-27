import { Controller } from "@hotwired/stimulus";
import { enter, leave, toggle} from "el-transition";

// Connects to data-controller="notification"
export default class extends Controller {
  connect() {
      setTimeout(() => {
        this.element.classList.remove("hidden");

        setTimeout(() => {
          enter(this.element);
        }, 100);
      }, 500);

    // Auto-hide
    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    setTimeout(() => {
      leave(this.element)
    }, 100);

    // Remove element after transition
    setTimeout(() => {
      this.element.remove();
    }, 300);
  }
}
