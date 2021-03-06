// Require/import necessary modules to use in your own task functions here

module.exports = function (grunt) {
  grunt.initConfig({
    package: grunt.file.readJSON("package.json"),
    // Refer to plugins
    uglify: {
      // Uglify accepts an options property where we can specify options for the taks and
      // things to do other than the main minification task
      options: {
        banner: "const b = 'in all targets';",
      },
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
        // Can also add options in individual targets - this will have priority
        options: {
          // Can use <%= %> to escape and add properties -> const b = 'grunt-tutorial'
          banner: "const b = '<%= package.name %>';",
        },
        files: [
          {
            // Target multiple files with names ending in .js
            src: ["src/*.js"],
            // Can also use template literals to name files
            dest: "build/<%= package.name %>.min.js",
          },
        ],
      },
    },
    cssmin: {
      target: {
        files: [
          {
            src: "src/style.css",
            dest: "build/style.min.css",
          },
        ],
      },
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
      },
      target: {
        files: [
          {
            src: "src/index.html",
            dest: "build/index.html",
          },
        ],
      },
    },
    watch: {
      // File types to watch:
      files: ["src/*.html", "src/*.css", "src/*.js"],
      // Tasks to run if changes are saved:
      tasks: ["uglify", "cssmin", "htmlmin"],
      options: {
        livereload: true,
      },
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: {
            path: "build/",
            options: {
              index: "index.html",
            },
          },
        },
      },
    },
    myMultiTask: {
      // Target can be a number, string, object etc
      target1: "This is the first target",
      target2: "This is the second target",
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

  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.loadNpmTasks("grunt-contrib-htmlmin");

  // Combine tasks to run with one command by adding to the array
  // First argument is the alias
  // Second argument is the array of tasks
  // If you set the alias to 'default' then you can just run by typing 'grunt'
  // i.e: grunt.registerTask("default", ["uglify", "cssmin", "htmlmin"]);
  grunt.registerTask("compress", ["uglify", "cssmin", "htmlmin"]);

  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.loadNpmTasks("grunt-contrib-connect");

  grunt.registerTask("default", ["connect", "watch"]);

  // Create and register your own tasks - name/description/function
  // To enter the argument, when you run task add with : i.e. grunt myTask:arg1:arg2 etc
  grunt.registerTask(
    "myTask",
    "My basic task description",
    function (arg1, arg2) {
      grunt.log.writeln(
        `Hello! The arguments entered were: '${arg1}' and '${arg2}'`
      );
      // Can also run existing tasks using grunt.task.run
      grunt.task.run("htmlmin");
    }
  );

  // More complicated tasks need to be registered as a multitask
  // Name/description/function
  // Also need to create a property in the config section with name of the task as key
  grunt.registerMultiTask("myMultiTask", "My Multi Task", function () {
    // Get the key (this.target) and the value (this.data)
    grunt.log.writeln(this.target + " - " + this.data);
  });
};
