module.exports = function(grunt) {

    var jsFiles = [
        'www/static/scripts/vendor/jquery/jquery.min.js',
        'www/static/scripts/vendor/angular/angular.js',
        'www/static/scripts/vendor/angular/angular-animate.js',
        'www/static/scripts/vendor/angular/*.js',
        'www/static/scripts/vendor/bootstrap/bootstrap.min.js',
        'www/static/scripts/vendor/bootstrap/bootstrap-switch.js',
        'www/static/scripts/vendor/underscore/underscore-min.js',
        'www/static/scripts/vendor/d3/d3.js',
        'www/static/scripts/vendor/**/*.js',
        'www/static/scripts/app/app.js',
        'www/static/scripts/**/*.js'
    ];

    grunt.initConfig({

        scriptlinker: {
            defaultOptions: {
                options: {
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<script src="/static/%s"></script>',
                    appRoot: 'www/static/'
                },
                files: {
                    // Target-specific file lists and/or options go here.
                    'www/static/app/index.html': jsFiles
                }
            }
        },

        env : {

            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },

            prod : {
                NODE_ENV : 'PRODUCTION'
            }
        },

        preprocess : {

            prod : {
                src :  './www/static/app/index.template',
                dest : './www/static/app/index.html'
            },

            dev : {
                src :  './www/static/app/index.template',
                dest : './www/static/app/index.html'
            }

        },

        pkg : grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ["www/static/styles"]
                },
                files: {
                    "www/static/styles/tahoe.css": ["www/static/styles/bootstrap/less/bootstrap.less", "www/static/styles/less/fontawesome/font-awesome.less"]
                }
            }

        },

        concat : {

            js : {
                src : jsFiles,
                dest : 'www/static/release/tahoe.js'
            }

        },

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'www/static/release/tahoe.min.js': ['www/static/release/tahoe.js']
                }
            }
        },

        clean: {
            build: {
                src: ["www/static/release/tahoe.js", "www/static/app/*.html"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-minified');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-scriptlinker');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('prod',      ['concat', 'clean', 'less', 'uglify']);
    grunt.registerTask('default', ['env:dev',  'clean', 'less', 'preprocess:dev', 'scriptlinker']);
};