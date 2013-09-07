class User < ActiveRecord::Base
  attr_accessible :email, :fname, :lname, :password_digest
end
