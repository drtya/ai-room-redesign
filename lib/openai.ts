import { G4F } from 'g4f';

export async function generateImagePrompt(data) {
  try {
    const options = {
      model: 'gpt-4',
      debug: true,
      retry: {
        times: 3,
        condition: (text) => {
          const words = text.split(' ');
          return words.length > 10;
        },
      },
      output: (text) => {
        return text + ' 💕🌹';
      },
    };

    const g4f = new G4F();
    const { imageUrl, roomType, designType, additionalReq } = data;
    const messages = [
      {
        role: 'system',
        content:
          'You are a creative and useful AI assistant capable of generating thumbnail descriptions for my room design. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled.',
      },
      {
        role: 'user',
        content: `Please generate a thumbnail description for my ${roomType} with a ${designType} style interior. ${additionalReq}`,
      },
    ];

    const response = await g4f.chatCompletion(messages,options);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function generateImage(prompt) {}
