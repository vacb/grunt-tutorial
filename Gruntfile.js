module.exports = function (grunt) {
  grunt.initConfig({
    package: grunt.file.readJSON("package.json"),
    // Refer to plugins
    uglify: {
      target1: {
        files: [
          {
            // Source file
            // To concatenate JS files, pass an array of files instead of a string
            src: ["src/test.js", "src/anothertest.js"],
            // Path to create compressed file
            dest: "build/firstconcat.min.js",
          },
          {
            // Can add another output that concats different files
            src: ["src/anothertest.js", "src/yetanothertest.js"],
            dest: "build/secondconcat.min.js",
          },
        ],
      },
      // Can add multiple targets - choose which target to run when running the task
      // eg: grunt uglify:target2 or grunt uglify: target1
      target2: {
        files: [
          {
            // Target multiple files with names ending in .js
            src: ["src/*.js"],
            dest: "build/alljsfiles.min.js",
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

  // Can also set aliases for subtasks
  grunt.registerTask("compressPartials", "uglify:target1");
  grunt.registerTask("compressAll", "uglify:target2");
};
