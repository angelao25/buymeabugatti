import { Controller } from "@hotwired/stimulus";
import axios from "axios";

// Connects to data-controller="file-picker"
export default class extends Controller {
  static targets = ["button", "fileInput"]

  HEADERS = {
    'ACCEPT': 'text/vnd.turbo-stream.html'
  };


  connect() {
    console.log('axios: ', axios);
  }

  open() {
    this.fileInputTarget.click();

  }

  uploadFiles(e) {
    console.log("upload Files: ", Array.from(e.target.files));
    console.log('name: ', e.target.files[0].name);

    axios.post('/api/contents', {
      name: e.target.files[0].name
    }, { headers: this.HEADERS })
      .then(response => Turbo.renderStreamMessage(response.data));
  }
}
