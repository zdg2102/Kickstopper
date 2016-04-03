class User < ActiveRecord::Base
  validates :name, :email, :password_hash, presence: true
	validates :email, uniqueness: true
	validates :password, length: { minimum: 6, maximum: 72 }

	has_many :projects, foreign_key: :creator_id, dependent: :destroy
	has_many :pledges, dependent: :destroy
	has_many :session_tokens, dependent: :destroy
  has_many :authorizations, dependent: :destroy

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :omniauthable

  attr_accessible :email, :name, :password, :password_confirmation, :remember_me

	attr_reader :password

	def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
		user && user.is_password?(password) ? user : nil
	end

	def password=(password)
    @password = password
		self.password_hash = BCrypt::Password.create(password)
	end

	def is_password?(password)
    BCrypt::Password.new(password_hash).is_password?(password)
	end

end
