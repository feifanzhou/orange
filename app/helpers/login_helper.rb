module LoginHelper
  def sign_out
    reset_session
    cookies.delete(:current_user)
  end

  def is_logged_in
    return !(current_user.blank?)
  end

  def current_user
    if !(cookies[:current_user].blank?)
      return User.find_by_remember_token(cookies[:current_user])
    else
      return nil
    end
  end
end