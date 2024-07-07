import { Controller } from "@hotwired/stimulus";
import axios from "axios";

// Connects to data-controller="file-picker"
export default class extends Controller {
  static targets = ["button", "fileInput"]

  HEADERS = {
    'ACCEPT': 'text/vnd.turbo-stream.html'
  };

  open() {
    this.fileInputTarget.click();

  }

  uploadFiles(e) {
    console.log("upload Files: ", Array.from(e.target.files));
    console.log('name: ', e.target.files[0].name);

    axios.post('/api/contents', {
      name: e.target.files[0].name,
      file_size: e.target.files[0].size,
      file_type: e.target.files[0].type,
    }, { headers: this.HEADERS })
      .then(response => Turbo.renderStreamMessage(response.data));
  }
}
