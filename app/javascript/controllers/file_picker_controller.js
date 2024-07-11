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

  getUploadedFileComponents() {
    return Array.from(document.getElementsByClassName('uploaded-file-component'));
  }

  buildContentParams(fileComponent) {
    const contentId = parseInt(fileComponent.dataset.contentId);
    const name = fileComponent.querySelector('input[name="name"]').value;
    const description = fileComponent.querySelector('input[name="description"]').value;
    return {
      id: contentId,
      name: name,
      description: description
    };
  }


  submitForm(e) {
    e.preventDefault();
    const productId = this.element.dataset.productId;
    const contents = [];

    this.getUploadedFileComponents().forEach((fileComponent) => {
      contents.push(this.buildContentParams(fileComponent));
    });

    console.log("product id: ", productId);
    console.log("contents array", contents);
    console.log("submit form");

    axios.post(`/products/${productId}/attach_contents/`, {
      contents: contents
    });



  }
}
