class User < ActiveRecord::Base
  validates :name, :email, presence: true
	validates :email, uniqueness: true
	validates :password, length: { minimum: 6, allow_nil: true }

	has_many :projects, foreign_key: :creator_id, dependent: :destroy
  has_many :unlaunched_projects, foreign_key: :creator_id,
    dependent: :destroy
	has_many :pledges, dependent: :destroy
  has_many :checkouts, dependent: :destroy
	has_many :session_tokens, dependent: :destroy

	attr_reader :password

	def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
		user && user.is_password?(password) ? user : nil
	end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid]
    )
    if user
      return user
    else
      User.create!(
        name: auth_hash[:extra][:raw_info][:name],
        email: auth_hash[:extra][:raw_info][:email],
        provider: auth_hash[:provider],
        uid: auth_hash[:uid]
      )
    end
  end

	def password=(password)
    @password = password
		self.password_hash = BCrypt::Password.create(password)
	end

	def is_password?(password)
    BCrypt::Password.new(password_hash).is_password?(password)
	end

end
