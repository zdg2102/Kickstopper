# Rewards associated with unlaunched projects

class UnlaunchedReward < ActiveRecord::Base

  belongs_to :unlaunched_project

end
