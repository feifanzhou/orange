class LoginController < ApplicationController
	include LoginHelper

  def index
  end

  def create
    if !params[:user][:id].blank?
      flash[:login_error] = "You filled in stuff that shouldn't be. Contact us for help."
      puts '===== Honeypot filled in ====='
      redirect_to login_path
    end
    user = User.find_by_email(params[:user][:email].downcase)
    if user && user.authenticate(params[:user][:password])
      cookies[:current_user] = { value: user.remember_token, expires: 20.years.from_now }
      cookies[:current_user_id] = { value: user.id, expires: 20.years.from_now }
      # if user.has_temp_password
      #   redirect_to pwchange_path
      # else
      redirect_to root_path
        # redirect_back
        # redirect_to session[:return_to]
      # end
    else
      if (params[:user][:fname].blank? || params[:user][:lname].blank?)
        flash[:login_error] = 'Could not log you in. Check your email and password.'
        puts '===== Invalid login ====='
        redirect_to login_path
      else
        # Create new user
        @user = User.new(params[:user].except(:id))
        if @user.save
          cookies[:current_user] = { value: @user.remember_token, expires: 20.years.from_now }
          cookies[:current_user_id] = { value: @user.id, expires: 20.years.from_now }
          redirect_to root_path
        else
          # TODO: Make this error condition a lot more helpful
          flash[:login_error] = 'Could not log in and could not create account.'
          puts '===== 500 error creating user or logging in ====='
          redirect_to login_path
        end
      end
    end
  end

  def destroy
    sign_out
    redirect_to login_path
  end
end
