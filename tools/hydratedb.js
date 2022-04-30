const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const axios = require("axios");
const generator = new LoremIpsum({
	sentencesPerParagraph: {
		max: 5,
		min: 2,
	},
	wordsPerSentence: {
		max: 5,
		min: 4,
	},
});

const maxCount = 100;

const upload = async (sentence) => {
	await axios.request({
		url: "https://creatica2022-be-aotynourea-as.a.run.app/api/v1/post",
		method: "POST",
		headers: {
			Authorization: "",
			"Content-Type": "application/json",
		},
		data: {
			body: sentence,
		},
	});
	console.log("Finished Writing: " + sentence);
	setTimeout(() => {}, 1000);
};
for (var i = 0; i < maxCount; i++) {
	const randomNumber = Math.floor(Math.random() * 5);
	const newWords = generator.generateSentences(randomNumber);
	upload(newWords);
}
