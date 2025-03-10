class User < ApplicationRecord
  has_secure_password
  def hashed_format
    {name: self.name, email: self.email}
  end
end
