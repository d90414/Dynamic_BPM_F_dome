(function() {
	"use strict";
	(function() {
		var NGUeditor;
		NGUeditor = angular.module("ng.ueditor", []);
		NGUeditor.directive("ueditor", [function() {
			return {
				restrict: "ACE",
				require: "ngModel",
				scope: {
					config: "=",
					ready: "="
				},
				link: function($scope, element, attr, ctrl) {
					$scope = element.scope();
					var _NGUeditor, _updateByRender;
					_updateByRender = false;
					_NGUeditor = (function() {
						function _NGUeditor() {
							this.bindRender();
							this.initEditor();
							return;
						}
						/**
						 * 初始化编辑器
						 * @return {[type]} [description]
						 */
						_NGUeditor.prototype.initEditor = function() {
							if (typeof UM === "undefined") return;

							var _editorId, _self = this;
							var _UEConfig = $scope.config ? $scope.config : {
								toolbar: ['fullscreen', 'bold', 'italic', 'underline', '|', 'forecolor', 'backcolor', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'justifyleft', 'justifycenter', '|', 'paragraph', '|', 'fontfamily', 'fontsize', 'image', 'video', 'map'],
								initialFrameWidth: '100%',
								initialFrameHeight: 210

							};
							_editorId = attr.id ? attr.id : "_editor" + (Date.now());
							element[0].id = _editorId;
							this.editor = UM.getEditor(_editorId, _UEConfig);
							return this.editor.ready(function() {
								_self.editorReady = true;
								_self.editor.addListener("contentChange", function() {
									ctrl.$setViewValue(_self.editor.getContent());
									if (!_updateByRender && !$scope.$$phase) {
										$scope.$apply();
									}
									_updateByRender = false;
								});
								if (_self.modelContent.length > 0) {
									_self.setEditorContent();
								}
								if (typeof $scope.ready === "function") {
									$scope.ready(_self.editor);
								}
							});
						};
						_NGUeditor.prototype.setEditorContent = function(content) {
							if (content == null) {
								content = this.modelContent;
							}
							if (this.editor && this.editorReady) {
								this.editor.setContent(content);
							}
						};
						_NGUeditor.prototype.bindRender = function() {
							var _self;
							_self = this;
							ctrl.$render = function() {
								_self.modelContent = (ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue);
								_updateByRender = true;
								_self.setEditorContent();
							};
						};
						return _NGUeditor;
					})();
					new _NGUeditor();
				}
			};
		}]);
	})();
}).call(this);