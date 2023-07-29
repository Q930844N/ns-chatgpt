/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
 define(["N/record", "N/runtime", "N/url"], function (
    record,  
    runtime,
    url
  ) {
    /**
     * @param {ClientScriptContext.pageInit} context
     */
    function executeRecurring(text) {
        const response = fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer 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`,
			},
			body: JSON.stringify({
				model: "gpt-3.5-turbo",
				max_tokens: 2048,
				temperature: 0.7,
				messages: [{ role: "user", content: text }],
			}),
		});

		return response;
    }
  
    function pageInit(context) { // you need to keep at least one Netsuite Entry function, otherwise you will get an error
    }
  
    return {
      pageInit: pageInit,
      executeRecurring: executeRecurring
    };
  });