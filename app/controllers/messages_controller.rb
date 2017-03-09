class MessagesController < ApplicationController

  def index
    order = /DESC/i === params[:order] ? :desc : :asc
    username = params[:username] || ''

    if /TRUE/i === params[:flagged]
      render json: Message.order(created_at: order).search(username: username).flagged
    else
      render json: Message.order(created_at: order).search(username: username)
    end
  end

  def create
    message_params = params.permit(:body, :username)
    Message.create!(message_params)
    head :created
  end

  def destroy
    Message.find(params[:id]).destroy!
    head :ok
  end

  def toggle_flag
    message = Message.find(params[:id])
    if message.flagged?
      message.update(flagged: false)
    else
      message.update(flagged: true)
    end
    head :ok
  end

end
