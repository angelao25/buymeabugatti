import { Controller } from "@hotwired/stimulus"
import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import { destroy } from '@rails/request.js'

let file = null;

// Connects to data-controller="uploaded-file"
export default class extends Controller {
  static targets = ["open", "close", "form", "metadata", "uploadProgress"];
  static outlets = ['file-picker'];

  connect() {
    if (this.element.dataset.uploadCompleted != "true") {
      this.filePickerOutlet.attachFile(this);
    }
  }

  attachFile(attachedFile) {
    file = attachedFile;
  }

  uploadProgressText(percentCompleted, uploadRate) {
    const totalFileSize = this.uploadProgressTarget.dataset.fileSize;
    const fileType = this.uploadProgressTarget.dataset.fileType;
    console.log('uploadRate: ', uploadRate);
    if (uploadRate == undefined) return;

    return `${fileType} · ${percentCompleted}% of ${totalFileSize} (${prettyBytes(uploadRate).toUpperCase()}/ second)`;

  }

  uploadFile() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log('token: ', csrfToken);
    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.uploadProgressTarget.classList.remove('hidden');
        this.metadataTarget.classList.add('hidden');
        this.uploadProgressTarget.textContent = this.uploadProgressText(percentCompleted, progressEvent.rate);
      },
      headers: { 'ACCEPT': 'application/json', 'X-CSRF-Token': csrfToken }
    };
    const data = new FormData();
    data.append('content[file]', file);

    axios.put(`/api/contents/${this.element.dataset.contentId}`, data, config)
      .then((response) => {
        console.log('uploadFile resopnse: ', response);
        this.uploadProgressTarget.classList.add('hidden');
        this.metadataTarget.classList.remove('hidden');
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

  async delete(e) {
    e.preventDefault();
    // axios.delete(`/api/contents/${this.element.dataset.contentId}`, { headers: { 'ACCEPT': 'application/json' } })
    //   .then(() => {
    //     this.element.remove();
    //   });

    const response = await destroy(`/api/contents/${this.element.dataset.contentId}`, { headers: { 'ACCEPT': 'application/json' } });

    if (response.ok) {
      this.element.remove();
    }
  }
}
