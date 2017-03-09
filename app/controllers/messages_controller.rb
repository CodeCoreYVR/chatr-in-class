class MessagesController < ApplicationController

  def index
    order = params[:order] || :asc
    render json: Message.order(created_at: order)
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
