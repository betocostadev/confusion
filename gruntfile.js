'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css' : 'css/styles.scss'
                }
            }
        },
        // To keep watch on scss files for changes and then run the sass task above.
        watch: {
            files: 'css/*.scss',
            task: ['sass']
        },
        // To run the browser sync plugin (like the npm lite server)
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    },
                    browser: ['chrome']
                }
            }
        }
    });
    // To make grunt register and run the task. Probably not needed since sass is used with
    //  watch.
    grunt.registerTask('css',['sass']);
    // Need to be in this order, browserSync first and watch later, otherwise, watch would
    // close the other tasks and browserSync would not run.
    grunt.registerTask('default',['browserSync', 'watch']);
    // then use 'grunt css' on the console to run this.

};