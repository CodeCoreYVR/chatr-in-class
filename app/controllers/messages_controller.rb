class MessagesController < ApplicationController

  def index
    order = params[:order] || :asc
    render json: Message.order(created_at: order)
  end

  def create
    Message.create!(body: params[:body])
    head :created
  end

  def destroy
    Message.find(params[:id]).destroy!
    head :ok
  end

end
