class AngularModelGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)
  
  def generate_model_file
    template "model.js.erb", "app/angular/models/#{file_name}.js"
  end
  
end