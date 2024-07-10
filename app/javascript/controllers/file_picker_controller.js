import { Controller } from "@hotwired/stimulus";
import axios from "axios";

let files = [];

// Connects to data-controller="file-picker"
export default class extends Controller {
  static targets = ["button", "fileInput"]

  HEADERS = {
    'ACCEPT': 'text/vnd.turbo-stream.html'
  };

  open() {
    this.fileInputTarget.click();
  }

  attachFile(content) {
    const contentId = content.element.dataset.contentId
    const fileIndex = files.findIndex(file => file.contentId == contentId)
    content.attachFile(files[fileIndex]);
    files = files.splice(fileIndex, fileIndex);
    content.uploadFile();
  }

  uploadFiles(e) {
    Array.from(e.target.files).forEach((file) => {
      axios.post('/api/contents', {
        name: file.name,
        file_size: file.size,
        file_type: file.type,
      }, { headers: this.HEADERS })
        .then((response) => {
          const contentId = response.data.match(/data-content-id=("\d+")/)[1].replace(/"|'/g, '');
          file['contentId'] = parseInt(contentId);
          files.push(file);
          Turbo.renderStreamMessage(response.data)
        });
    });
  }
}
