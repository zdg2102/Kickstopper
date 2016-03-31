# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160331182549) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pledges", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.integer  "reward_id",     null: false
    t.float    "pledge_amount", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "pledges", ["reward_id"], name: "index_pledges_on_reward_id", using: :btree
  add_index "pledges", ["user_id"], name: "index_pledges_on_user_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "title",                               null: false
    t.integer  "creator_id",                          null: false
    t.integer  "subcategory_id",                      null: false
    t.boolean  "category_featured",   default: false
    t.integer  "funding_goal",                        null: false
    t.date     "funding_date",                        null: false
    t.text     "project_blurb"
    t.text     "project_description"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "projects", ["creator_id"], name: "index_projects_on_creator_id", using: :btree
  add_index "projects", ["subcategory_id"], name: "index_projects_on_subcategory_id", using: :btree

  create_table "rewards", force: :cascade do |t|
    t.integer  "project_id",     null: false
    t.integer  "minimum_pledge", null: false
    t.string   "title",          null: false
    t.text     "description",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "rewards", ["project_id"], name: "index_rewards_on_project_id", using: :btree

  create_table "session_tokens", force: :cascade do |t|
    t.integer  "user_id",      null: false
    t.string   "token_string", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "session_tokens", ["user_id"], name: "index_session_tokens_on_user_id", using: :btree

  create_table "subcategories", force: :cascade do |t|
    t.string   "name",        null: false
    t.integer  "category_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "subcategories", ["category_id"], name: "index_subcategories_on_category_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",          null: false
    t.string   "email",         null: false
    t.string   "password_hash", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_foreign_key "pledges", "rewards"
  add_foreign_key "pledges", "users"
  add_foreign_key "projects", "subcategories"
  add_foreign_key "projects", "users", column: "creator_id"
  add_foreign_key "rewards", "projects"
  add_foreign_key "session_tokens", "users"
  add_foreign_key "subcategories", "categories"
end
