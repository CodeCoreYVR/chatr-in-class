class Message < ActiveRecord::Base
  def self.flagged
    where(flagged: true)
  end

  def self.search(username: '')
    where('username ILIKE ?', "%#{username}%")
  end
end
