module.exports = function (grunt) {
  grunt.initConfig({
    package: grunt.file.readJSON("package.json"),
    // Refer to plugins
    uglify: {
      target: {
        files: [
          {
            // Source file
            src: "src/test.js",
            // Path to create compressed file
            dest: "build/test.min.js",
          },
        ],
      },
    },
  });

  // Load the plugin using the loadNpmTasks method
  grunt.loadNpmTasks("grunt-contrib-uglify");
  // To compress, run 'grunt uglify'

  // Can set aliases for tasks to run them under different commands
  // Use registerTask method, arguments are alias name and real task name
  grunt.registerTask("compressJS", "uglify");
};
