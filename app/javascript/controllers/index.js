// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import FilePickerController from "./file_picker_controller"
application.register("file-picker", FilePickerController)

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import HomeController from "./home_controller"
application.register("home", HomeController)

import NotificationController from "./notification_controller"
application.register("notification", NotificationController)

import ProductFormController from "./product_form_controller"
application.register("product-form", ProductFormController)

import SidenavController from "./sidenav_controller"
application.register("sidenav", SidenavController)

import UploadedFileController from "./uploaded_file_controller"
application.register("uploaded-file", UploadedFileController)
