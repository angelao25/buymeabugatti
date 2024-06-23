class DashboardController < ApplicationController
  before_action :authenticate_user!
  def index
    flash.now[:notice] = {
      title: 'Successfully Sign Up',
      body: 'Welcome to our application'
    }
  end
end
