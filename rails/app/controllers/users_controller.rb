class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    @users = User.all
    render json: @users.map do |user|
      user.hashed_format
    end
  end

  # GET /users/1
  def show
    render json: @user.hashed_format
  end

  def matches
    @user = User.find_by(email: params.expect(:email))
    if @user.nil?
      render json: false
    elsif @user.authenticate(params.expect(:password))
      render json: @user.hashed_format
    else
      render json: false
    end
  end

  # POST /users
  def create
    saved_user = User.find_by(email: user_params[:email])
    if saved_user.nil?
      @user = User.new(user_params)
      if @user.save
        render json: @user.hashed_format
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: {}, status: 409
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user.hashed_format
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find_by(email: params.expect(:email))
      if @user.nil?
        render json: { error: "User not found" }, status: 500
      end
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.expect(user: [ :email, :name, :password ])
    end
end
