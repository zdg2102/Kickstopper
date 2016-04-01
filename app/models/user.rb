class User < ActiveRecord::Base
  validates :name, :email, :password_hash, presence: true
	validates :email, uniqueness: true
	validates :password, length: { minimum: 6 }

	has_many :projects, foreign_key: :creator_id
	has_many :pledges
	has_many :session_tokens

	attr_reader :password

	def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
		user.is_password?(password) ? user : nil
	end

	def password=(password)
    @password = password
		self.password_hash = BCrypt::Password.create(password)
	end

	def is_password?(password)
    password_hash == BCrypt::Password.new(password)
	end

end
