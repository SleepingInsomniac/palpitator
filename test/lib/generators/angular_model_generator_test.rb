require 'test_helper'
require 'generators/angular_model/angular_model_generator'

class AngularModelGeneratorTest < Rails::Generators::TestCase
  tests AngularModelGenerator
  destination Rails.root.join('tmp/generators')
  setup :prepare_destination

  test "generator runs without errors" do
    assert_nothing_raised do
      run_generator ["TestAngularModel"]
    end
  end
end
