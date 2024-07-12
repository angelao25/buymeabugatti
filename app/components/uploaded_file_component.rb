# frozen_string_literal: true

class UploadedFileComponent < ViewComponent::Base
  def initialize(content_id:, name:, file_type:, file_size:, description: nil, upload_completed: false)
    @content_id = content_id
    @name = name
    @description = description
    @file_type = file_type
    @file_size = file_size
    @upload_completed = upload_completed
  end
end
