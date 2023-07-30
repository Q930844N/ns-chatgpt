/**
* @NApiVersion 2.1
* @NScriptType Suitelet
* @NModuleScope Public
* 
* Author: Abdul Qadeer with the help og ChatGPT.
*/

define(['N/ui/serverWidget', 'N/https', 'N/url', 'N/redirect'], function (serverWidget, https, url, redirect) {
	function onRequest(context) {
		log.debug('context', context);
		// Get the user input from the form submission
		var userInput = context.request.parameters?.custpage_query_text;
		log.debug('userInput', userInput);

		if (context.request.method === 'GET') {
			// Create the Suitelet form
			var form = serverWidget.createForm({
				title: 'Prompt ChatGPT',
			});

			// Add a textarea field for user input
			form.addField({
				id: 'custpage_query_text',
				label: 'Enter Text',
				type: serverWidget.FieldType.TEXTAREA,
			});
			if (userInput) {
				var convertedQuery = getConvertedQueryFromOpenAI(userInput);
				form.addField({
					id: 'custpage_query_results',
					label: 'Converted Query:',
					type: serverWidget.FieldType.INLINEHTML,
				}).defaultValue = '<pre>' + convertedQuery + '</pre>';
			}

			// Add a submit button
			form.addSubmitButton({
				label: 'Submit',
			});

			// Display the form
			context.response.writePage(form);
		} else if (context.request.method === 'POST') {
			log.debug('context', context);

			var suiteletURL = url.resolveScript({
				scriptId: 'customscript_ns_chatgpt_sl',
				deploymentId: 'customdeploy_ns_chatgpt_sl',
				params: {custpage_query_text : context.request.parameters.custpage_query_text}
			});
			redirect.redirect({ url: suiteletURL });
		}
	}

	// Function to call OpenAI API and get the converted query (actual API integration code needed here)
	function getConvertedQueryFromOpenAI(text) {
		// Call the OpenAI API with the input text and obtain the converted query
		// (Replace the following with actual API integration code)
		var apiUrl = 'https://api.openai.com/v1/chat/completions';
		var apiKey = 'PLACE_YOUR_API_KEY_HERE'; // Replace with your OpenAI API key
		var headers = {
			'Authorization': 'Bearer ' + apiKey,
			'Content-Type': 'application/json',
		};
		var requestBody = {
			model: "gpt-3.5-turbo",
			max_tokens: 2048,
			temperature: 0.7,
			messages: [{ role: "user", content: text }],
		};
		var response;
		try {
			response = https.post({
				url: apiUrl,
				headers: headers,
				body: JSON.stringify(requestBody),
			});

		} catch (error) {
			response = error;
		}
		return response.body;
	}

	return {
		onRequest: onRequest,
	};
});