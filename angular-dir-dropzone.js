/**
    @author Mustapha Taiwo
    */
(function(window, angular, undefined){
// body...
	'use strict';
	 /**
    * Config
    */
	var moduleName = 'ngDirDropZone';

	/**
	* Module
	*/
	var module;
	try {
		module = angular.module(moduleName);
	} catch (err) {
	// named module doesn't exist, so create one
		module = angular.module(moduleName, ['ng']);
	}
	/*
	* This is a angular directive to enable
	* user upload file by drag & drop with the
	* aid of dropzone.js v3.7.1
	*/
	module.directive(
		'dropBox', ['$rootScope', function ($rootScope){
		// Runs during compile
		return {
			priority: 0,
			scope: true,
			restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			link: function($scope, iElm, iAttrs, controller) {

				iElm.dropzone({
					url: iAttrs.uploadUrl,
					method: 'post',
					uploadMultiple: false,
					clickable: true,
					autoProcessQueue: true,
					addRemoveLinks: true
					init: function(){
						this.on('addedfile', function(file){
							$rootScope.$apply(function(){
								//make alterations as necessary
								alert('files added');
							});
						});
					}
				});
			}
		};
	}])
})(window, window.angular);