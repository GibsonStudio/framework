/* **** questions **** */

function list_objects () {

	var m = '';
	
	for (var i = 0; i < questions.length; i++) {
	
		m += 'index: ' + i + '\n';
		m += 'id: ' + questions[i].id + '\n';
		m += 'options: ' + questions[i].options + '\n';
		m += 'correct: ' + questions[i].correct + '\n';
		m += 'selected: ' + questions[i].selected + '\n';
		m += 'feedback: ' + questions[i].feedback + '\n';
		m += ' \n';
		
	}
	
	alert(m);
	
}



function mark_quiz () {

	var got_correct = 0;
	
	for (var i = 0; i < questions.length; i++) {
	
		if (questions[i].selected < 0) {
		
			//nothing selected, so no feedback to show
			var my_feedback = '<span class="please_select">Please select an answer....</span>';
			var feedback_id = questions[i].id + '_feedback';
			var fb = document.getElementById(feedback_id);						
			fb.innerHTML = my_feedback;
			fb.className = 'feedback_with_contents';
			
		} else {

			var option_id = questions[i].id + '_' + questions[i].selected;
					
			if (questions[i].answer == questions[i].selected) {
			
				got_correct++;
				
				//indicate correct						
				document.getElementById(option_id).className = 'option correct';

			} else {
			
				//indicate wrong		
				document.getElementById(option_id).className = 'option wrong';

			}
						
			
			//show feedback
			if (questions[i].feedback) {
				
				var my_feedback = questions[i].feedback[questions[i].selected];
				var feedback_id = questions[i].id + '_feedback';
				var fb = document.getElementById(feedback_id);
					
				if (my_feedback == '') {
					
					//clear feedback
					fb.innerHTML = '';
					fb.className = 'feedback';
						
				} else {
					
					//show feedback
					fb.innerHTML = my_feedback;
					fb.className = 'feedback_with_contents';
					
				}
	
			}
		}
	
	}
	
	//show score
	var sc = document.getElementById('result');
	sc.className = '';
	var result = '';

	var percent = (got_correct / questions.length) * 100;
	percent = percent.toFixed(0);
	result += '<div id="percent">' + percent + '%</div>';
	result += '<div id="score">' + got_correct + ' / ' + questions.length + '</div>';
	sc.innerHTML = result;

	
}






function add_multichoice_question (question)
{
	
	var question = question || {};
	question.selected = -1;
	question.id = question.id || 'generated_id_' + questions.length;
	question.questiontext = question.questiontext || '';
	question.options = question.options || new Array();
	question.answer = question.answer || 0;
	question.image = question.image || '';
	
	questions.push(question);
	
	//add question 
	var html = '<div id="' + question.id + '" class="question">';
	html += '<div class="question_title">Question ' + questions.length + '</div>';
	
	if (question.questiontext != '') {
		html += '<div class="question_text">' + question.questiontext + '</div>';
	}
		
	//add image
	if (question.image != '') {
	
		html += '<div class="question_image"><img src="' + question.image + '" alt="' + question.image + '" /></div>';
		
	}
	
	//add options
	for (var i = 0; i < question.options.length; i++) {
	
		var option_id = question.id + '_' + i;
		
		var i_am_correct = 0;
		
		if (question.answer == i) {
			i_am_correct = 1;
		}
		
		var my_script = "javascript:option_clicked('" + question.id + "', '" + option_id + "', '" + i_am_correct + "', '" + i + "');";
		html += '<a href="' + my_script + '">';
		html += '<div id="' + option_id + '" class="option">' + question.options[i] + '</div>';
		html += '</a>';
		
	}
	
	//add feedback area
	html += '<div class="feedback" id="'+ question.id + '_feedback"></div>';
	
	html += '</div>';
	
	document.write(html);	

}







function option_clicked (question_id, option_id, i_am_correct, selected) {

	question_index = get_question_index(question_id);
	questions[question_index].selected = selected;
	
	var el = document.getElementById(question_id); 
	var kids = el.getElementsByClassName('option');
	
	for (var i = 0; i < kids.length; i++) {

		kids[i].className = 'option';
		
	}
	
	document.getElementById(option_id).classList.add('selected');
	
}



function get_question_index (question_id) {

	index = 0;
	
	for (var i = 0; i < questions.length; i++) {
	
		if (questions[i].id == question_id) {
			
			index = i;
			break;
			
		}
		
	}
	
	return index;
	
}




function add_score_div () {
	
	result = '<div id="result" class="blank"></div>';
	document.write(result);
	
}



function add_quiz_buttons () {

	var buttons = '<div class="quiz_buttons">';
	buttons += '<a href="javascript:mark_quiz();"><div class="submit_button">Submit</div></a>';
	buttons += '</div>';
	
	document.write(buttons);
	
}




