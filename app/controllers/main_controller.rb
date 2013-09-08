class MainController < ApplicationController
	include LoginHelper

	def main
		redirect_to login_path if !is_logged_in
	end
end
