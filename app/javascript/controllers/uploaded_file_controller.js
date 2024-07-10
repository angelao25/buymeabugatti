import { Controller } from "@hotwired/stimulus"
import axios from 'axios';

let file = null;

// Connects to data-controller="uploaded-file"
export default class extends Controller {
  static targets = ["open", "close", "form"];
  static outlets = ['file-picker'];

  connect() {
    this.filePickerOutlet.attachFile(this);
  }

  attachFile(attachedFile) {
    file = attachedFile;
  }

  uploadFile() {
    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('progressEvent: ', progressEvent);
        console.log('percentCompleted: ', percentCompleted);
      },
      headers: { 'ACCEPT': 'application/json' }
    };
    const data = new FormData();
    data.append('content[file]', file);

    axios.put(`/api/contents/${this.element.dataset.contentId}`, data, config)
      .then((response) => {
        console.log('uploadFile resopnse: ', response);
      });
  }

  open(e) {
    e.preventDefault();
    this.openTarget.classList.add("hidden");
    this.closeTarget.classList.remove('hidden');
    this.formTarget.classList.remove("hidden");
  }

  close(e) {
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
