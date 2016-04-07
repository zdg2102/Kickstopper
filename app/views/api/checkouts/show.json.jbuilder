json.extract! @checkout, :id, :user_id, :pledge_amount

json.reward_minimum @checkout.reward.minimum_pledge
json.reward_title @checkout.reward.title
json.reward_description @checkout.reward.description
json.project_title @checkout.project.title
json.creator_name @checkout.project_creator.name
