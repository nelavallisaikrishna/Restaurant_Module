// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
    // CONFIGURE GRUNT
    grunt.initConfig({
        // get the configuration info from package.json file
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration goes here
        uglify: {
            // uglify task configuration
            options: {},
            build: {}
        }
    });

    // log something
    grunt.log.write('welcome to grunt!!\n');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};