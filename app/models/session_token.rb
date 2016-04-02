class SessionToken < ActiveRecord::Base
  validates :user_id, :token_string, presence: true
  validates :token_string, uniqueness: true

  after_initialize :ensure_token_string
  before_validation :ensure_token_uniqueness

	belongs_to :user

  # FINDTAG session tokens should be deleted from the database after
  # 7 days

  def reset_token!
    update!(token_string: random_token)
  end

  private

  def random_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_token_string
    self.token_string ||= random_token
  end

  def ensure_token_uniqueness
    if SessionToken.find_by(token_string: token_string)
      self.token_string = random_token
      if SessionToken.find_by(token_string: token_string)
        # considering the astronomical odds of hitting an
        # already-taken token twice in a row, at this
        # point it's safe to assume something larger is wrong
        raise 'Session token uniqueness conflict'
      end
    end
  end
end
