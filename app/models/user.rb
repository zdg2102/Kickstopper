class User < ActiveRecord::Base
  validates :name, :email, :password_hash, presence: true

	has_many :projects
	has_many 

end
