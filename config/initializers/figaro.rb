# to proactively ensure all required keys are set on initialization
Figaro.require_keys("facebook_app_id", "facebook_app_secret", "aws_access_key_id",
  "aws_secret_access_key", "aws_region", "s3_bucket")
