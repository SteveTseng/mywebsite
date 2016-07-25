module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		ngAnnotate: {
		    options: {
		        singleQuotes: true
		    },
		    app: {
		        files: {
		            './public/min-safe/js/ChoiceFactory.js': ['./public/factory/ChoiceFactory.js'],
		            './public/min-safe/js/FinanceFactory.js': ['./public/factory/FinanceFactory.js'],
		            './public/min-safe/js/ScoreBoardFactory.js': ['./public/factory/ScoreBoardFactory.js'],
		            './public/min-safe/js/homeController.js': ['./public/controllers/homeController.js'],
		            './public/min-safe/js/marketController.js': ['./public/controllers/marketController.js'],
		            './public/min-safe/js/process_developmentController.js': ['./public/controllers/process_developmentController.js'],
		            './public/min-safe/js/product_developmentController.js': ['./public/controllers/product_developmentController.js'],
		            './public/min-safe/js/qualityController.js': ['./public/controllers/qualityController.js'],
		            './public/min-safe/app.js': ['./public/app.js'],
		        }
		    },
		},
		concat: {
		    js: { //target
		        src: [
		        	'./public/min-safe/app.js',
		        	'./public/min-safe/js/*.js',
		        	'./public/js/javascript.js',
		        ],
		        dest: './public/min/app.js'
		    },
		    deps: {
		    	src:[
			    	'./public/bower_components/jquery/dist/jquery.min.js',
			    	'./public/bower_components/bootstrap/dist/js/bootstrap.min.js',
		    		'./public/bower_components/angular/angular.min.js',
		    		'./public/bower_components/angularfire/dist/angularfire.min.js',
		    		'./public/bower_components/firebase/firebase.js',
		    		'./public/bower_components/angular-route/angular-route.min.js'
		    	],
		    	dest:'./public/min/deps.js'
		    },
		    css: {
		    	src:[
			    	'./public/bower_components/bootstrap/dist/css/bootstrap.min.css', 
			    	'./public/css/style.css'
		    	],
		    	dest: './public/min/style.css'
		    }
		},
		uglify: {
		    js: { //target
		        src: ['./public/min/app.js'],
		        dest: './public/min/app.js'
		    }
		},
		concat:{
			src:['./public/min/app.js','./public/min/deps.js'],
			dest: '.public/min/app.js'
		}
	});
    //load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate'); 

  //register grunt default task
  grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}
