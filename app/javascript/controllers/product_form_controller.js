import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="product-form"
const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

export default class extends Controller {
  static targets = ["thumbnail", "cover", "coverInput", "thumbnailInput"]

  changeThumbnail(e) {
    e.preventDefault();

    this.thumbnailInputTarget.click();
  }

  changeCover(e) {
    e.preventDefault()

    this.coverInputTarget.click();
  }

  attachCover(e) {
    e.preventDefault();

    const file = e.target.files[0];

    console.log('file', file);
    console.log('file type', file);

    if (!acceptedImageTypes.includes(file.type)) {
      alert("Attached file must be an image");

    }

    this.coverInputTarget.files = e.target.files;
    this.coverTarget.src = URL.createObjectURL(file)
  }

  attachThumbnail(e) {
    e.preventDefault();

    const file = e.target.files[0];

    console.log('file: ', file);
    console.log('file type', file.type);

    if (!acceptedImageTypes.includes(file.type)) {
      alert("Attached file must be an image");
    }

    this.thumbnailInputTarget.files = e.target.files;

    this.thumbnailTarget.src = URL.createObjectURL(file);



  }
}
