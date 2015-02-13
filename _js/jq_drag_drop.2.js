DragDrop = {

	init: function (sentElem) {
		this.elements = sentElem;
		// console.log(this.elements);
		// alert(CKEDITOR.version);
		this.CKEDITOR = CKEDITOR;
		this.CKEDITOR.replace( 'heading_modal' );
		this.CKEDITOR.replace( 'text_modal' );
		this.bindEvents();

	},

	getElementTag: function (fileToRead) {

		return $.ajax({
					url: fileToRead,
					type: 'GET',
					dataType: 'html'
				}).promise();
		
		
	}, //END: getElementTag: function. THIS FUNCTION GETS TAGS FROM element_load.html FILE VIA AJAX. RETURNS PROMISE.

	bindEvents: function () {

		$.each(this.elements, function (index, element) {

			if (index != 'drop_box' && index != 'sort_box' && index != 'modals') {
				element.draggable({ 
					revert: "invalid",
					scope: "drop_box",
					helper: "clone"
				});
			}
		});

		this.elements.sort_box.sortable();
		this.elements.drop_box.droppable({
			scope: 'drop_box'
		});

		this.elements.drop_box.on('drop', this.createElement);
		this.elements.drop_box.on('click', '.dropped_element', this.highlightElement);
		this.elements.drop_box.on('click', 'i.fa-times-circle', this.removeElement);
		this.elements.drop_box.on('click', 'i.fa-gears', this.setupElement);

		$(document).on('click', '#heading_save_btn', this.headingSave);
		$(document).on('click', '#text_save_btn', this.textSave);
		$(document).on('click', '#save_text_box', this.textBoxSave);
		$(document).on('click', '#save_text_area', this.textAreaSave);
		$(document).on('click', '#save_dropdown', this.dropdownSave);
		$(document).on('click', '#save_radio', this.radioSave);
		$(document).on('click', '#save_checkbox', this.checkboxSave);
		$(document).on('click', '#save_image', this.imageSave);
		$(document).on('click', '#save_submit', this.submitSave);
		$(document).on('click', '#save_file', this.fileSave);

	
	}, //END: bindEvents FUNCTION

	removeElement: function (event) {
		event.preventDefault();

		var $this = $(this);
		var targetDroppedElement = $this.closest('.widget-box');

		targetDroppedElement.remove();

	}, //END: removeElement FUNCTION

	createElement: function (event, ui) {
		
		var dropBox = this;
		var self = DragDrop;
		var droppedElementStart = '<li class="hover_class dropped_element">';
		var droppedElementEnd = '</li>';
		var widgetStart = '<div class="widget-box elm_hover">';
		var widgetEnd = '</div>';
		var widgetHeader = '<div class="widget-header"><h2>Action</h2>' + 
			'<span class="widget-toolbar clear-fix">' + 
			'<a href="#"><i class="fa fa-gears"></i></a><a href="#"><i class="fa fa-times-circle"></i></a>'+
			'</span></div>'
		var elem = ui.draggable;
		var elmType = elem.data('type');

		
		switch(elmType) {
			case 'heading':

				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);
					
				break;

			case 'text':

				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;

			case 'text_box':

				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;

			case 'text_area':
	
				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;
			case 'dropdown':
				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;

			case 'radio':
				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;

			case 'checkbox':
				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;

			case 'image':
				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;

			case 'file':
				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;

			case 'submit':
				var elmID = "#" + elmType + "_element";
					self.showElements(dropBox, droppedElementStart, widgetStart, widgetHeader, widgetEnd, droppedElementEnd, elmID);

				break;
				
		} //END: switch(elem.data('type'))


	}, //END: createElement

	showElements: function (dropBox, dElmStart, wStart, wHead, wEnd, dElmEnd, elmID) {

		var self = DragDrop;

		self.getElementTag('_ajax/element_load.html').then(function (data) {
			var tElm = $(data).filter(elmID).html();
			$(dropBox).append(dElmStart + wStart + wHead + tElm + wEnd + tElm + dElmEnd);

		});

	}, //END: showElements: function. THIS ONE CREATES THE DROPPED ELEMENTS

	
	highlightElement: function (event) {
		// event.preventDefault();
		event.stopPropagation();
		
		var $this = $(this);
		var droppedElement = $this.children('.element');
		var widgetBoxElement = $this.children('.widget-box');
		var self = DragDrop;
		var openWidgetBox = self.elements.drop_box.find('.widget-box');
	
		if (openWidgetBox) {
			openWidgetBox.hide();
			openWidgetBox.next('code').show();
		} 
		
		droppedElement.hide();
		widgetBoxElement.show();
	
	}, //END: highlightElement FUNCTION: THIS ONE CREATES WIDGET BOX AROUND THE DROPPED ELEMENTS ON CLICK

	
	setupElement: function (event) {
		event.preventDefault();
		event.stopPropagation();

		var $this = $(this);
		var self = DragDrop;

		var multiModal = self.elements.modals.multi_modal;

		var formListFile = "_ajax/form_load.html";

		var openWidgetBox = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });

		var $selectedElement = openWidgetBox.next('code');
		var setElementType =  openWidgetBox.next('code').data('type');
		
		switch(setElementType) {
			case 'heading':
				var headingModal = self.elements.modals[setElementType];
				var headingContent = openWidgetBox.next('code').html();

				self.CKEDITOR.instances.heading_modal.setData( headingContent );
				
				headingModal.modal("show");
				
				break;
			case 'text':
				var textModal = self.elements.modals[setElementType];
				var textContent = openWidgetBox.next('code').html();

				self.CKEDITOR.instances.text_modal.setData( textContent );
				
				textModal.modal("show");

				break;
			case 'text_box':
				//COLLECT VALUES FROM DROPPED ELEMENT
				var labelValue = $selectedElement.find('label p').text();
				var subLabelValue = $selectedElement.find('label small').text();
				var instructionValue = $selectedElement.find('a').attr('title');
				var inputType = $selectedElement.find('input').attr('type');
				var inputRequired = $selectedElement.find('input').prop('required');
				var inputReadonly = $selectedElement.find('input').prop('readonly');
				var labelAlignment = $selectedElement.find('label').attr('class').split(' ')[2]; //CHOOSING LABEL CLASS text-center [the 3rd class]
				var labelColor = $selectedElement.find('.control-label').css('color'); //CHOOSING LABEL STYLE color
				var inputHeight = $selectedElement.find('input').attr('class').split(' ')[1]; //CHOOSING INPUT CLASS input-md [the 2nd class]
				var inputWidth = $selectedElement.find('input').closest('div').attr('class'); //CHOOSING DIV CLASS col-md-7 [the only class]
				var inputBorderStyle = $selectedElement.find('input').css('border-style');
				var inputBorderWidth = $selectedElement.find('input').css('border-width');
				var inputBorderWidth = Math.ceil(parseFloat(inputBorderWidth));
				var inputBorderRadius = $selectedElement.find('input').css('border-radius');
				var inputBorderRadius = parseInt(inputBorderRadius);

				var inputBorderColor = $selectedElement.find('input').css('border-color');


				//CALL THE AJAX LOAD FUNCTION HERE
				var modalID = '#' + setElementType + '_form_data';
				// var settingsForm = formListFile + " " + modalID;
				

				self.getElementTag(formListFile).done(function(data) {
					    var $data = $(data);
					    multiModal.html($data.filter(modalID)); //insert form 
					    multiModal.find(".pick-a-color").pickAColor({
				        	  showSpectrum            : true,
							  showSavedColors         : false,
							  saveColorsPerElement    : false,
							  fadeMenuToggle          : true,
							  showHexInput            : true,
							  showBasicColors         : true,
							  allowBlank              : false,
							  showAdvanced            : false
				        });

					}).always(function() {
					    if ($("#text_box_label_text").length) {              
					        $("#text_box_label_text").val(labelValue);  
					    }
					    if ($("#text_box_sublabel_text").length) {              
					        $("#text_box_sublabel_text").val(subLabelValue);  
					    }
					    if ($("#text_box_instruction_text").length) {              
					        $("#text_box_instruction_text").val(instructionValue);  
					    }
					    if ($("#text_box_select_type").length) {              

					  		$("#text_box_select_type").filter(function() {
							    return $(this).val(inputType); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_alignment").length) {              

					  		$("#text_box_alignment").filter(function() {
							    return $(this).val(labelAlignment); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_height").length) {              

					  		$("#text_box_height").filter(function() {
							    return $(this).val(inputHeight); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_width").length) {              

					  		$("#text_box_width").filter(function() {
							    return $(this).val(inputWidth); 
							}).attr('selected', 'selected');

					    }

					    if ($(".pick-a-color").length) {              

							$('span.color-preview.current-color').css('background-color', labelColor);
							$('.pick-a-color').filter(function () {
								return	$(this).val(labelColor);

							});
					    }

					    if ($("#text_box_border_style").length) {              

					  		$("#text_box_border_style").filter(function() {
							    return $(this).val(inputBorderStyle); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_border_thickness").length) {              

							// console.log("thickness: " + inputBorderWidth);
					  		$("#text_box_border_thickness").filter(function() {
							    return $(this).val(inputBorderWidth); 
							    
							}).attr('selected', 'selected');

					    }
					    if ($(".pick-a-color").length) {              

							$('span.color-preview.current-color').css('background-color', labelColor);
							$('.pick-a-color').filter(function () {
								return	$(this).val(labelColor);

							});
					    }
					  
					  	if ($("#text_box_border_radius").length) {

							// console.log("radius: " + inputBorderRadius); 
					  		$("#text_box_border_radius").filter(function() {
							    return $(this).val(inputBorderRadius);

							}).attr('selected', 'selected');
							
					    }
					    if ($("#text_box_required_checkbox").length) {

							// console.log("REQ: " + inputRequired); 

							$("#text_box_required_checkbox").filter(function () {
								if(inputRequired){
					  				$(this).prop('checked', true);
						  		} else {
						  			$(this).prop('checked', false);
						  		}
							});
							
					    }
					    if ($("#text_box_readonly_checkbox").length) {

							// console.log("RDO: " + inputReadonly); 
					  		$("#text_box_readonly_checkbox").filter(function () {
								if(inputReadonly){
					  				$(this).prop('checked', true);
						  		} else {
						  			$(this).prop('checked', false);
						  		}
							});
					    }


					    
					});

				multiModal.modal("show");

				break;

			case 'text_area':
				//COLLECT VALUES FROM DROPPED ELEMENT
				var labelValue = $selectedElement.find('label p').text();
				var subLabelValue = $selectedElement.find('label small').text();
				var instructionValue = $selectedElement.find('a').attr('title');
				var labelAlignment = $selectedElement.find('label').attr('class').split(' ')[2]; //CHOOSING LABEL CLASS text-center [the 3rd class]
				var labelColor = $selectedElement.find('.control-label').css('color'); //CHOOSING LABEL STYLE color

				var inputRequired = $selectedElement.find('textarea').prop('required');
				var inputReadonly = $selectedElement.find('textarea').prop('readonly');

				var inputHeight = $selectedElement.find('textarea').attr('rows') //CHOOSING TEXT AREA ROWS VALUE
				var inputWidth = $selectedElement.find('textarea').closest('div').attr('class'); //CHOOSING DIV CLASS col-md-7 [the only class]

				var inputBorderStyle = $selectedElement.find('textarea').css('border-style');
				var inputBorderWidth = $selectedElement.find('textarea').css('border-width');
				var inputBorderWidth = Math.ceil(parseFloat(inputBorderWidth));
				var inputBorderRadius = $selectedElement.find('textarea').css('border-radius');
				var inputBorderRadius = parseInt(inputBorderRadius);



				//CALL THE AJAX LOAD FUNCTION HERE
				var modalID = '#' + setElementType + '_form_data';
				// var settingsForm = formListFile + " " + modalID;
				

				self.getElementTag(formListFile).done(function(data) {
					    var $data = $(data);

					    multiModal.html($data.filter(modalID)); //insert form 
					    multiModal.find(".pick-a-color").pickAColor({
				        	  showSpectrum            : true,
							  showSavedColors         : false,
							  saveColorsPerElement    : false,
							  fadeMenuToggle          : true,
							  showHexInput            : true,
							  showBasicColors         : true,
							  allowBlank              : false,
							  showAdvanced            : false
				        });
					}).always(function() {
					    if ($("#text_box_label_text").length) {              
					        $("#text_box_label_text").val(labelValue);  
					    }
					    if ($("#text_box_sublabel_text").length) {              
					        $("#text_box_sublabel_text").val(subLabelValue);  
					    }
					    if ($("#text_box_instruction_text").length) {              
					        $("#text_box_instruction_text").val(instructionValue);  
					    }
					    if ($("#text_box_select_type").length) {              

					  		$("#text_box_select_type").filter(function() {
							    return $(this).val(inputType); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_alignment").length) {              

					  		$("#text_box_alignment").filter(function() {
							    return $(this).val(labelAlignment); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_height").length) {              

					  		$("#text_box_height").filter(function() {
							    return $(this).val(inputHeight); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_width").length) {              

					  		$("#text_box_width").filter(function() {
							    return $(this).val(inputWidth); 
							}).attr('selected', 'selected');

					    }
					    if ($(".pick-a-color").length) {              

							$('span.color-preview.current-color').css('background-color', labelColor);
							$('.pick-a-color').filter(function () {
								return	$(this).val(labelColor);

							});
					    }

					    if ($("#text_box_border_style").length) {              

					  		$("#text_box_border_style").filter(function() {
							    return $(this).val(inputBorderStyle); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_border_thickness").length) {              

							// console.log("thickness: " + inputBorderWidth);
					  		$("#text_box_border_thickness").filter(function() {
							    return $(this).val(inputBorderWidth); 
							    
							}).attr('selected', 'selected');

					    }
					  
					  
					  	if ($("#text_box_border_radius").length) {

							// console.log("radius: " + inputBorderRadius); 
					  		$("#text_box_border_radius").filter(function() {
							    return $(this).val(inputBorderRadius);

							}).attr('selected', 'selected');
							
					    }
					    if ($("#text_box_required_checkbox").length) {

							// console.log("REQ: " + inputRequired); 
							$("#text_box_required_checkbox").filter(function () {
								if(inputRequired){
					  				$(this).prop('checked', true);
						  		} else {
						  			$(this).prop('checked', false);
						  		}
							});
							
					    }
					    if ($("#text_box_readonly_checkbox").length) {

							// console.log("RDO: " + inputReadonly); 
					  		$("#text_box_readonly_checkbox").filter(function () {
								if(inputReadonly){
					  				$(this).prop('checked', true);
						  		} else {
						  			$(this).prop('checked', false);
						  		}
							});
					    }

					    
					});

				multiModal.modal("show");

				break;

			case 'dropdown':
				//COLLECT VALUES FROM DROPPED ELEMENT
				var labelValue = $selectedElement.find('label p').text();
				var subLabelValue = $selectedElement.find('label small').text();
				var instructionValue = $selectedElement.find('a').attr('title');
				// var inputType = $selectedElement.find('input').attr('type');
				var labelAlignment = $selectedElement.find('label').attr('class').split(' ')[2]; //CHOOSING LABEL CLASS text-center [the 3rd class]
				var labelColor = $selectedElement.find('.control-label').css('color'); //CHOOSING LABEL STYLE color

				var inputHeight = $selectedElement.find('select').attr('class').split(' ')[1]; //CHOOSING INPUT CLASS input-md [the 2nd class]
				var inputWidth = $selectedElement.find('select').closest('div').attr('class'); //CHOOSING DIV CLASS col-md-7 [the only class]


				//CALL THE AJAX LOAD FUNCTION HERE
				var modalID = '#' + setElementType + '_form_data';
				// var settingsForm = formListFile + " " + modalID;
				

				self.getElementTag(formListFile).done(function(data) {
					    var $data = $(data);
					    multiModal.html($data.filter(modalID)); //insert form 
					}).always(function() {
					    if ($("#text_box_label_text").length) {              
					        $("#text_box_label_text").val(labelValue);  
					    }
					    if ($("#text_box_sublabel_text").length) {              
					        $("#text_box_sublabel_text").val(subLabelValue);  
					    }
					    if ($("#text_box_instruction_text").length) {              
					        $("#text_box_instruction_text").val(instructionValue);  
					    }
					    
					    if ($("#text_box_alignment").length) {              
					  		$("#text_box_alignment").filter(function() {
							    return $(this).val(labelAlignment); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_height").length) {              
					  		$("#text_box_height").filter(function() {
							    return $(this).val(inputHeight); 
							}).attr('selected', 'selected');

					    }
					    if ($("#text_box_width").length) {              
					  		$("#text_box_width").filter(function() {
							    return $(this).val(inputWidth); 
							}).attr('selected', 'selected');

					    }
						if ($("#cp").length) {              
					  		
					    	$('#cp').colorpicker('setValue', labelColor);	
					    }
					    
					});

				multiModal.modal("show");

				break;

			case 'radio':
				//COLLECT VALUES FROM DROPPED ELEMENT
				var labelValue = $selectedElement.find('label p').text();
				var subLabelValue = $selectedElement.find('label small').text();
				var instructionValue = $selectedElement.find('a').attr('title');
				var labelAlignment = $selectedElement.find('.control-label').attr('class').split(' ')[2]; //CHOOSING LABEL CLASS text-center [the 3rd class]
				var labelColor = $selectedElement.find('.control-label').css('color'); //CHOOSING LABEL STYLE color
				
				var labelMargin = $selectedElement.find('.control-label').css('margin-top'); //CHOOSING LABEL STYLE margin-top
				var labelFontSize = $selectedElement.find('.control-label').css('font-size'); //CHOOSING LABEL STYLE font-size
				var labelFontSize = Math.round(parseFloat(labelFontSize));
				var inputHeight = $selectedElement.find('#radio_holder > label')
												.attr('class').split(/\s+/)
												.filter(function(item){
												    return typeof item == 'string' && item.indexOf("input-") > -1;            
												})[0]; //CHOOSING DIV's CLASS input-md 

				var inputStyle = $selectedElement.find('#radio_holder > label')
												.attr('class').split(/\s+/)
												.filter(function(item){
												    return typeof item == 'string' && item.indexOf("radio") > -1;            
												})[0]; //CHOOSING DIV > LABEL's CLASS radio-inline 

				//CALL THE AJAX LOAD FUNCTION HERE
				var modalID = '#' + setElementType + '_form_data';
				var settingsForm = formListFile + " " + modalID;
				

				self.getElementTag(formListFile).done(function(data) {
					    var $data = $(data);
					    multiModal.html($data.filter(modalID)); //insert form 
					}).always(function() {

					    if ($("#text_box_label_text").length) {              
					        $("#text_box_label_text").val(labelValue);  
					    }

					    if ($("#text_box_sublabel_text").length) {              
					        $("#text_box_sublabel_text").val(subLabelValue);  
					    }

					    if ($("#text_box_instruction_text").length) {              
					        $("#text_box_instruction_text").val(instructionValue);  
					    }
					    
					    if ($("#text_box_alignment").length) {              
					  		$("#text_box_alignment").filter(function() {
							    return $(this).val(labelAlignment); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_height").length) {              
					  		$("#text_box_height").filter(function() {
							    return $(this).val(inputHeight); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_display_style").length) {              
					  		$("#text_box_display_style").filter(function() {
							    return $(this).val(inputStyle); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_label_margin").length) {              
					  		$("#text_box_label_margin").filter(function() {
							    return $(this).val(labelMargin); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_label_fontsize").length) {              
					  		$("#text_box_label_fontsize").filter(function() {
							    return $(this).val(labelFontSize + "px"); 
							}).attr('selected', 'selected');

					    }

					    if ($("#cp").length) {              
					  		
					    	$('#cp').colorpicker('setValue', labelColor);	
					    }
					});

				multiModal.modal("show");

				break;

			case 'checkbox':
				//COLLECT VALUES FROM DROPPED ELEMENT
				var labelValue = $selectedElement.find('label p').text();
				var subLabelValue = $selectedElement.find('label small').text();
				var instructionValue = $selectedElement.find('a').attr('title');
				var labelAlignment = $selectedElement.find('.control-label').attr('class').split(' ')[2]; //CHOOSING LABEL CLASS text-center [the 3rd class]
				var labelMargin = $selectedElement.find('.control-label').css('margin-top'); //CHOOSING LABEL STYLE margin-top
				var labelFontSize = $selectedElement.find('.control-label').css('font-size'); //CHOOSING LABEL STYLE font-size
				var labelColor = $selectedElement.find('.control-label').css('color'); //CHOOSING LABEL STYLE color
				var labelFontSize = Math.round(parseFloat(labelFontSize));
				var inputHeight = $selectedElement.find('#checkbox_holder > label')
												.attr('class').split(/\s+/)
												.filter(function(item){
												    return typeof item == 'string' && item.indexOf("input-") > -1;            
												})[0]; //CHOOSING DIV's CLASS input-md 

				var inputStyle = $selectedElement.find('#checkbox_holder > label')
												.attr('class').split(/\s+/)
												.filter(function(item){
												    return typeof item == 'string' && item.indexOf("checkbox") > -1;            
												})[0]; //CHOOSING DIV > LABEL's CLASS checkbox-inline 

				//CALL THE AJAX LOAD FUNCTION HERE
				var modalID = '#' + setElementType + '_form_data';
				var settingsForm = formListFile + " " + modalID;
				

				self.getElementTag(formListFile).done(function(data) {
					    var $data = $(data);
					    multiModal.html($data.filter(modalID)); //insert form 
					}).always(function() {

					    if ($("#text_box_label_text").length) {              
					        $("#text_box_label_text").val(labelValue);  
					    }

					    if ($("#text_box_sublabel_text").length) {              
					        $("#text_box_sublabel_text").val(subLabelValue);  
					    }

					    if ($("#text_box_instruction_text").length) {              
					        $("#text_box_instruction_text").val(instructionValue);  
					    }
					    
					    if ($("#text_box_alignment").length) {              
					  		$("#text_box_alignment").filter(function() {
							    return $(this).val(labelAlignment); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_height").length) {              
					  		$("#text_box_height").filter(function() {
							    return $(this).val(inputHeight); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_display_style").length) {              
					  		$("#text_box_display_style").filter(function() {
							    return $(this).val(inputStyle); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_label_margin").length) {              
					  		$("#text_box_label_margin").filter(function() {
							    return $(this).val(labelMargin); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_label_fontsize").length) {              
					  		$("#text_box_label_fontsize").filter(function() {
							    return $(this).val(labelFontSize + "px"); 
							}).attr('selected', 'selected');

					    }

					    if ($("#cp").length) {              
					  		
					    	$('#cp').colorpicker('setValue', labelColor);	
					    }
					});

				multiModal.modal("show");

				break;

			case 'image':
			
				var inputWidth = $selectedElement.find('img').css('width'); //CHOOSING DIV CLASS col-md-7 [the only class]
				var labelAlignment = $selectedElement.find('img').attr('class').split(' ')[2]; //CHOOSING LABEL CLASS text-center [the 3rd class]
				var inputBorderStyle = $selectedElement.find('img').css('border-style');
				var inputBorderWidth = $selectedElement.find('img').css('border-width');
				var inputBorderWidth = Math.ceil(parseFloat(inputBorderWidth));
				var inputBorderRadius = $selectedElement.find('img').css('border-radius');
				var inputBorderRadius = parseInt(inputBorderRadius);

				var inputBorderColor = $selectedElement.find('img').css('border-color');

				//CALL THE AJAX LOAD FUNCTION HERE
				var modalID = '#' + setElementType + '_form_data';
				// var settingsForm = formListFile + " " + modalID;
				

				self.getElementTag(formListFile).done(function(data) {
					    var $data = $(data);
					    multiModal.html($data.filter(modalID)); //insert form 
					    multiModal.find(".pick-a-color").pickAColor({
				        	  showSpectrum            : true,
							  showSavedColors         : false,
							  saveColorsPerElement    : false,
							  fadeMenuToggle          : true,
							  showHexInput            : true,
							  showBasicColors         : true,
							  allowBlank              : false,
							  showAdvanced            : false
				        });

				}).always(function() {

					    
					    if ($("#text_box_alignment").length) {              

					  		$("#text_box_alignment").filter(function() {
							    return $(this).val(labelAlignment); 
							}).attr('selected', 'selected');

					    }
					    
					    if ($("#text_box_width").length) {              

					  		$("#text_box_width").filter(function() {
							    return $(this).val(inputWidth); 
							}).attr('selected', 'selected');

					    }

					    if ($(".pick-a-color").length) {              

							$('span.color-preview.current-color').css('background-color', inputBorderColor);
							$('.pick-a-color').filter(function () {
								return	$(this).val(inputBorderColor);

							});
					    }

					    if ($("#text_box_border_style").length) {              

					  		$("#text_box_border_style").filter(function() {
							    return $(this).val(inputBorderStyle); 
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_border_thickness").length) {              

							console.log("thickness: " + inputBorderWidth);
					  		$("#text_box_border_thickness").filter(function() {
							    return $(this).val(inputBorderWidth); 
							    
							}).attr('selected', 'selected');

					    }

					    if ($("#text_box_border_radius").length) {

							console.log("radius: " + inputBorderRadius); 
					  		$("#text_box_border_radius").filter(function() {
							    return $(this).val(inputBorderRadius);

							}).attr('selected', 'selected');
							
					    }

					});

				multiModal.modal("show");


				break;

			case 'file':
				//CALL THE AJAX LOAD FUNCTION HERE
				var modalID = setElementType + '_form_data';
				// console.log(formListFile + " #" + modalID);
				multiModal.load( formListFile + " #" + modalID );
				multiModal.modal("show");

				break;

			case 'submit':
				//CALL THE AJAX LOAD FUNCTION HERE
				var modalID = setElementType + '_form_data';
				multiModal.load( formListFile + " #" + modalID );
				multiModal.modal("show");

				break;
		} //END: switch(elem.data('type'))

	}, //END: setupElement: function (event)

	headingSave: function (event) {

		event.preventDefault();
		event.stopPropagation();

		var self = DragDrop;
		//GETTING THE HEADING MODAL Object
		var headingModal = self.elements.modals.heading;
		//PICKING ONLY THE HIGHLIGHTED WIDGETBOX
		var openWidgetBox = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });
		//GETTING CKEDITOR DATA AFTER SAVE
		var textEditorData = self.CKEDITOR.instances.heading_modal.getData();
		
		
		//SETTING MODAL TEXT INTO WIDGET BOX		
		openWidgetBox.children('code').html( textEditorData ); 
		//SETTING MODAL TEXT INTO REGULAR HEADING BLOCK
		openWidgetBox.next('code').html( textEditorData ); 
		
		//HIDING MODAL AFTER SAVE
		headingModal.modal('hide');


	}, //END: headingSave: function (event). THIS ONE UPDATES THE H2 SETTINGS

	textSave: function (event) {

		event.preventDefault();
		event.stopPropagation();

		var self = DragDrop;
		//GETTING THE HEADING MODAL Object
		var textModal = self.elements.modals.text;
		//PICKING ONLY THE HIGHLIGHTED WIDGETBOX
		var openWidgetBox = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });
		//GETTING CKEDITOR DATA AFTER SAVE
		var textEditorData = self.CKEDITOR.instances.text_modal.getData();
		
		
		//SETTING MODAL TEXT INTO WIDGET BOX		
		openWidgetBox.children('code').html( textEditorData ); 
		//SETTING MODAL TEXT INTO REGULAR HEADING BLOCK
		openWidgetBox.next('code').html( textEditorData ); 
		
		//HIDING MODAL AFTER SAVE
		textModal.modal('hide');


	}, //END: textSave: function (event). THIS ONE UPDATES <P> SIMPLE TEXT SETTINGS

	textBoxSave: function (event) {
		event.preventDefault();

		var self = DragDrop;
		var multiModal = self.elements.modals.multi_modal;
		var $document = $(document);

		var newLabelText = $document.find('#text_box_label_text').val();	
		var newSubLabelText = $document.find('#text_box_sublabel_text').val();	
		var newInstructionText = $document.find('#text_box_instruction_text').val();	
		var newInputType = $document.find('#text_box_select_type').val();	

		var newValue = $document.find('#text_box_value_text').val();
		var newDomainCheckbox = $document.find('#text_box_domain_checkbox').prop('checked');
		// var newDomainText = $document.find('#text_box_domain_text').val();
		// var newCustomError = $document.find('#text_box_custom_error_text').val();
		var newPasswordCheckbox = $document.find('#text_box_password_checkbox').prop('checked');
		var newRequiredCheckbox = $document.find('#text_box_required_checkbox').prop('checked');
		var newReadonlyCheckbox = $document.find('#text_box_readonly_checkbox').prop('checked');
		var newAlignment = $document.find('#text_box_alignment').val();
		var newHeight = $document.find('#text_box_height').val();
		var newWidth = $document.find('#text_box_width').val();
		var newLabelMargin = $document.find('#text_box_label_margin').val();
		var newInputMargin = $document.find('#text_box_input_margin').val();
		var newIconBoxCondition = $document.find('#text_box_icon_box_condition').prop('checked');
		var newIconBoxText = $document.find('#text_box_icon_box_text').val();
		var newBorderStyle = $document.find('#text_box_border_style').val();
		var newBorderThickness = $document.find('#text_box_border_thickness').val();
		var newBorderRadius = $document.find('#text_box_border_radius').val();
		var newBorderRadius = newBorderRadius + "px";
		var newLabelColor = $document.find('#text_box_label_color').val();
		var newLabelColor = "#" + newLabelColor;


		//PICKING ONLY THE HIGHLIGHTED WIDGETBOX
		var $selectedElement = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });
		var $widgetBoxElement = $selectedElement.children('code');
		var $simpleElement = $selectedElement.next('code');
				
		//SETTING MODAL TEXT INTO WIDGET BOX		
		var labelValue = $widgetBoxElement.find('label p').text(newLabelText);
		var subLabelValue = $widgetBoxElement.find('label small').text(newSubLabelText);
		var instructionValue = $widgetBoxElement.find('a').attr('title', newInstructionText);
		var inputType = $widgetBoxElement.find('input').attr('type', newInputType);

		//SETTING MODAL TEXT INTO REGULAR HEADING BLOCK
		var labelValue = $simpleElement.find('label p').text(newLabelText);
		var subLabelValue = $simpleElement.find('label small').text(newSubLabelText);
		var instructionValue = $simpleElement.find('a').attr('title', newInstructionText);
		var inputType = $simpleElement.find('input').attr('type', newInputType);

		//SETTING TEXTBOX VALUE
		$widgetBoxElement.find('input').val(newValue);
		$simpleElement.find('input').val(newValue);

		//SETTING TEXTBOX WIDTH
		$widgetBoxElement.find('input').closest('div').alterClass('col-md-*', newWidth);
		$simpleElement.find('input').closest('div').alterClass('col-md-*', newWidth);

		//SETTING TEXTBOX HEIGHT
		$widgetBoxElement.find('input').alterClass('input-*', newHeight);
		$simpleElement.find('input').alterClass('input-*', newHeight);

		//SETTING BORDER STYLE
		$widgetBoxElement.find('input').css("border-style", newBorderStyle);
		$simpleElement.find('input').css("border-style", newBorderStyle);

		//SETTING BORDER TOP COLOR 
		$widgetBoxElement.find('input').css("border-top-color", newLabelColor);
		$simpleElement.find('input').css("border-top-color", newLabelColor);

		//SETTING BORDER RIGHT COLOR 
		$widgetBoxElement.find('input').css("border-right-color", newLabelColor);
		$simpleElement.find('input').css("border-right-color", newLabelColor);

		//SETTING BORDER BOTTOM COLOR 
		$widgetBoxElement.find('input').css("border-bottom-color", newLabelColor);
		$simpleElement.find('input').css("border-bottom-color", newLabelColor);

		//SETTING BORDER LEFT COLOR 
		$widgetBoxElement.find('input').css("border-left-color", newLabelColor);
		$simpleElement.find('input').css("border-left-color", newLabelColor);

		//SETTING BORDER WIDTH
		$widgetBoxElement.find('input').css("border-width", newBorderThickness);
		$simpleElement.find('input').css("border-width", newBorderThickness);
		// console.log("TextBox BRadius: " + newBorderRadius);

		//SETTING BORDER RADIUS
		$widgetBoxElement.find('input').style("border-radius", newBorderRadius,  "important");
		$simpleElement.find('input').style("border-radius", newBorderRadius, "important");

		//SETTING LABEL COLOR 
		$widgetBoxElement.find('label').css('color', newLabelColor);
		$simpleElement.find('label').css('color', newLabelColor);
		// console.log(newLabelColor);

		//SETTING LABEL ALIGNMENT 
		$widgetBoxElement.find('label').alterClass('text-*', newAlignment);
		$simpleElement.find('label').alterClass('text-*', newAlignment);

		//SETTING READONLY CHECKBOX
		// console.log(newReadonlyCheckbox);
		if(newReadonlyCheckbox){
			$widgetBoxElement.find('input').attr('readonly', '');
			$simpleElement.find('input').attr('readonly', '');
		} else {
			$widgetBoxElement.find('input').removeAttr('readonly');
			$simpleElement.find('input').removeAttr('readonly');
		}

		//SETTING RQUIRED CHECKBOX
		// console.log(newRequiredCheckbox);
		if(newRequiredCheckbox){
			$widgetBoxElement.find('input').attr('required', 'required');
			$simpleElement.find('input').attr('required', 'required');
		}else {
			$widgetBoxElement.find('input').removeAttr('required');
			$simpleElement.find('input').removeAttr('required');
		}
			
		//HIDING MODAL AFTER SAVE
		multiModal.modal('hide');

	}, //END: textboxSave FUNCTION:: THIS UPDATES DATA FROM SETTING MODALS TO THE DROPPED TEXT BOX ELEMENT

	textAreaSave: function (event) {
		event.preventDefault();
		var self = DragDrop;
		var multiModal = self.elements.modals.multi_modal;
		var $document = $(document);

		var newLabelText = $document.find('#text_box_label_text').val();	
		var newSubLabelText = $document.find('#text_box_sublabel_text').val();	
		var newInstructionText = $document.find('#text_box_instruction_text').val();	
		var newInputType = $document.find('#text_box_select_type').val();	

		var newValue = $document.find('#text_box_value_text').val();
		var newCustomError = $document.find('#text_box_custom_error_text').val();
		var newRequiredCheckbox = $document.find('#text_box_required_checkbox').prop('checked');
		var newReadonlyCheckbox = $document.find('#text_box_readonly_checkbox').prop('checked');
		var newAlignment = $document.find('#text_box_alignment').val();
		var newHeight = $document.find('#text_box_height').val();
		var newWidth = $document.find('#text_box_width').val();
		var newLabelMargin = $document.find('#text_box_label_margin').val();
		var newInputMargin = $document.find('#text_box_input_margin').val();
		var newIconBoxCondition = $document.find('#text_box_icon_box_condition').prop('checked');
		var newIconBoxText = $document.find('#text_box_icon_box_text').val();
		var newBorderStyle = $document.find('#text_box_border_style').val();
		var newBorderThickness = $document.find('#text_box_border_thickness').val();
		var newBorderRadius = $document.find('#text_box_border_radius').val();
		var newBorderRadius = newBorderRadius + "px";
		var newLabelColor = $document.find('#text_box_label_color').val();
		var newLabelColor = "#" + newLabelColor;


		//PICKING ONLY THE HIGHLIGHTED WIDGETBOX
		var $selectedElement = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });
		var $widgetBoxElement = $selectedElement.children('code');
		var $simpleElement = $selectedElement.next('code');
				
		//SETTING MODAL TEXT INTO WIDGET BOX		
		var labelValue = $widgetBoxElement.find('label p').text(newLabelText);
		var subLabelValue = $widgetBoxElement.find('label small').text(newSubLabelText);
		var instructionValue = $widgetBoxElement.find('a').attr('title', newInstructionText);
		var inputType = $widgetBoxElement.find('input').attr('type', newInputType);

		//SETTING MODAL TEXT INTO REGULAR HEADING BLOCK
		var labelValue = $simpleElement.find('label p').text(newLabelText);
		var subLabelValue = $simpleElement.find('label small').text(newSubLabelText);
		var instructionValue = $simpleElement.find('a').attr('title', newInstructionText);
		var inputType = $simpleElement.find('input').attr('type', newInputType);

		//SETTING TEXTBOX VALUE
		$widgetBoxElement.find('textarea').val(newValue);
		$simpleElement.find('textarea').val(newValue);
		
		//SETTING TEXTBOX WIDTH
		$widgetBoxElement.find('textarea').closest('div').alterClass('col-md-*', newWidth);
		$simpleElement.find('textarea').closest('div').alterClass('col-md-*', newWidth);

		//SETTING TEXTBOX HEIGHT
		$widgetBoxElement.find('textarea').attr('rows', newHeight);
		$simpleElement.find('textarea').attr('rows', newHeight);


		//SETTING BORDER STYLE
		$widgetBoxElement.find('textarea').css("border-style", newBorderStyle);
		$simpleElement.find('textarea').css("border-style", newBorderStyle);

		//SETTING BORDER TOP COLOR 
		$widgetBoxElement.find('textarea').css("border-top-color", newLabelColor);
		$simpleElement.find('textarea').css("border-top-color", newLabelColor);

		//SETTING BORDER RIGHT COLOR 
		$widgetBoxElement.find('textarea').css("border-right-color", newLabelColor);
		$simpleElement.find('textarea').css("border-right-color", newLabelColor);

		//SETTING BORDER BOTTOM COLOR 
		$widgetBoxElement.find('textarea').css("border-bottom-color", newLabelColor);
		$simpleElement.find('textarea').css("border-bottom-color", newLabelColor);

		//SETTING BORDER LEFT COLOR 
		$widgetBoxElement.find('textarea').css("border-left-color", newLabelColor);
		$simpleElement.find('textarea').css("border-left-color", newLabelColor);

		//SETTING BORDER WIDTH
		$widgetBoxElement.find('textarea').css("border-width", newBorderThickness);
		$simpleElement.find('textarea').css("border-width", newBorderThickness);
		// console.log("TextBox BRadius: " + newBorderRadius);

		//SETTING BORDER RADIUS
		$widgetBoxElement.find('textarea').style("border-radius", newBorderRadius,  "important");
		$simpleElement.find('textarea').style("border-radius", newBorderRadius, "important");

		//SETTING LABEL COLOR 
		$widgetBoxElement.find('label').css('color', newLabelColor);
		$simpleElement.find('label').css('color', newLabelColor);
		// console.log(newLabelColor);

		//SETTING LABEL COLOR 
		$widgetBoxElement.find('label').css('color', newLabelColor);
		$simpleElement.find('label').css('color', newLabelColor);

		//SETTING LABEL ALIGNMENT 
		$widgetBoxElement.find('label').alterClass('text-*', newAlignment);
		$simpleElement.find('label').alterClass('text-*', newAlignment);

		//SETTING READONLY CHECKBOX
		// console.log(newReadonlyCheckbox);
		if(newReadonlyCheckbox){
			$widgetBoxElement.find('textarea').attr('readonly', '');
			$simpleElement.find('textarea').attr('readonly', '');
		} else {
			$widgetBoxElement.find('textarea').removeAttr('readonly');
			$simpleElement.find('textarea').removeAttr('readonly');
		}

		//SETTING RQUIRED CHECKBOX
		// console.log(newRequiredCheckbox);
		if(newRequiredCheckbox){
			$widgetBoxElement.find('textarea').attr('required', 'required');
			$simpleElement.find('textarea').attr('required', 'required');
		}else {
			$widgetBoxElement.find('textarea').removeAttr('required');
			$simpleElement.find('textarea').removeAttr('required');
		}

		//HIDING MODAL AFTER SAVE
		multiModal.modal('hide');
	
	}, //END: textareaSave FUNCTION:: THIS UPDATES DATA FROM SETTING MODALS TO THE DROPPED TEXT AREA ELEMENT

	dropdownSave: function (event) {
		
		event.preventDefault();

		var self = DragDrop;
		var multiModal = self.elements.modals.multi_modal;
		var $document = $(document);

		var newLabelText = $document.find('#text_box_label_text').val();	
		var newSubLabelText = $document.find('#text_box_sublabel_text').val();	
		var newInstructionText = $document.find('#text_box_instruction_text').val();	
		var newInputType = $document.find('#text_box_select_type').val();	

		var newCustomError = $document.find('#text_box_custom_error_text').val();
		var newRequiredCheckbox = $document.find('#text_box_required_checkbox').prop('checked');
		var newMultiCheckbox = $document.find('#text_box_multi_select_checkbox').prop('checked');
		var newAlignment = $document.find('#text_box_alignment').val();
		var newHeight = $document.find('#text_box_height').val();
		var newWidth = $document.find('#text_box_width').val();
		var newBorderStyle = $document.find('#text_box_border_style').val();
		var newBorderThickness = $document.find('#text_box_border_thickness').val();
		var newBorderRadius = $document.find('#text_box_border_radius').val();
		var newLabelColor = $document.find('#text_box_label_color').val();

		// console.log(newValue);
		// console.log(newCustomError);
		// console.log(newRequiredCheckbox);
		// console.log(newMultiCheckbox);
		// console.log(newAlignment);
		// console.log(newHeight);
		// console.log(newWidth);
		// console.log(newBorderStyle);
		// console.log(newBorderThickness);
		// console.log(newBorderRadius);
		// console.log(newLabelColor);
		

		//PICKING ONLY THE HIGHLIGHTED WIDGETBOX
		var $selectedElement = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });
		var $widgetBoxElement = $selectedElement.children('code');
		var $simpleElement = $selectedElement.next('code');
				
		//SETTING MODAL TEXT INTO WIDGET BOX		
		var labelValue = $widgetBoxElement.find('label p').text(newLabelText);
		var subLabelValue = $widgetBoxElement.find('label small').text(newSubLabelText);
		var instructionValue = $widgetBoxElement.find('a').attr('title', newInstructionText);
		var inputType = $widgetBoxElement.find('input').attr('type', newInputType);

		//SETTING MODAL TEXT INTO REGULAR HEADING BLOCK
		var labelValue = $simpleElement.find('label p').text(newLabelText);
		var subLabelValue = $simpleElement.find('label small').text(newSubLabelText);
		var instructionValue = $simpleElement.find('a').attr('title', newInstructionText);
		var inputType = $simpleElement.find('input').attr('type', newInputType);

		//SETTING DROPDOWN VALUE
		// $widgetBoxElement.find('select').val(newValue);
		// $simpleElement.find('select').val(newValue);

		//SETTING DROPDOWN WIDTH
		$widgetBoxElement.find('select').closest('div').alterClass('col-md-*', newWidth);
		$simpleElement.find('select').closest('div').alterClass('col-md-*', newWidth);

		//SETTING DROPDOWN HEIGHT
		$widgetBoxElement.find('select').alterClass('input-*', newHeight);
		$simpleElement.find('select').alterClass('input-*', newHeight);

		//SETTING BORDER COLOR AND STYLE
		$widgetBoxElement.find('select').css({
			"border": newBorderThickness + 'px ' + newBorderStyle + ' ' + newLabelColor
		});
		$simpleElement.find('select').css({
			"border": newBorderThickness + 'px ' + newBorderStyle + ' ' + newLabelColor
		});

		//SETTING LABEL COLOR 
		$widgetBoxElement.find('label').css('color', newLabelColor);
		$simpleElement.find('label').css('color', newLabelColor);

		//SETTING LABEL ALIGNMENT 
		$widgetBoxElement.find('label').alterClass('text-*', newAlignment);
		$simpleElement.find('label').alterClass('text-*', newAlignment);

		//HIDING MODAL AFTER SAVE
		multiModal.modal('hide');
		
	}, //END: dropdownSave FUNCTION:: THIS UPDATES DATA FROM SETTING MODALS TO THE DROPPED DROPDOWN ELEMENT

	radioSave: function (event) {
		// body...
		event.preventDefault();
		var self = DragDrop;
		var multiModal = self.elements.modals.multi_modal;
		var $document = $(document);

		var newLabelText = $document.find('#text_box_label_text').val();	
		var newSubLabelText = $document.find('#text_box_sublabel_text').val();	
		var newInstructionText = $document.find('#text_box_instruction_text').val();	

		var newLabelAlignment = $document.find('#text_box_alignment').val();
		var newLabelMargin = $document.find('#text_box_label_margin').val(); 
		var newHeight = $document.find('#text_box_height').val();
		var newDisplayStyle = $document.find('#text_box_display_style').val();
		var newLabelColor = $document.find('#text_box_label_color').val();
		var newLabelFontSize = $document.find('#text_box_label_fontsize').val();

		// console.log(newLabelAlignment);
		// console.log(newLabelMargin);
		// console.log(newHeight);
		// console.log(newDisplayStyle);
		// console.log(newLabelColor);
		// console.log(newLabelFontSize);
		

		//PICKING ONLY THE HIGHLIGHTED WIDGETBOX
		var $selectedElement = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });
		var $widgetBoxElement = $selectedElement.children('code');
		var $simpleElement = $selectedElement.next('code');
				
		//SETTING MODAL TEXT INTO WIDGET BOX		
		var labelValue = $widgetBoxElement.find('label p').text(newLabelText);
		var subLabelValue = $widgetBoxElement.find('label small').text(newSubLabelText);
		var instructionValue = $widgetBoxElement.find('a').attr('title', newInstructionText);

		//SETTING MODAL TEXT INTO REGULAR HEADING BLOCK
		var labelValue = $simpleElement.find('label p').text(newLabelText);
		var subLabelValue = $simpleElement.find('label small').text(newSubLabelText);
		var instructionValue = $simpleElement.find('a').attr('title', newInstructionText);

		//SETTING RADIO HEIGHT
		$widgetBoxElement.find('#radio_holder').children('label').alterClass('input-*', newHeight);
		$simpleElement.find('#radio_holder').children('label').alterClass('input-*', newHeight);

		//SETTING RADIO STYLE
		$widgetBoxElement.find('#radio_holder').children('label').alterClass('radi*', newDisplayStyle);
		$simpleElement.find('#radio_holder').children('label').alterClass('radi*', newDisplayStyle);

		//SETTING LABEL COLOR 
		$widgetBoxElement.find('label').css('color', newLabelColor);
		$simpleElement.find('label').css('color', newLabelColor);

		//SETTING LABEL ALIGNMENT 
		$widgetBoxElement.find('.form-group > label').alterClass('text-*', newLabelAlignment);
		$simpleElement.find('.form-group > label').alterClass('text-*', newLabelAlignment);

		//SETTING LABEL MARGIN 
		$widgetBoxElement.find('.form-group > label').css('margin-top', newLabelMargin);
		$simpleElement.find('.form-group > label').css('margin-top', newLabelMargin);

		//SETTING LABEL FONTSIZE 
		$widgetBoxElement.find('.form-group > label').css('font-size', newLabelFontSize);
		$simpleElement.find('.form-group > label').css('font-size', newLabelFontSize);

		//HIDING MODAL AFTER SAVE
		multiModal.modal('hide');
	}, //END: radioSave FUNCTION:: THIS UPDATES DATA FROM SETTING MODALS TO THE DROPPED RADIO ELEMENT
	
	checkboxSave: function (event) {
		// body...
		event.preventDefault();
		var self = DragDrop;
		var multiModal = self.elements.modals.multi_modal;
		var $document = $(document);

		var newLabelText = $document.find('#text_box_label_text').val();	
		var newSubLabelText = $document.find('#text_box_sublabel_text').val();	
		var newInstructionText = $document.find('#text_box_instruction_text').val();	

		var newLabelAlignment = $document.find('#text_box_alignment').val();
		var newLabelMargin = $document.find('#text_box_label_margin').val(); 
		var newHeight = $document.find('#text_box_height').val();
		var newDisplayStyle = $document.find('#text_box_display_style').val();
		var newLabelColor = $document.find('#text_box_label_color').val();
		var newLabelFontSize = $document.find('#text_box_label_fontsize').val();

		console.log(newLabelAlignment);
		console.log(newLabelMargin);
		console.log(newHeight);
		console.log(newDisplayStyle);
		console.log(newLabelColor);
		console.log(newLabelFontSize);
		

		//PICKING ONLY THE HIGHLIGHTED WIDGETBOX
		var $selectedElement = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });
		var $widgetBoxElement = $selectedElement.children('code');
		var $simpleElement = $selectedElement.next('code');
				
		//SETTING MODAL TEXT INTO WIDGET BOX		
		var labelValue = $widgetBoxElement.find('label p').text(newLabelText);
		var subLabelValue = $widgetBoxElement.find('label small').text(newSubLabelText);
		var instructionValue = $widgetBoxElement.find('a').attr('title', newInstructionText);

		//SETTING MODAL TEXT INTO REGULAR HEADING BLOCK
		var labelValue = $simpleElement.find('label p').text(newLabelText);
		var subLabelValue = $simpleElement.find('label small').text(newSubLabelText);
		var instructionValue = $simpleElement.find('a').attr('title', newInstructionText);

		//SETTING RADIO HEIGHT
		$widgetBoxElement.find('#checkbox_holder').children('label').alterClass('input-*', newHeight);
		$simpleElement.find('#checkbox_holder').children('label').alterClass('input-*', newHeight);

		//SETTING RADIO STYLE
		$widgetBoxElement.find('#checkbox_holder').children('label').alterClass('checkbo*', newDisplayStyle);
		$simpleElement.find('#checkbox_holder').children('label').alterClass('checkbo*', newDisplayStyle);

		

		//SETTING LABEL ALIGNMENT 
		$widgetBoxElement.find('.form-group > label').alterClass('text-*', newLabelAlignment);
		$simpleElement.find('.form-group > label').alterClass('text-*', newLabelAlignment);

		//SETTING LABEL MARGIN 
		$widgetBoxElement.find('.form-group > label').css('margin-top', newLabelMargin);
		$simpleElement.find('.form-group > label').css('margin-top', newLabelMargin);

		//SETTING LABEL FONTSIZE 
		$widgetBoxElement.find('.form-group > label').css('font-size', newLabelFontSize);
		$simpleElement.find('.form-group > label').css('font-size', newLabelFontSize);

		//SETTING LABEL COLOR 
		$widgetBoxElement.find('label').css('color', newLabelColor);
		$simpleElement.find('label').css('color', newLabelColor);

		//HIDING MODAL AFTER SAVE
		multiModal.modal('hide');
	}, //END: checkboxSave FUNCTION:: THIS UPDATES DATA FROM SETTING MODALS TO THE DROPPED CHECKBOX ELEMENT
	
	imageSave: function (event) {
		event.preventDefault();

		var self = DragDrop;
		var multiModal = self.elements.modals.multi_modal;
		var $document = $(document);

		var newAlignment = $document.find('#text_box_alignment').val();
		var newWidth = $document.find('#text_box_width').val();
		var newBorderStyle = $document.find('#text_box_border_style').val();
		var newBorderThickness = $document.find('#text_box_border_thickness').val();
		var newBorderRadius = $document.find('#text_box_border_radius').val();
		var newBorderRadius = newBorderRadius + "px";
		var newLabelColor = $document.find('#text_box_border_color').val();
		// var newLabelColor = $document.find('.pick-a-color').val();
		var newLabelColor = "#" + newLabelColor;

		console.log("imageSave Border Radius: " + newBorderRadius);

		//PICKING ONLY THE HIGHLIGHTED WIDGETBOX
		var $selectedElement = self.elements.drop_box.find('.widget-box').filter(function () { return $(this).css('display') == 'block' });
		var $widgetBoxElement = $selectedElement.children('code');
		var $simpleElement = $selectedElement.next('code');
				
		//SETTING IMAGE WIDTH
		$widgetBoxElement.find('img').css('width', newWidth);
		$simpleElement.find('img').css('width', newWidth);

		//SETTING IMAGE ALIGNMENT 
		$widgetBoxElement.find('img').alterClass('center-* pull-*', newAlignment);
		$simpleElement.find('img').alterClass('center-* pull-*', newAlignment);

		//SETTING BORDER STYLE
		$widgetBoxElement.find('img').css("border-style", newBorderStyle);
		$simpleElement.find('img').css("border-style", newBorderStyle);

		//SETTING BORDER TOP COLOR 
		$widgetBoxElement.find('img').css("border-top-color", newLabelColor);
		$simpleElement.find('img').css("border-top-color", newLabelColor);

		//SETTING BORDER RIGHT COLOR 
		$widgetBoxElement.find('img').css("border-right-color", newLabelColor);
		$simpleElement.find('img').css("border-right-color", newLabelColor);

		//SETTING BORDER BOTTOM COLOR 
		$widgetBoxElement.find('img').css("border-bottom-color", newLabelColor);
		$simpleElement.find('img').css("border-bottom-color", newLabelColor);

		//SETTING BORDER LEFT COLOR 
		$widgetBoxElement.find('img').css("border-left-color", newLabelColor);
		$simpleElement.find('img').css("border-left-color", newLabelColor);

		//SETTING BORDER WIDTH
		$widgetBoxElement.find('img').css("border-width", newBorderThickness);
		$simpleElement.find('img').css("border-width", newBorderThickness);
		console.log("Border Thickness: " + newBorderThickness);

		//SETTING BORDER RADIUS
		$widgetBoxElement.find('img').css("border-radius", newBorderRadius);
		$simpleElement.find('img').css("border-radius", newBorderRadius);

		//HIDING MODAL AFTER SAVE
		multiModal.modal('hide');

	}, //END: imageSave FUNCTION:: THIS UPDATES DATA FROM SETTING MODALS TO THE DROPPED IMAGE ELEMENT

	submitSave: function (event) {
		// body...
	}, //END: submitSave FUNCTION:: THIS UPDATES DATA FROM SETTING MODALS TO THE DROPPED SUBMIT ELEMENT

	fileSave: function (event) {
		// body...
	} //END: fileSave FUNCTION:: THIS UPDATES DATA FROM SETTING MODALS TO THE DROPPED FILE UPLOAD ELEMENT

} //END: DragDrop Object. THIS THE MAIN OBJECT

























