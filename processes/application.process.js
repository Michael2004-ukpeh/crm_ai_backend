const openAI = require('./../utils/openai');
const generatePrompt = require('./../prompts/generatePrompt');
const generateConfirmationPrompt = require('./../prompts/generateConfirmationPrompt');
exports.createCustomEmail = async (event) => {
  const completion = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo-16k',
    messages: [
      {
        role: 'system',
        content: `You are a custom email generator based on event data with output as string`,
      },
      { role: 'user', content: generatePrompt(event) },
    ],
    temperature: 1.5,
  });

  return completion.choices[0].message.content;
};

exports.createConfirmationEmail = async (event) => {
  const completion = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo-16k',
    messages: [
      {
        role: 'system',
        content: `You are a custom email generator based on event data with output as string`,
      },
      { role: 'user', content: generateConfirmationPrompt(event) },
    ],
    temperature: 1.5,
  });

  return completion.choices[0].message.content;
};
